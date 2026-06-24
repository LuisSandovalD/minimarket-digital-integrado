// ========================================
// features/sales-detail/services/saleDetail.service.js
// ========================================

import api from "../../../api/axios";

// ========================================
// GET ALL (Soporta Paginación y Query Filters)
// ========================================
export const getSaleDetailsService = async (filters = {}) => {
  // 🚀 CORRECCIÓN: Cambiado de "/sale-details" a "/sale-detail" (Singular)
  const response = await api.get("/sale-detail", {
    params: filters,
  });

  // Retorna directamente { success, info, results }
  return response.data;
};

// ========================================
// GET ONE
// ========================================
export const getSaleDetailService = async (id) => {
  if (!id) {
    throw new Error("El ID del detalle es requerido en el cliente.");
  }

  // 🚀 CORRECCIÓN: Ruta en singular compatible con tu API
  const response = await api.get(`/sale-detail/${id}`);

  return response.data;
};

// ========================================
// GET BY SALE
// ========================================
export const getSaleDetailsBySaleService = async (saleId) => {
  if (!saleId) {
    throw new Error("El ID de la venta es requerido en el cliente.");
  }

  const response = await api.get(`/sale-detail/sale/${saleId}`);

  return response.data;
};

// ========================================
// GET BY PRODUCT
// ========================================
export const getSaleDetailsByProductService = async (productId) => {
  if (!productId) {
    throw new Error("El ID del producto es requerido en el cliente.");
  }

  const response = await api.get(`/sale-detail/product/${productId}`);

  return response.data;
};
