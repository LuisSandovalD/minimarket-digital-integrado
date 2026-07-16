const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const companyService = require("../../company/services/company.service");
const paymentsService = require("../services/payments.service");
const { safeFormatDateTime, formatCurrency } = require("../../reports/report-helpers");

module.exports = {
  downloadPaymentsPDFController: async (req, res, next) => {
    try {
      const { companyId } = req.query;
      const payments = await paymentsService.getPayments(Number(companyId));

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="payments-${companyId || "report"}.pdf"`);
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      doc.pipe(res);

      const company = companyId ? await companyService.getById(Number(companyId)) : null;
      if (company) {
        doc.fontSize(16).text(company.name || "", { align: "center" });
        doc.fontSize(10).text(`RUC: ${company.ruc || ""}`, { align: "center" });
      }

      doc.moveDown(1);
      doc.fontSize(14).text("Listado de Pagos", { align: "left" });
      doc.moveDown(0.5);

      doc.fontSize(10).font("Helvetica-Bold");
      doc.text("Fecha", 40, doc.y, { continued: true, width: 120 });
      doc.text("Referencia", 170, doc.y, { continued: true, width: 200 });
      doc.text("Monto", 380, doc.y, { width: 120, align: "right" });
      doc.moveDown(0.5);
      doc.font("Helvetica").fontSize(10);

      const fmt = (v) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(v || 0));

      for (const p of Array.isArray(payments) ? payments : []) {
        doc.text(safeFormatDateTime(p.createdAt) || "-", 40, doc.y, { continued: true, width: 120 });
        doc.text(p.reference || (p.sale?.saleNumber || p.purchase?.purchaseNumber) || "", 170, doc.y, { continued: true, width: 200 });
        doc.text(formatCurrency(p.amount || 0), 380, doc.y, { width: 120, align: "right" });
        doc.moveDown(0.5);
      }

      doc.end();
    } catch (error) { next(error); }
  },

  downloadPaymentsExcelController: async (req, res, next) => {
    try {
      const { companyId } = req.query;
      const payments = await paymentsService.getPayments(Number(companyId));

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Payments");

      const company = companyId ? await companyService.getById(Number(companyId)) : null;
      if (company) {
        sheet.addRow([company.name || ""]);
        sheet.addRow([`RUC: ${company.ruc || ""}`]);
        sheet.addRow([]);
      }

      sheet.addRow(["Fecha", "Referencia", "Método", "Monto"]);
      (Array.isArray(payments) ? payments : []).forEach((p) => {
        sheet.addRow([safeFormatDateTime(p.createdAt) || "", p.reference || "", (p.method && p.method.name) || "", Number(p.amount || 0)]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="payments-${companyId || "report"}.xlsx"`);
      return res.send(buffer);
    } catch (error) { next(error); }
  },
};
