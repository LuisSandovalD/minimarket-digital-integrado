// ========================================
// services/sale-report.service.js
// ========================================

const {
  getDailySales,
  getTopProducts,
} = require("../repositories/sale.repository");

module.exports = {

  // ========================================
  // DAILY REPORT
  // ========================================

  getDailySalesService:
    async (
      companyId,
      startDate,
      endDate
    ) => {

      return getDailySales(
        companyId,
        startDate,
        endDate
      );

    },

  // ========================================
  // TOP PRODUCTS
  // ========================================

  getTopProductsService:
    async (
      companyId
    ) => {

      return getTopProducts(
        companyId
      );

    },

};