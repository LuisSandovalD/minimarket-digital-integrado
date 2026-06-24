// ========================================
// services/sale-detail.service.js
// ========================================

const repository = require("../repositories/saleDetail.repository"); // 🚀 Sincronizado con el nombre de archivo estandarizado

module.exports = {

    // ========================================
    // GET ALL (Soporta Paginación, Query Filters y Seguridad de Rol)
    // ========================================
    getSaleDetails: async (filters = {}) => {
        try {
            // Pasamos el objeto de filtros (page, limit, search, itemType, companyId, userId) al repositorio
            return await repository.findAll(filters);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener todos los detalles paginados: ${error.message}`);
        }
    },

    // ========================================
    // GET ONE
    // ========================================
    getSaleDetail: async (id) => {
        try {
            if (!id) {
                throw new Error("El ID del detalle de venta es requerido.");
            }
            return await repository.findById(Number(id));
        } catch (error) {
            throw new Error(`Error en el servicio al obtener el detalle por ID: ${error.message}`);
        }
    },

    // ========================================
    // GET BY SALE
    // ========================================
    getSaleDetailsBySale: async (saleId, sellerIdRestriction) => {
        try {
            if (!saleId) {
                throw new Error("El ID de la venta es requerido para filtrar los detalles.");
            }
            return await repository.findBySaleId(Number(saleId), sellerIdRestriction);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener detalles por venta: ${error.message}`);
        }
    },

    // ========================================
    // GET BY PRODUCT
    // ========================================
    getSaleDetailsByProduct: async (productId, sellerIdRestriction) => {
        try {
            if (!productId) {
                throw new Error("El ID del producto es requerido para filtrar los detalles.");
            }
            return await repository.findByProductId(Number(productId), sellerIdRestriction);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener detalles por producto: ${error.message}`);
        }
    },
};