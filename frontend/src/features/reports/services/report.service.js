// ========================================
// features/analytics/services/report.service.js
// ========================================

import api from "@/api/axios";

// ========================================
// Compras diarias (Reporte PDF)
// ========================================
export const getDailyPurchasesReport = async (
  companyId,
  startDate,
  endDate,
) => {
  const response = await api.get("/purchase/reports/daily/pdf", {
    params: {
      companyId,
      startDate,
      endDate,
    },
    responseType: "blob", // CRUCIAL para PDFs
  });

  return response.data;
};

// ========================================
// Inventario (Reporte PDF)
// ========================================
export const getInventoryReport = async (companyId, startDate, endDate) => {
  const response = await api.get("/inventory/reports/inventory/pdf", {
    params: {
      companyId,
      startDate,
      endDate,
    },
    responseType: "blob", // CRUCIAL para PDFs
  });

  return response.data;
};

// ========================================
// Clientes (Reporte PDF)
// ========================================
export const getCustomersReport = async (companyId, startDate, endDate) => {
  const response = await api.get("/customer/reports/customers/pdf", {
    params: {
      companyId,
      startDate,
      endDate,
    },
    responseType: "blob", // CRUCIAL para PDFs
  });

  return response.data;
};

// ========================================
// Proveedores (Reporte PDF)
// ========================================
export const getSuppliersReport = async (companyId, startDate, endDate) => {
  const response = await api.get("/supplier/reports/suppliers/pdf", {
    params: {
      companyId,
      startDate,
      endDate,
    },
    responseType: "blob", // CRUCIAL para PDFs
  });

  return response.data;
};

// ========================================
// Pagos (Reporte PDF)
// ========================================
export const getPaymentsReport = async (companyId, startDate, endDate) => {
  const response = await api.get("/payments/reports/payments/pdf", {
    params: {
      companyId,
      startDate,
      endDate,
    },
    responseType: "blob", // CRUCIAL para PDFs
  });

  return response.data;
};

// ========================================
// Actividad / Ventas (Reporte PDF)
// ========================================
export const getActivityReport = async (companyId, startDate, endDate) => {
  const response = await api.get("/dashboard/reports/activity/pdf", {
    params: {
      companyId,
      startDate,
      endDate,
    },
    responseType: "blob", // CRUCIAL para PDFs
  });

  return response.data;
};

// ========================================
// Top Productos (Reporte PDF)
// ========================================
export const getTopProductsReport = async (companyId) => {
  // 💡 CAMBIADO: Cambiamos '/sales/' por '/sale/' para que coincida con tu backend
  const response = await api.get("/sale/reports/top-products/pdf", {
    params: {
      companyId,
    },
    responseType: "blob",
  });

  return response.data;
};
