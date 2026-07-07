// ========================================
// controllers/report-sale.controller.js
// ========================================

const {
  getDailySalesService,
  getTopProductsService,
} = require("../services/sale.service");

const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const companyService = require("../../company/services/company.service");
const {
  fetchImageBuffer,
  safeFormatDate,
  safeFormatDateTime,
  formatCurrency,
} = require("../../reports/report-helpers");

module.exports = {

  // ========================================
  // DAILY REPORT
  // ========================================

  getDailySalesController:
    async (req, res, next) => {
      try {
        const { companyId, startDate, endDate } = req.query;
        const report = await getDailySalesService(
          Number(companyId),
          new Date(startDate),
          new Date(endDate)
        );
        return res.json({ success: true, data: report });
      } catch (error) {
        next(error);
      }
    },

  // ========================================
  // TOP PRODUCTS
  // ========================================

  getTopProductsController:
    async (req, res, next) => {
      try {
        const report = await getTopProductsService(Number(req.query.companyId));
        return res.json({ success: true, data: report });
      } catch (error) {
        next(error);
      }
    },

  // ========================================
  // DAILY REPORT - DOWNLOAD PDF (UI-Matched)
  // ========================================

  downloadDailySalesPDFController:
    async (req, res, next) => {
      try {
        const { companyId, startDate, endDate } = req.query;
        const report = await getDailySalesService(
          Number(companyId),
          new Date(startDate),
          new Date(endDate)
        );

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="daily-sales-${companyId || "report"}.pdf"`
        );

        // Estilo de paleta oscura combinada con filas limpias
        const doc = new PDFDocument({ size: "A4", margin: 40 });
        doc.pipe(res);

        // Header de la empresa
        const company = companyId ? await companyService.getById(Number(companyId)) : null;
        let img = null;
        if (company && company.logo) {
          img = await fetchImageBuffer(company.logo);
        }

        if (img && img.buffer) {
          try {
            doc.image(img.buffer, 40, 40, { width: 60 });
          } catch (e) { }
        }

        const headerX = img && img.buffer ? 110 : 40;
        const headerY = 45;
        if (company) {
          doc.fillColor('#1f2937').fontSize(14).font('Helvetica-Bold').text(company.name || "", headerX, headerY);
          doc.fillColor('#4b5563').fontSize(9).font('Helvetica').text(`RUC: ${company.ruc || ""}`, headerX, headerY + 18);
        }

        doc.fillColor('#0f172a').fontSize(16).font('Helvetica-Bold').text("Reporte Diario de Ventas", { align: "center" });
        doc.moveDown(1.5);

        // Configuración de tabla para coincidir con las columnas de tu imagen
        const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const colWidths = { venta: 110, cliente: 120, subtotal: 65, descuento: 65, total: 75, productos: 80 };
        let y = doc.y;

        // Renderizado de cabeceras (Fondo oscuro tipo UI Dark)
        doc.rect(40, y, pageWidth, 24).fill('#0f172a');
        doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold');

        doc.text('VENTA', 45, y + 7, { width: colWidths.venta - 10 });
        doc.text('CLIENTE', 40 + colWidths.venta + 5, y + 7, { width: colWidths.cliente - 10 });
        doc.text('SUBTOTAL', 40 + colWidths.venta + colWidths.cliente + 5, y + 7, { width: colWidths.subtotal - 10, align: 'right' });
        doc.text('DESCUENTO', 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + 5, y + 7, { width: colWidths.descuento - 10, align: 'right' });
        doc.text('TOTAL', 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + 5, y + 7, { width: colWidths.total - 10, align: 'right' });
        doc.text('PRODUCTOS', 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + colWidths.total + 5, y + 7, { width: colWidths.productos - 10, align: 'center' });

        y += 24;
        let totalSum = 0;

        for (const row of report) {
          if (y > doc.page.height - doc.page.margins.bottom - 30) {
            doc.addPage();
            y = doc.y + 10;
            // Redibujar cabeceras en nueva página
            doc.rect(40, y, pageWidth, 24).fill('#0f172a');
            doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold');
            doc.text('VENTA', 45, y + 7, { width: colWidths.venta - 10 });
            doc.text('CLIENTE', 40 + colWidths.venta + 5, y + 7, { width: colWidths.cliente - 10 });
            doc.text('SUBTOTAL', 40 + colWidths.venta + colWidths.cliente + 5, y + 7, { width: colWidths.subtotal - 10, align: 'right' });
            doc.text('DESCUENTO', 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + 5, y + 7, { width: colWidths.descuento - 10, align: 'right' });
            doc.text('TOTAL', 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + 5, y + 7, { width: colWidths.total - 10, align: 'right' });
            doc.text('PRODUCTOS', 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + colWidths.total + 5, y + 7, { width: colWidths.productos - 10, align: 'center' });
            y += 24;
          }

          // Línea divisoria tenue horizontal por fila
          doc.moveTo(40, y).lineTo(40 + pageWidth, y).strokeColor('#e5e7eb').lineWidth(0.5).stroke();

          const ventaText = row.code || row.id || row.description || '-';
          const clienteText = row.customerName || row.client || row.label || 'Cliente General';
          const subtotal = Number(row.subtotal || 0);
          const descuento = Number(row.discount || 0);
          const total = Number(row.total || row.amount || 0);
          const productosCount = row.productsCount || row.quantity || 1;

          totalSum += total;

          doc.fillColor('#3b82f6').font('Helvetica-Bold').fontSize(9).text(ventaText, 45, y + 6, { width: colWidths.venta - 10 });
          doc.fillColor('#1f2937').font('Helvetica').fontSize(9).text(clienteText, 40 + colWidths.venta + 5, y + 6, { width: colWidths.cliente - 10 });
          doc.fillColor('#2563eb').text(formatCurrency(subtotal), 40 + colWidths.venta + colWidths.cliente + 5, y + 6, { width: colWidths.subtotal - 10, align: 'right' });
          doc.fillColor('#4b5563').text(formatCurrency(descuento), 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + 5, y + 6, { width: colWidths.descuento - 10, align: 'right' });
          doc.fillColor('#000000').font('Helvetica-Bold').text(formatCurrency(total), 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + 5, y + 6, { width: colWidths.total - 10, align: 'right' });
          doc.fillColor('#1f2937').font('Helvetica').text(`${productosCount} Productos`, 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + colWidths.total + 5, y + 6, { width: colWidths.productos - 10, align: 'center' });

          y += 22;
        }

        // Fila Final de Totales
        doc.moveTo(40, y).lineTo(40 + pageWidth, y).strokeColor('#9ca3af').lineWidth(1).stroke();
        doc.fillColor('#000000').font('Helvetica-Bold').fontSize(10);
        doc.text('TOTAL GENERAL', 45, y + 8, { width: colWidths.venta + colWidths.cliente });
        doc.text(formatCurrency(totalSum), 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + 5, y + 8, { width: colWidths.total - 10, align: 'right' });

        doc.end();
      } catch (error) {
        next(error);
      }
    },

  // ========================================
  // DAILY REPORT - DOWNLOAD EXCEL (Exact UI Layout)
  // ========================================

  downloadDailySalesExcelController:
    async (req, res, next) => {
      try {
        const { companyId, startDate, endDate } = req.query;
        const report = await getDailySalesService(
          Number(companyId),
          new Date(startDate),
          new Date(endDate)
        );

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Daily Sales Layout");

        // Info de la empresa (Filas 1-3 libres de sobreescritura)
        const company = companyId ? await companyService.getById(Number(companyId)) : null;
        let img = null;
        if (company && company.logo) {
          img = await fetchImageBuffer(company.logo);
        }

        let headerStartRow = 1;
        if (company) {
          sheet.mergeCells(`B${headerStartRow}:F${headerStartRow}`);
          sheet.getCell(`B${headerStartRow}`).value = company.name || "";
          sheet.getCell(`B${headerStartRow}`).font = { bold: true, size: 14, color: { argb: 'FF1F2937' } };
          headerStartRow++;

          sheet.mergeCells(`B${headerStartRow}:F${headerStartRow}`);
          sheet.getCell(`B${headerStartRow}`).value = `RUC: ${company.ruc || ""}`;
          sheet.getCell(`B${headerStartRow}`).font = { size: 10, color: { argb: 'FF4B5563' } };
          headerStartRow += 2; // Espacio prudencial
        } else {
          headerStartRow = 4;
        }

        if (img && img.buffer) {
          try {
            const ext = img.extension || 'png';
            const imgId = workbook.addImage({ buffer: img.buffer, extension: ext });
            sheet.addImage(imgId, { tl: { col: 0, row: 0 }, ext: { width: 55, height: 55 } });
          } catch (e) { }
        }

        // Definición Manual de Columnas para evitar borrar filas superiores
        const tableHeaderRow = headerStartRow;

        const colsConfig = [
          { label: "VENTA", width: 22 },
          { label: "CLIENTE", width: 26 },
          { label: "SUBTOTAL", width: 16 },
          { label: "DESCUENTO", width: 16 },
          { label: "TOTAL", width: 16 },
          { label: "PRODUCTOS", width: 18 }
        ];

        // Escribir y estilizar el header exactamente como la barra oscura de la UI
        colsConfig.forEach((col, index) => {
          const cell = sheet.getCell(tableHeaderRow, index + 1);
          cell.value = col.label;
          sheet.getColumn(index + 1).width = col.width;

          // Estilo Dark UI
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
          cell.alignment = {
            vertical: 'middle',
            horizontal: (col.label === 'SUBTOTAL' || col.label === 'DESCUENTO' || col.label === 'TOTAL') ? 'right' : (col.label === 'PRODUCTOS' ? 'center' : 'left')
          };
        });

        let currentExcelRow = tableHeaderRow + 1;

        // Inserción de Datos iterando dinámicamente
        (report || []).forEach((r) => {
          const rowData = [
            r.code || r.id || r.description || "",
            r.customerName || r.client || r.label || "Cliente General",
            Number(r.subtotal || 0),
            Number(r.discount || 0),
            Number(r.total || r.amount || 0),
            `${r.productsCount || r.quantity || 1} Productos`
          ];

          sheet.insertRow(currentExcelRow, rowData);

          // Estilos celda por celda para imitar la UI cargada
          const cVenta = sheet.getCell(`A${currentExcelRow}`);
          cVenta.font = { bold: true, color: { argb: 'FF2563EB' } }; // Azul de link web

          const cCliente = sheet.getCell(`B${currentExcelRow}`);
          cCliente.font = { color: { argb: 'FF1F2937' } };

          const cSubtotal = sheet.getCell(`C${currentExcelRow}`);
          cSubtotal.numFmt = '[$S/. ]#,##0.00';
          cSubtotal.font = { color: { argb: 'FF2563EB' } }; // Azul sutil web

          const cDescuento = sheet.getCell(`D${currentExcelRow}`);
          cDescuento.numFmt = '[$S/. ]#,##0.00';
          cDescuento.font = { color: { argb: 'FF4B5563' } };

          const cTotal = sheet.getCell(`E${currentExcelRow}`);
          cTotal.numFmt = '[$S/. ]#,##0.00';
          cTotal.font = { bold: true, color: { argb: 'FF000000' } }; // Resaltado en negrita

          const cProductos = sheet.getCell(`F${currentExcelRow}`);
          cProductos.alignment = { horizontal: 'center' };

          // Bordes inferiores ligeros divisores de fila
          for (let colIdx = 1; colIdx <= 6; colIdx++) {
            sheet.getCell(currentExcelRow, colIdx).border = {
              bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } }
            };
          }

          currentExcelRow++;
        });

        // Fila de Totales final usando fórmulas nativas de Excel
        sheet.getCell(`A${currentExcelRow}`).value = 'TOTAL GENERAL';
        sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 11 };

        const dataStartRow = tableHeaderRow + 1;
        const dataEndRow = currentExcelRow - 1;

        // Fórmulas de sumatorias
        sheet.getCell(`C${currentExcelRow}`).value = { formula: `SUM(C${dataStartRow}:C${dataEndRow})` };
        sheet.getCell(`C${currentExcelRow}`).numFmt = '[$S/. ]#,##0.00';
        sheet.getCell(`C${currentExcelRow}`).font = { bold: true };

        sheet.getCell(`D${currentExcelRow}`).value = { formula: `SUM(D${dataStartRow}:D${dataEndRow})` };
        sheet.getCell(`D${currentExcelRow}`).numFmt = '[$S/. ]#,##0.00';
        sheet.getCell(`D${currentExcelRow}`).font = { bold: true };

        sheet.getCell(`E${currentExcelRow}`).value = { formula: `SUM(E${dataStartRow}:E${dataEndRow})` };
        sheet.getCell(`E${currentExcelRow}`).numFmt = '[$S/. ]#,##0.00';
        sheet.getCell(`E${currentExcelRow}`).font = { bold: true, color: { argb: 'FF000000' } };

        // Doble línea inferior indicadora de cierre contable en fila totales
        for (let colIdx = 1; colIdx <= 6; colIdx++) {
          sheet.getCell(currentExcelRow, colIdx).border = {
            top: { style: 'thin', color: { argb: 'FF9CA3AF' } },
            bottom: { style: 'double', color: { argb: 'FF1F2937' } }
          };
        }

        // Fijar cabeceras al hacer scroll
        sheet.views = [{ state: 'frozen', ySplit: tableHeaderRow }];

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename="daily-sales-${companyId || "report"}.xlsx"`);
        return res.send(buffer);

      } catch (error) {
        next(error);
      }
    },

  // ========================================
  // TOP PRODUCTS - DOWNLOAD PDF
  // ========================================

  downloadTopProductsPDFController:
    async (req, res, next) => {
      try {
        const { companyId } = req.query;

        // 1. Validar y parsear de forma segura el ID de la empresa
        const parsedCompanyId = parseInt(companyId, 10);
        if (!parsedCompanyId || isNaN(parsedCompanyId)) {
          return res.status(400).json({
            error: "El parámetro companyId es requerido y debe ser un número válido."
          });
        }

        // 2. Consumir el servicio con el número ya validado
        const report = await getTopProductsService(parsedCompanyId);

        // 3. Cabeceras optimizadas para visualización nativa (inline) e impresión en el iframe
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `inline; filename="top-products-${parsedCompanyId}.pdf"`
        );

        const doc = new PDFDocument({ size: "A4", margin: 40 });
        doc.pipe(res);

        const company = await companyService.getById(parsedCompanyId);
        let img = null;
        if (company && company.logo) {
          img = await fetchImageBuffer(company.logo);
        }

        if (img && img.buffer) {
          try {
            doc.image(img.buffer, 40, 40, { width: 60 });
          } catch (e) { }
        }
        const headerX = img && img.buffer ? 110 : 40;
        const headerY = 45;
        if (company) {
          doc.fontSize(14).font('Helvetica-Bold').text(company.name || "", headerX, headerY);
          doc.fontSize(10).font('Helvetica').text(`RUC: ${company.ruc || ""}`, headerX, headerY + 18);
        }

        doc.fontSize(16).font('Helvetica-Bold').text("Top Productos", { align: "center" });
        doc.moveDown(1);

        const pageWidth2 = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const colW = { name: pageWidth2 - 150, qty: 60, total: 90 };
        let y2 = doc.y;

        doc.rect(doc.x, y2, pageWidth2, 20).fill('#0f172a');
        doc.fillColor('#fff').fontSize(10).font('Helvetica-Bold');
        doc.text('Producto', doc.x + 4, y2 + 4, { width: colW.name - 8 });
        doc.text('Cantidad', doc.x + colW.name + 4, y2 + 4, { width: colW.qty - 8, align: 'right' });
        doc.text('Total', doc.x + colW.name + colW.qty + 4, y2 + 4, { width: colW.total - 8, align: 'right' });

        y2 += 26;
        doc.font('Helvetica').fontSize(10).fillColor('#000');

        let qtySum = 0;
        let totSum = 0;
        for (const row of report) {
          if (y2 > doc.page.height - doc.page.margins.bottom - 40) {
            doc.addPage();
            y2 = doc.y;
            doc.rect(doc.x, y2, pageWidth2, 20).fill('#0f172a');
            doc.fillColor('#fff').fontSize(10).font('Helvetica-Bold');
            doc.text('Producto', doc.x + 4, y2 + 4, { width: colW.name - 8 });
            doc.text('Cantidad', doc.x + colW.name + 4, y2 + 4, { width: colW.qty - 8, align: 'right' });
            doc.text('Total', doc.x + colW.name + colW.qty + 4, y2 + 4, { width: colW.total - 8, align: 'right' });
            y2 += 26;
            doc.font('Helvetica').fontSize(10).fillColor('#000');
          }

          doc.moveTo(doc.x, y2 - 4).strokeColor('#e5e7eb').lineWidth(0.5).stroke();

          const name = row.productName || row.name || '';
          const qty = Number(row.quantity || row.count || 0);
          const total = Number(row.total || row.amount || 0);
          qtySum += qty;
          totSum += total;

          doc.fillColor('#1f2937').text(name, doc.x + 4, y2, { width: colW.name - 8 });
          doc.text(String(qty), doc.x + colW.name + 4, y2, { width: colW.qty - 8, align: 'right' });
          doc.fillColor('#000').font('Helvetica-Bold').text(new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(total), doc.x + colW.name + colW.qty + 4, y2, { width: colW.total - 8, align: 'right' });
          doc.font('Helvetica');

          y2 += 18;
        }

        doc.moveTo(doc.x, y2 + 4).strokeColor('#9ca3af').lineWidth(1).stroke();
        doc.font('Helvetica-Bold').text('Totales', doc.x + 4, y2 + 8, { width: colW.name - 8 });
        doc.text(String(qtySum), doc.x + colW.name + 4, y2 + 8, { width: colW.qty - 8, align: 'right' });
        doc.text(new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(totSum), doc.x + colW.name + colW.qty + 4, y2 + 8, { width: colW.total - 8, align: 'right' });

        doc.end();
      } catch (error) {
        next(error);
      }
    },

  // ========================================
  // TOP PRODUCTS - DOWNLOAD EXCEL
  // ========================================

  downloadTopProductsExcelController:
    async (req, res, next) => {
      try {
        const { companyId } = req.query;

        // Validar y parsear de forma segura el ID de la empresa
        const parsedCompanyId = parseInt(companyId, 10);
        if (!parsedCompanyId || isNaN(parsedCompanyId)) {
          return res.status(400).json({
            error: "El parámetro companyId es requerido y debe ser un número válido."
          });
        }

        const report = await getTopProductsService(parsedCompanyId);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Top Products");

        const company = await companyService.getById(parsedCompanyId);
        let imgBuf = null;
        if (company && company.logo) {
          imgBuf = await fetchImageBuffer(company.logo);
        }

        let headerIdx = 1;
        if (company) {
          sheet.mergeCells(`B${headerIdx}:C${headerIdx}`);
          sheet.getCell(`B${headerIdx}`).value = company.name || "";
          sheet.getCell(`B${headerIdx}`).font = { bold: true, size: 14 };
          headerIdx++;
          sheet.mergeCells(`B${headerIdx}:C${headerIdx}`);
          sheet.getCell(`B${headerIdx}`).value = `RUC: ${company.ruc || ""}`;
          headerIdx += 2;
        } else {
          headerIdx = 4;
        }

        if (imgBuf && imgBuf.buffer) {
          try {
            const ext = imgBuf.extension || 'png';
            const imgId = workbook.addImage({ buffer: imgBuf.buffer, extension: ext });
            sheet.addImage(imgId, { tl: { col: 0, row: 0 }, ext: { width: 55, height: 55 } });
          } catch (e) { }
        }

        const colsConfig2 = [
          { label: "Producto", width: 50 },
          { label: "Cantidad", width: 18 },
          { label: "Total", width: 20 }
        ];

        colsConfig2.forEach((col, index) => {
          const cell = sheet.getCell(headerIdx, index + 1);
          cell.value = col.label;
          sheet.getColumn(index + 1).width = col.width;
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
          cell.alignment = { vertical: 'middle', horizontal: index === 0 ? 'left' : 'right' };
        });

        let currentExcelRow2 = headerIdx + 1;

        (report || []).forEach((r) => {
          const rowData = [
            r.productName || r.name || "",
            Number(r.quantity || r.count || 0),
            Number(r.total || r.amount || 0)
          ];
          sheet.insertRow(currentExcelRow2, rowData);

          sheet.getCell(`A${currentExcelRow2}`).font = { color: { argb: 'FF1F2937' } };
          sheet.getCell(`B${currentExcelRow2}`).alignment = { horizontal: 'right' };

          const totalCell = sheet.getCell(`C${currentExcelRow2}`);
          totalCell.numFmt = '[$S/. ]#,##0.00';
          totalCell.font = { bold: true };

          for (let i = 1; i <= 3; i++) {
            sheet.getCell(currentExcelRow2, i).border = { bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
          }
          currentExcelRow2++;
        });

        const dataStart2 = headerIdx + 1;
        const dataEndRow2 = currentExcelRow2 - 1;

        sheet.getCell(`A${currentExcelRow2}`).value = 'Totales';
        sheet.getCell(`A${currentExcelRow2}`).font = { bold: true };
        sheet.getCell(`B${currentExcelRow2}`).value = { formula: `SUM(B${dataStart2}:B${dataEndRow2})` };
        sheet.getCell(`B${currentExcelRow2}`).font = { bold: true };
        sheet.getCell(`C${currentExcelRow2}`).value = { formula: `SUM(C${dataStart2}:C${dataEndRow2})` };
        sheet.getCell(`C${currentExcelRow2}`).numFmt = '[$S/. ]#,##0.00';
        sheet.getCell(`C${currentExcelRow2}`).font = { bold: true };

        for (let i = 1; i <= 3; i++) {
          sheet.getCell(currentExcelRow2, i).border = {
            top: { style: 'thin', color: { argb: 'FF9CA3AF' } },
            bottom: { style: 'double', color: { argb: 'FF1F2937' } }
          };
        }

        sheet.views = [{ state: 'frozen', ySplit: headerIdx }];

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename="top-products-${parsedCompanyId}.xlsx"`);
        return res.send(buffer);

      } catch (error) {
        next(error);
      }
    }
};