// ========================================
// services/sale-report.service.js
// ========================================

const {
  getDailySales,
  getTopProducts,
} = require("../repositories/sale-report.repository"); // 🛠️ Corregido el nombre del archivo aquí

module.exports = {
  // ========================================
  // DAILY REPORT
  // ========================================
  getDailySalesService: async (companyId, startDate, endDate) => {
    return getDailySales(companyId, startDate, endDate);
  },

  // ========================================
  // TOP PRODUCTS
  // ========================================
  getTopProductsService: async (companyId) => {
    // Aseguramos que el valor que viaja al repositorio sea purificado
    const cleanCompanyId = companyId ? Number(companyId) : null;

    return getTopProducts(cleanCompanyId);
  },
};
