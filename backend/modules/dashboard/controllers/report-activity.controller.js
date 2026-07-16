const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const activityService = require("../services/activity.service");
const companyService = require("../../company/services/company.service");
const { safeFormatDateTime } = require("../../reports/report-helpers");

module.exports = {
  downloadActivityPDFController: async (req, res, next) => {
    try {
      const { companyId } = req.query;
      // activityService.getActivity returns { logs, sessions }
      const activityResult = await activityService.getActivity(Number(companyId));
      const activities = activityResult && activityResult.logs ? activityResult.logs : [];

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="activity-${companyId || "report"}.pdf"`);
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      doc.pipe(res);

      const company = companyId ? await companyService.getById(Number(companyId)) : null;
      if (company) {
        doc.fontSize(16).text(company.name || "", { align: "center" });
        doc.fontSize(10).text(`RUC: ${company.ruc || ""}`, { align: "center" });
      }

      doc.moveDown(1);
      doc.fontSize(14).text("Registro de Auditoría", { align: "left" });
      doc.moveDown(0.5);

      doc.fontSize(10).font("Helvetica-Bold");
      doc.text("Fecha", 40, doc.y, { continued: true, width: 140 });
      doc.text("Usuario", 190, doc.y, { continued: true, width: 140 });
      doc.text("Acción", 340, doc.y, { width: 200 });
      doc.moveDown(0.5);
      doc.font("Helvetica").fontSize(10);

      for (const a of Array.isArray(activities) ? activities : []) {
        doc.text(safeFormatDateTime(a.createdAt) || "-", 40, doc.y, { continued: true, width: 140 });
        doc.text(a.user?.name || a.user?.email || "", 190, doc.y, { continued: true, width: 140 });
        doc.text(a.action || a.description || "", 340, doc.y, { width: 200 });
        doc.moveDown(0.5);
      }

      doc.end();
    } catch (error) { next(error); }
  },

  downloadActivityExcelController: async (req, res, next) => {
    try {
      const { companyId } = req.query;
      const activityResult = await activityService.getActivity(Number(companyId));
      const activities = activityResult && activityResult.logs ? activityResult.logs : [];

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Activity");

      const company = companyId ? await companyService.getById(Number(companyId)) : null;
      if (company) {
        sheet.addRow([company.name || ""]);
        sheet.addRow([`RUC: ${company.ruc || ""}`]);
        sheet.addRow([]);
      }

      sheet.addRow(["Fecha", "Usuario", "Acción", "Origen"])
      ; (Array.isArray(activities) ? activities : []).forEach((a) => {
        sheet.addRow([safeFormatDateTime(a.createdAt) || "", a.user?.name || a.user?.email || "", a.action || a.description || "", a.source || ""]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="activity-${companyId || "report"}.xlsx"`);
      return res.send(buffer);
    } catch (error) { next(error); }
  },
};
