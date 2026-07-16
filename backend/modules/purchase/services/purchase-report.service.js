const { getDailyPurchases } = require("../repositories/purchase-report.repository");

module.exports = {
  getDailyPurchasesService: async (companyId, startDate, endDate) => {
    return getDailyPurchases(companyId, startDate, endDate);
  },
};
