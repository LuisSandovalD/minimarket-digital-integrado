// services/sale-query.service.js
const {
  getAllSales,
  getSaleById,
  getSaleByNumber,
} = require("../repositories/sale-query.repository");

module.exports = {

  // ========================================
  // GET SALES (Listado analítico y paginado)
  // ========================================
  getSalesService: async (filters) => {
    try {

      const result = await getAllSales(filters);

      if (!result || !result.data) {
        return {
          meta: {
            totalRecords: 0,
            totalPages: 0,
            currentPage: Number(filters?.page) || 1,
            pageSize: Number(filters?.limit) || 10,
            hasNextPage: false,
            hasPrevPage: false,
          },
          data: [],
        };
      }

      return result;
    } catch (error) {
      throw new Error(`Error en el servicio de consultas: ${error.message}`, { cause: error });
    }
  },

  // GET SALE BY ID (Búsqueda única con Vendedor)
  getSaleService: async (id) => {
    try {
      if (!id) {
        throw new Error("El ID de la venta es requerido.");
      }

      const sale = await getSaleById(Number(id));

      if (sale && !sale.user) {
        sale.user = {
          id: null,
          name: "Usuario no registrado o eliminado",
          email: "N/A",
          role: "N/A",
          avatar: null,
          phone: null,
          isOnline: false,
          branchId: null,
        };
      }

      return sale;
    } catch (error) {
      throw new Error(`Error al obtener venta por ID: ${error.message}`, { cause: error });
    }
  },

  // GET SALE BY NUMBER (Búsqueda por código de comprobante)
  getSaleByNumberService: async (saleNumber) => {
    try {
      if (!saleNumber || String(saleNumber).trim() === "") {
        throw new Error("El número de venta/comprobante es requerido.");
      }

      const sale = await getSaleByNumber(String(saleNumber).trim());

      if (sale && !sale.user) {
        sale.user = {
          id: null,
          name: "Usuario no registrado o eliminado",
          email: "N/A",
          role: "N/A",
          avatar: null,
          phone: null,
          isOnline: false,
          branchId: null,
        };
      }

      return sale;
    } catch (error) {
      throw new Error(`Error al obtener venta por número: ${error.message}`, { cause: error });
    }
  },
};
