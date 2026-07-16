// =========================================================================
// purchase-report.controller.js
// =========================================================================
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const companyService = require("../../company/services/company.service");
const { safeFormatDate, fetchImageBuffer } = require("../../reports/report-helpers");
const { getDailyPurchasesService } = require("../services/purchase-report.service");

function transformPurchases(purchases) {
  const formatDateLocal = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("es-PE", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (purchases || []).map((purchase) => {
    const rawDate = purchase.createdAt || purchase.date;
    const date = formatDateLocal(rawDate);

    // Mapeo seguro de la lista de productos del detalle
    const productNames = (purchase.details || [])
      .map((d) => `${d.product?.name || "Producto"} (x${d.quantity || 0})`)
      .join(", ");

    return {
      date,
      purchaseNumber: purchase.purchaseNumber || "-",
      subtotal: Number(purchase.subtotal || 0),
      tax: Number(purchase.tax || 0),
      discount: Number(purchase.discount || 0),
      total: Number(purchase.total || 0),
      products: productNames || "-",
      status: purchase.status || "PENDIENTE",
      notes: purchase.notes || "-",
    };
  });
}

module.exports = {
  downloadDailyPurchasesPDFController: async (req, res, next) => {
    try {
      const { companyId, startDate, endDate } = req.query;

      const rawData = await getDailyPurchasesService(
        Number(companyId),
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined,
      );
      const report = transformPurchases(rawData);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="daily-purchases-${companyId || "report"}.pdf"`);

      // Usamos LANDSCAPE (Horizontal) para dar espacio a las 8 columnas requeridas de forma elegante
      const doc = new PDFDocument({ size: "A4", margin: 30, layout: "landscape" });
      doc.pipe(res);

      // Cabecera Institucional
      const company = companyId ? await companyService.getById(Number(companyId)) : null;
      let img = null;
      if (company?.logo) img = await fetchImageBuffer(company.logo);

      if (img?.buffer) {
        try {
          doc.image(img.buffer, 30, 30, { width: 50 });
        } catch (_) {
          /* Silenciar error si el búfer de la imagen de la compañía está corrupto */
        }
      }

      const headerX = img?.buffer ? 90 : 30;
      if (company) {
        doc.fontSize(12).font("Helvetica-Bold").fillColor("#1f2937").text(company.name || "", headerX, 32);
        doc.fontSize(9).font("Helvetica").fillColor("#4b5563").text(`RUC: ${company.ruc || ""}`, headerX, 46);
      }

      doc.fontSize(15).font("Helvetica-Bold").fillColor("#0f172a").text("Reporte Diario de Compras", { align: "center" });
      if (startDate && endDate) {
        doc.fontSize(9).font("Helvetica").fillColor("#6b7280").text(`Período: ${safeFormatDate(startDate)} al ${safeFormatDate(endDate)}`, { align: "center" });
      }
      doc.moveDown(1.5);

      // Estructura de anchos de columna (Total de ancho disponible A4 Landscape ~782px)
      const colWidths = {
        num: 65,      // Número
        sub: 55,      // Subtotal
        tax: 50,      // Impuesto
        desc: 50,     // Descuento
        tot: 65,      // Total
        prod: 190,    // Productos
        status: 65,   // Estado
        notes: 200,   // Notas
      };

      const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);
      const startX = 30;

      const drawTableHeader = (yPos) => {
        doc.rect(startX, yPos, tableWidth, 22).fill("#0f172a");
        doc.fillColor("#ffffff").fontSize(8).font("Helvetica-Bold");

        let currentX = startX;
        doc.text("NÚMERO", currentX + 4, yPos + 7, { width: colWidths.num - 8 }); currentX += colWidths.num;
        doc.text("SUBTOTAL", currentX + 4, yPos + 7, { width: colWidths.sub - 8, align: "right" }); currentX += colWidths.sub;
        doc.text("IMPUESTO", currentX + 4, yPos + 7, { width: colWidths.tax - 8, align: "right" }); currentX += colWidths.tax;
        doc.text("DESCTO.", currentX + 4, yPos + 7, { width: colWidths.desc - 8, align: "right" }); currentX += colWidths.desc;
        doc.text("TOTAL", currentX + 4, yPos + 7, { width: colWidths.tot - 8, align: "right" }); currentX += colWidths.tot;
        doc.text("PRODUCTOS", currentX + 4, yPos + 7, { width: colWidths.prod - 8 }); currentX += colWidths.prod;
        doc.text("ESTADO", currentX + 4, yPos + 7, { width: colWidths.status - 8, align: "center" }); currentX += colWidths.status;
        doc.text("NOTAS / COMENTARIOS", currentX + 4, yPos + 7, { width: colWidths.notes - 8 });

        return yPos + 22;
      };

      const fmt = (v) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(v);

      let y = drawTableHeader(doc.y);
      let totalGeneral = 0;
      let subtotalGeneral = 0;
      let taxGeneral = 0;
      let descGeneral = 0;
      let rowIndex = 0;

      for (const row of report) {
        // Cálculo dinámico de altura por textos largos en Productos o Notas
        const hProd = doc.heightOfString(row.products, { width: colWidths.prod - 8 });
        const hNotes = doc.heightOfString(row.notes, { width: colWidths.notes - 8 });
        const rowHeight = Math.max(hProd, hNotes, 18) + 8;

        if (y + rowHeight > doc.page.height - doc.page.margins.bottom - 30) {
          doc.addPage();
          y = drawTableHeader(doc.page.margins.top);
          rowIndex = 0;
        }

        // Fondo alternado gris
        if (rowIndex % 2 === 0) {
          doc.rect(startX, y, tableWidth, rowHeight).fill("#f9fafb");
        }

        doc.fillColor("#1f2937").fontSize(8).font("Helvetica");
        let cX = startX;

        // Datos de la fila
        doc.fillColor("#2563eb").font("Helvetica-Bold").text(row.purchaseNumber, cX + 4, y + 5, { width: colWidths.num - 8 }); doc.fillColor("#1f2937").font("Helvetica"); cX += colWidths.num;
        doc.text(fmt(row.subtotal), cX + 4, y + 5, { width: colWidths.sub - 8, align: "right" }); cX += colWidths.sub;
        doc.text(fmt(row.tax), cX + 4, y + 5, { width: colWidths.tax - 8, align: "right" }); cX += colWidths.tax;
        doc.text(fmt(row.discount), cX + 4, y + 5, { width: colWidths.desc - 8, align: "right" }); cX += colWidths.desc;
        doc.font("Helvetica-Bold").text(fmt(row.total), cX + 4, y + 5, { width: colWidths.tot - 8, align: "right" }); doc.font("Helvetica"); cX += colWidths.tot;
        doc.text(row.products, cX + 4, y + 5, { width: colWidths.prod - 8 }); cX += colWidths.prod;

        // Badge de estado simple
        const isPaid = row.status === "PAID" || row.status === "PAGADO";
        doc.fillColor(isPaid ? "#16a34a" : "#ca8a04").font("Helvetica-Bold").text(row.status, cX + 4, y + 5, { width: colWidths.status - 8, align: "center" }); doc.fillColor("#1f2937").font("Helvetica"); cX += colWidths.status;

        doc.text(row.notes, cX + 4, y + 5, { width: colWidths.notes - 8 });

        // Separador hair thin
        doc.moveTo(startX, y + rowHeight).lineTo(startX + tableWidth, y + rowHeight).strokeColor("#e5e7eb").lineWidth(0.5).stroke();

        subtotalGeneral += row.subtotal;
        taxGeneral += row.tax;
        descGeneral += row.discount;
        totalGeneral += row.total;
        y += rowHeight;
        rowIndex++;
      }

      // Fila de Totales Generales
      if (y + 24 > doc.page.height - doc.page.margins.bottom) { doc.addPage(); y = doc.page.margins.top; }
      doc.rect(startX, y, tableWidth, 22).fill("#f1f5f9");
      doc.fillColor("#0f172a").font("Helvetica-Bold").fontSize(8);

      let footerX = startX;
      doc.text("TOTALES", footerX + 4, y + 7, { width: colWidths.num - 8 }); footerX += colWidths.num;
      doc.text(fmt(subtotalGeneral), footerX + 4, y + 7, { width: colWidths.sub - 8, align: "right" }); footerX += colWidths.sub;
      doc.text(fmt(taxGeneral), footerX + 4, y + 7, { width: colWidths.tax - 8, align: "right" }); footerX += colWidths.tax;
      doc.text(fmt(descGeneral), footerX + 4, y + 7, { width: colWidths.desc - 8, align: "right" }); footerX += colWidths.desc;
      doc.text(fmt(totalGeneral), footerX + 4, y + 7, { width: colWidths.tot - 8, align: "right" });

      doc.end();
    } catch (error) {
      next(error);
    }
  },

  downloadDailyPurchasesExcelController: async (req, res, next) => {
    try {
      const { companyId, startDate, endDate } = req.query;

      const rawData = await getDailyPurchasesService(
        Number(companyId),
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined,
      );
      const report = transformPurchases(rawData);

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Compras Desglosadas");

      const company = companyId ? await companyService.getById(Number(companyId)) : null;
      let currentExcelRow = 1;

      if (company) {
        sheet.mergeCells(`A${currentExcelRow}:H${currentExcelRow}`);
        sheet.getCell(`A${currentExcelRow}`).value = company.name;
        sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 14 };
        currentExcelRow++;

        sheet.mergeCells(`A${currentExcelRow}:H${currentExcelRow}`);
        sheet.getCell(`A${currentExcelRow}`).value = `RUC: ${company.ruc}`;
        sheet.getCell(`A${currentExcelRow}`).font = { size: 10, color: { argb: "FF4B5563" } };
        currentExcelRow += 2;
      }

      // Título de la tabla
      sheet.mergeCells(`A${currentExcelRow}:H${currentExcelRow}`);
      sheet.getCell(`A${currentExcelRow}`).value = "Reporte Desglosado de Compras Diarias";
      sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 12 };
      currentExcelRow += 2;

      const tableHeaderRow = currentExcelRow;

      // Configuración estricta de las 8 columnas requeridas
      sheet.columns = [
        { key: "purchaseNumber", width: 18 },
        { key: "subtotal", width: 15 },
        { key: "tax", width: 15 },
        { key: "discount", width: 15 },
        { key: "total", width: 16 },
        { key: "products", width: 40 },
        { key: "status", width: 15 },
        { key: "notes", width: 35 },
      ];

      const headers = ["Número", "Subtotal", "Impuesto", "Descuento", "Total", "Productos", "Estado", "Notas"];
      const headerRowObj = sheet.getRow(tableHeaderRow);

      headers.forEach((h, i) => {
        const cell = headerRowObj.getCell(i + 1);
        cell.value = h;
        cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } }; // Slate Dark Layout
        cell.alignment = { vertical: "middle", horizontal: (i >= 1 && i <= 4) ? "right" : "center" };
      });
      headerRowObj.height = 24;
      currentExcelRow++;

      const dataStartRow = currentExcelRow;

      (report || []).forEach((r, idx) => {
        const row = sheet.addRow({
          purchaseNumber: r.purchaseNumber,
          subtotal: r.subtotal,
          tax: r.tax,
          discount: r.discount,
          total: r.total,
          products: r.products,
          status: r.status,
          notes: r.notes,
        });

        const isEven = idx % 2 === 0;
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: isEven ? "FFFFFFFF" : "FFF9FAFB" } };
          cell.alignment = { vertical: "middle", wrapText: true, horizontal: (colNumber >= 2 && colNumber <= 5) ? "right" : "left" };
          if (colNumber === 7) cell.alignment = { horizontal: "center" };
          cell.border = { bottom: { style: "thin", color: { argb: "FFE5E7EB" } } };
        });

        // Formateo de las columnas monetarias de Excel
        row.getCell(2).numFmt = "[$S/. ]#,##0.00";
        row.getCell(3).numFmt = "[$S/. ]#,##0.00";
        row.getCell(4).numFmt = "[$S/. ]#,##0.00";
        row.getCell(5).numFmt = "[$S/. ]#,##0.00";
      });

      const lastDataRow = sheet.lastRow ? sheet.lastRow.number : dataStartRow;

      // Inserción de Fila de Totales usando Fórmulas de Excel Nativas
      const totalRow = sheet.addRow([]);
      totalRow.getCell(1).value = "TOTALES";
      totalRow.getCell(1).font = { bold: true };

      for (let c = 2; c <= 5; c++) {
        const colLetter = String.fromCharCode(64 + c); // Convierte a B, C, D, E
        const cell = totalRow.getCell(c);
        if (lastDataRow >= dataStartRow) {
          cell.value = { formula: `SUM(${colLetter}${dataStartRow}:${colLetter}${lastDataRow})` };
        } else {
          cell.value = 0;
        }
        cell.font = { bold: true };
        cell.numFmt = "[$S/. ]#,##0.00";
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF1F5F9" } };
      }

      sheet.views = [{ state: "frozen", ySplit: tableHeaderRow }];

      const buffer = await workbook.xlsx.writeBuffer();
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="daily-purchases-${companyId || "report"}.xlsx"`);
      return res.send(buffer);
    } catch (error) {
      next(error);
    }
  },
};
