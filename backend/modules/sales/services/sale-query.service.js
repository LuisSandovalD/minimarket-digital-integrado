// ========================================
// services/sale-query.service.js
// ========================================

const {
  getAllSales,
  getSaleById,
  getSaleByNumber,
} = require("../repositories/sale-query.repository"); // 🚀 Sincronizado con el repositorio optimizado

module.exports = {

  // ========================================
  // GET SALES (Listado analítico y paginado)
  // ========================================
  getSalesService: async (filters) => {
    try {
      /**
       * El objeto 'filters' procesa y delega al repositorio las siguientes propiedades reales:
       * - Identificadores: companyId, branchId, customerId, userId
       * - Búsqueda por texto: search
       * - Selectores de Estado: status, paymentStatus
       * - Filtros de fecha y montos: startDate, endDate, minTotal, maxTotal
       * - Ordenamiento y Paginación: sortBy, sortOrder, page, limit
       */
      const result = await getAllSales(filters);

      // 🛡️ CONTROL DE INTEGRIDAD CRÍTICO:
      // Si por alguna razón el repositorio devuelve data indefinida o mal estructurada,
      // nos aseguramos de que no rompa el flujo de la app devolviendo la estructura base.
      if (!result || !result.data) {
        return {
          meta: {
            totalRecords: 0,
            totalPages: 0,
            currentPage: Number(filters?.page) || 1,
            pageSize: Number(filters?.limit) || 10,
            hasNextPage: false,
            hasPrevPage: false
          },
          data: []
        };
      }

      // Retorna exactamente el objeto con { meta, data } estructurado para la tabla del Frontend
      return result;
    } catch (error) {
      throw new Error(`Error en el servicio de consultas: ${error.message}`);
    }
  },

  // ========================================
  // GET SALE BY ID (Búsqueda única)
  // ========================================
  getSaleService: async (id) => {
    try {
      if (!id) {
        throw new Error("El ID de la venta es requerido.");
      }

      // 🛡️ Casteo explícito a número para asegurar coincidencia con tipos enteros en DB (Prisma)
      return await getSaleById(Number(id));
    } catch (error) {
      throw new Error(`Error al obtener venta por ID: ${error.message}`);
    }
  },

  // ========================================
  // GET SALE BY NUMBER (Búsqueda por código de comprobante)
  // ========================================
  getSaleByNumberService: async (saleNumber) => {
    try {
      if (!saleNumber || String(saleNumber).trim() === "") {
        throw new Error("El número de venta/comprobante es requerido.");
      }

      return await getSaleByNumber(String(saleNumber).trim());
    } catch (error) {
      throw new Error(`Error al obtener venta por número: ${error.message}`);
    }
  },
};