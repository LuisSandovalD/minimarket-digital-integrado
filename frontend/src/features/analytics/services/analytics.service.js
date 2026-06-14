// ========================================
// FEATURES / ANALYTICS / SERVICES
// ========================================

import axios from "../../../api/axios";

// ========================================
// SALES TREND
// ========================================

export const getSalesTrend = async (params = {}) => {
  const res = await axios.get("/analytics/sales-trend", {
    params,
  });

  return res.data.data;
};

// ========================================
// PURCHASES TREND
// ========================================

export const getPurchasesTrend = async (params = {}) => {
  const res = await axios.get("/analytics/purchases-trend", {
    params,
  });

  return res.data.data;
};

// ========================================
// PROFIT TREND
// ========================================

export const getProfitTrend = async (params = {}) => {
  const res = await axios.get("/analytics/profit-trend", {
    params,
  });

  return res.data.data;
};

// ========================================
// SALES VS PURCHASES
// ========================================

export const getSalesVsPurchases = async (params = {}) => {
  const res = await axios.get("/analytics/sales-vs-purchases", {
    params,
  });

  return res.data.data;
};

// ========================================
// CATEGORY PERFORMANCE
// ========================================

export const getCategoryPerformance = async (params = {}) => {
  const res = await axios.get("/analytics/category-performance", {
    params,
  });

  return res.data.data;
};

// ========================================
// TOP PRODUCTS
// ========================================

export const getTopProducts = async (params = {}) => {
  const res = await axios.get("/analytics/top-products", {
    params,
  });

  return res.data.data;
};

// ========================================
// TOP CUSTOMERS
// ========================================

export const getTopCustomers = async (params = {}) => {
  const res = await axios.get("/analytics/top-customers", {
    params,
  });

  return res.data.data;
};

// ========================================
// TOP SUPPLIERS
// ========================================

export const getTopSuppliers = async (params = {}) => {
  const res = await axios.get("/analytics/top-suppliers", {
    params,
  });

  return res.data.data;
};

// ========================================
// PEAK HOURS
// ========================================

export const getPeakHours = async (params = {}) => {
  const res = await axios.get("/analytics/peak-hours", {
    params,
  });

  return res.data.data;
};

// ========================================
// PEAK DAYS
// ========================================

export const getPeakDays = async (params = {}) => {
  const res = await axios.get("/analytics/peak-days", {
    params,
  });

  return res.data.data;
};

// ========================================
// AVERAGE TICKET
// ========================================

export const getAverageTicket = async (params = {}) => {
  const res = await axios.get("/analytics/average-ticket", {
    params,
  });

  return res.data.data;
};
