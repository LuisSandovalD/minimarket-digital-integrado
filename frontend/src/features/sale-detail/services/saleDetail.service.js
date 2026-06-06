// ========================================
// features/sales-detail/services/saleDetail.service.js
// ========================================

import api from "../../../api/axios";

// ========================================
// GET ALL
// ========================================

export const getSaleDetailsService = async () => {
  const response = await api.get("/sale-detail");

  return response.data;
};

// ========================================
// GET ONE
// ========================================

export const getSaleDetailService = async (id) => {
  const response = await api.get(`/sale-detail/${id}`);

  return response.data;
};

// ========================================
// GET BY SALE
// ========================================

export const getSaleDetailsBySaleService = async (saleId) => {
  const response = await api.get(`/sale-detail/sale/${saleId}`);

  return response.data;
};

// ========================================
// GET BY PRODUCT
// ========================================

export const getSaleDetailsByProductService = async (productId) => {
  const response = await api.get(`/sale-detail/product/${productId}`);

  return response.data;
};
