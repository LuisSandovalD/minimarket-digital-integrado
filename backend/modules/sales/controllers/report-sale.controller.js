const { getDailySalesService, getTopProductsService } = require("../services/sale.service");
const companyService = require("../../company/services/company.service");
const { fetchImageBuffer, formatCurrency } = require("../../reports/report-helpers");

// Importación de los nuevos helpers de diseño modular
const { generateDailySalesPDF } = require("../helpers/daily-sales-pdf.helper");
const { generateDailySalesExcel } = require("../helpers/daily-sales-excel.helper");
const { generateTopProductsPDF } = require("../helpers/top-products-pdf.helper");
const { generateTopProductsExcel } = require("../helpers/top-products-excel.helper");

async function getCompanyReportData(companyId) {
  const company = companyId ? await companyService.getById(Number(companyId)) : null;
  let img = null;
  if (company?.logo) img = await fetchImageBuffer(company.logo);
  return { company, img };
}

module.exports = {
  getDailySalesController: async (req, res, next) => {
    try {
      const { companyId, startDate, endDate } = req.query;
      const report = await getDailySalesService(Number(companyId), new Date(startDate), new Date(endDate));
      return res.json({ success: true, data: report });
    } catch (error) { next(error); }
  },

  getTopProductsController: async (req, res, next) => {
    try {
      const report = await getTopProductsService(Number(req.query.companyId));
      return res.json({ success: true, data: report });
    } catch (error) { next(error); }
  },

  downloadDailySalesPDFController: async (req, res, next) => {
    try {
      const { companyId, startDate, endDate } = req.query;
      const report = await getDailySalesService(Number(companyId), new Date(startDate), new Date(endDate));
      const { company, img } = await getCompanyReportData(companyId);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="daily-sales-${companyId || "report"}.pdf"`);

      const doc = generateDailySalesPDF({ report, company, img, formatCurrency });
      doc.pipe(res);
    } catch (error) { next(error); }
  },

  downloadDailySalesExcelController: async (req, res, next) => {
    try {
      const { companyId, startDate, endDate } = req.query;
      const report = await getDailySalesService(Number(companyId), new Date(startDate), new Date(endDate));
      const { company, img } = await getCompanyReportData(companyId);

      const buffer = await generateDailySalesExcel({ report, company, img });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="daily-sales-${companyId || "report"}.xlsx"`);
      return res.send(buffer);
    } catch (error) { next(error); }
  },

  downloadTopProductsPDFController: async (req, res, next) => {
    try {
      const parsedCompanyId = parseInt(req.query.companyId, 10);
      if (!parsedCompanyId || isNaN(parsedCompanyId)) return res.status(400).json({ error: "companyId inválido." });

      const report = await getTopProductsService(parsedCompanyId);
      const { company, img } = await getCompanyReportData(parsedCompanyId);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="top-products-${parsedCompanyId}.pdf"`);

      const doc = generateTopProductsPDF({ report, company, img });
      doc.pipe(res);
    } catch (error) { next(error); }
  },

  downloadTopProductsExcelController: async (req, res, next) => {
    try {
      const parsedCompanyId = parseInt(req.query.companyId, 10);
      if (!parsedCompanyId || isNaN(parsedCompanyId)) return res.status(400).json({ error: "companyId inválido." });

      const report = await getTopProductsService(parsedCompanyId);
      const { company, img: imgBuf } = await getCompanyReportData(parsedCompanyId);

      const buffer = await generateTopProductsExcel({ report, company, imgBuf });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="top-products-${parsedCompanyId}.xlsx"`);
      return res.send(buffer);
    } catch (error) { next(error); }
  }
};