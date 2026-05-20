// ========================================
// FEATURES / SALES / SERVICE
// ========================================

import axios from "../../../api/axios";

// ========================================
// GET ALL SALES
// ========================================

export const getSales = async (params = {}) => {
  const res = await axios.get("/sale", {
    params,
  });

  return res.data.data;
};

// ========================================
// GET SALE BY ID
// ========================================

export const getSaleById = async (id) => {
  const res = await axios.get(`/sale/${id}`);

  return res.data.data;
};

// ========================================
// CREATE SALE
// ========================================

export const createSale = async (data) => {
  const res = await axios.post("/sale", data);

  return res.data.data;
};

// ========================================
// CANCEL SALE
// ========================================

export const cancelSale = async (id) => {
  const res = await axios.put(`/sales/${id}/cancel`);

  return res.data;
};

// ========================================
// RETURN SALE
// ========================================

export const returnSale = async (id, items) => {
  const res = await axios.post(`/sale/${id}/return`, { items });

  return res.data;
};

// ========================================
// GET SALE PAYMENTS
// ========================================

export const getSalePayments = async (id) => {
  const res = await axios.get(`/sale/${id}/payments`);

  return res.data.data;
};

// ========================================
// GET DAILY REPORT
// ========================================

export const getDailySalesReport = async (startDate, endDate) => {
  const res = await axios.get("/sale/reports/daily", {
    params: {
      startDate,
      endDate,
    },
  });

  return res.data.data;
};

// ========================================
// GET TOP PRODUCTS
// ========================================

export const getTopProducts = async () => {
  const res = await axios.get("/sale/reports/top-products");

  return res.data.data;
};
