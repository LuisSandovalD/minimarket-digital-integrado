// ========================================
// FEATURES / PAYMENTS / SERVICES
// PAYMENT SERVICE
// ========================================

import api from "../../../api/axios";

// ========================================
// GET ALL PAYMENTS
// ========================================
export const getPaymentsService = async (params = {}) => {
  // Axios mapea automáticamente el objeto params a un query string (?page=1&limit=10...)
  const response = await api.get("/payments", { params });
  return response.data;
};

// ========================================
// GET PAYMENT BY ID
// ========================================
export const getPaymentService = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

// ========================================
// GET PAYMENTS BY SALE
// ========================================
export const getPaymentsBySaleService = async (saleId) => {
  const response = await api.get(`/payments/sale/${saleId}`);
  return response.data;
};

// ========================================
// GET PAYMENTS BY PURCHASE
// ========================================
export const getPaymentsByPurchaseService = async (purchaseId) => {
  const response = await api.get(`/payments/purchase/${purchaseId}`);
  return response.data;
};

// ========================================
// CREATE PAYMENT
// ========================================
export const createPaymentService = async (data) => {
  const response = await api.post("/payments", data);
  return response.data;
};

// ========================================
// UPDATE PAYMENT
// ========================================
export const updatePaymentService = async (id, data) => {
  const response = await api.put(`/payments/${id}`, data);
  return response.data;
};

// ========================================
// CANCEL PAYMENT
// ========================================
export const cancelPaymentService = async (id) => {
  const response = await api.patch(`/payments/${id}/cancel`);
  return response.data;
};
