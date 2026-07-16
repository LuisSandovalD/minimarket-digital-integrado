// ========================================
// services/executive-report.service.js
// ========================================

const businessContextService = require("./business-context.service");

const generateExecutiveReport =
    async ({
      companyId,
    }) => {
      const data =
            await businessContextService.build(companyId);

      return {
        salesMonth: data.totalSales,
        purchasesMonth: data.totalPurchases,
        topProducts: data.topProducts,
        lowStock: data.lowStockProducts,
        overstock: data.overstockProducts,
      };
    };

module.exports = {
  generateExecutiveReport,
};
