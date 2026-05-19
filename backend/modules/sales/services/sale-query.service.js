// ========================================
// services/sale-query.service.js
// ========================================

const {
  getAllSales,
  getSaleById,
  getSaleByNumber,
} = require("../repositories/sale.repository");

module.exports = {

  // ========================================
  // GET SALES
  // ========================================
  getSalesService: async (filters) => {
    try {
      return await getAllSales(filters);
    } catch (error) {
      throw new Error(`Error en el servicio de consultas: ${error.message}`);
    }
  },

  // ========================================
  // GET SALE
  // ========================================
  getSaleService: async (id) => {
    try {
      return await getSaleById(id);
    } catch (error) {
      throw new Error(`Error al obtener venta por ID: ${error.message}`);
    }
  },

  // ========================================
  // GET SALE BY NUMBER
  // ========================================
  getSaleByNumberService: async (saleNumber) => {
    try {
      return await getSaleByNumber(saleNumber);
    } catch (error) {
      throw new Error(`Error al obtener venta por número: ${error.message}`);
    }
  },
};