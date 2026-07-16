const PDFDocument = require("pdfkit");

/**
 * Genera un buffer de PDF basado en los datos de clientes y empresa.
 * @param {Array} customers
 * @param {Object|null} company
 * @returns {Promise<Buffer>}
 */
const generateCustomersPDF = (customers, company) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Cabecera Institucional
      if (company) {
        doc.fontSize(12).font("Helvetica-Bold").fillColor("#1f2937").text(company.name || "", 40, 40);
        doc.fontSize(9).font("Helvetica").fillColor("#4b5563").text(`RUC: ${company.ruc || ""}`, 40, 54);
      }

      doc.fontSize(16).font("Helvetica-Bold").fillColor("#0f172a").text("Reporte Maestro de Clientes", { align: "center" });
      doc.moveDown(1.5);

      const colWidths = { customer: 135, document: 85, contact: 125, credit: 60, debt: 60, status: 50 };
      const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);
      const startX = 40;

      const drawTableHeader = (yPos) => {
        doc.rect(startX, yPos, tableWidth, 22).fill("#0f172a");
        doc.fillColor("#ffffff").fontSize(8).font("Helvetica-Bold");

        let currentX = startX;
        doc.text("CLIENTE", currentX + 5, yPos + 7, { width: colWidths.customer - 10 }); currentX += colWidths.customer;
        doc.text("DOCUMENTO", currentX + 5, yPos + 7, { width: colWidths.document - 10 }); currentX += colWidths.document;
        doc.text("CONTACTO", currentX + 5, yPos + 7, { width: colWidths.contact - 10 }); currentX += colWidths.contact;
        doc.text("CRÉDITO", currentX + 5, yPos + 7, { width: colWidths.credit - 10, align: "right" }); currentX += colWidths.credit;
        doc.text("DEUDA", currentX + 5, yPos + 7, { width: colWidths.debt - 10, align: "right" }); currentX += colWidths.debt;
        doc.text("ESTADO", currentX + 5, yPos + 7, { width: colWidths.status - 10, align: "center" });

        return yPos + 22;
      };

      let y = drawTableHeader(doc.y);
      let rowIndex = 0;

      for (const customer of (customers || [])) {
        const documento = `${customer.documentType || ""} ${customer.documentNumber || ""}`.trim() || "-";
        const contacto = `${customer.phone || ""}\n${customer.email || ""}`.trim() || "-";
        const credito = Number(customer.creditLimit || 0);
        const deuda = Number(customer.currentDebt || 0);
        const estado = customer.isActive ? "ACTIVO" : "INACTIVO";

        const hCust = doc.heightOfString(customer.name || "", { width: colWidths.customer - 10 });
        const hCont = doc.heightOfString(contacto, { width: colWidths.contact - 10 });
        const rowHeight = Math.max(hCust, hCont, 18) + 10;

        if (y + rowHeight > doc.page.height - doc.page.margins.bottom - 20) {
          doc.addPage();
          y = drawTableHeader(doc.page.margins.top);
          rowIndex = 0;
        }

        if (rowIndex % 2 === 0) {
          doc.rect(startX, y, tableWidth, rowHeight).fill("#f9fafb");
        }

        doc.fillColor("#1f2937").fontSize(8).font("Helvetica");
        let cX = startX;

        doc.font("Helvetica-Bold").text(customer.name || "", cX + 5, y + 6, { width: colWidths.customer - 10 }); doc.font("Helvetica"); cX += colWidths.customer;
        doc.text(documento, cX + 5, y + 6, { width: colWidths.document - 10 }); cX += colWidths.document;
        doc.text(contacto, cX + 5, y + 6, { width: colWidths.contact - 10 }); cX += colWidths.contact;

        doc.text(`S/ ${credito.toFixed(2)}`, cX + 5, y + 6, { width: colWidths.credit - 10, align: "right" }); cX += colWidths.credit;

        if (deuda > 0) doc.fillColor("#b91c1c").font("Helvetica-Bold");
        doc.text(`S/ ${deuda.toFixed(2)}`, cX + 5, y + 6, { width: colWidths.debt - 10, align: "right" });
        doc.fillColor("#1f2937").font("Helvetica");
        cX += colWidths.debt;

        const statusColor = customer.isActive ? "#16a34a" : "#4b5563";
        doc.fillColor(statusColor).font("Helvetica-Bold").text(estado, cX + 5, y + 6, { width: colWidths.status - 10, align: "center" });

        doc.moveTo(startX, y + rowHeight).lineTo(startX + tableWidth, y + rowHeight).strokeColor("#e5e7eb").lineWidth(0.5).stroke();

        y += rowHeight;
        rowIndex++;
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateCustomersPDF };
