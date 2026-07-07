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
  // ========================================
  // TOP PRODUCTS - SERVICIO CORREGIDO
  // ========================================

  getTopProductsService: async (companyId) => {
    // Aseguramos que el valor que viaja al repositorio sea purificado
    const cleanCompanyId = companyId ? Number(companyId) : null;

    return getTopProducts(cleanCompanyId);
  },

};