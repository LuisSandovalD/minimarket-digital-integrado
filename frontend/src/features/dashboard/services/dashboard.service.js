// ========================================
// FEATURES / DASHBOARD / SERVICES
// ========================================

import axios from "../../../api/axios";

// ========================================
// GET COMPLETE DASHBOARD
// ========================================

export const getDashboard = async (params = {}) => {
  const res = await axios.get("/dashboard", {
    params,
  });

  return res.data.data;
};

// ========================================
// GET DASHBOARD SUMMARY
// ========================================

export const getDashboardSummary = async () => {
  const res = await axios.get("/dashboard/summary");

  return res.data.data;
};

// ========================================
// GET DASHBOARD KPIS
// ========================================

export const getDashboardKPIs = async () => {
  const res = await axios.get("/dashboard/kpis");

  return res.data.data;
};
