// controllers/customer-report.controller.js
const customerReportService = require("../services/customer-report.service");

module.exports = {
    // ========================================
    // CUSTOMER REPORT - DOWNLOAD PDF
    // ========================================
    downloadCustomersPDFController: async (req, res, next) => {
        try {
            // SEGURIDAD: Usamos el id de la sesión del usuario, no de la URL
            const companyId = req.user.companyId;

            const pdfBuffer = await customerReportService.getCustomersPDFReport(companyId);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="customers-${companyId || "report"}.pdf"`);

            return res.send(pdfBuffer);
        } catch (error) {
            next(error);
        }
    },

    // ========================================
    // CUSTOMER REPORT - DOWNLOAD EXCEL
    // ========================================
    downloadCustomersExcelController: async (req, res, next) => {
        try {
            // SEGURIDAD: Usamos el id de la sesión del usuario, no de la URL
            const companyId = req.user.companyId;

            const excelBuffer = await customerReportService.getCustomersExcelReport(companyId);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename="customers-${companyId || "report"}.xlsx"`);

            return res.send(excelBuffer);
        } catch (error) {
            next(error);
        }
    }
};