// ========================================
// FEATURES / SALES / SERVICE / saleService.js
// ========================================

import axios from "../../../api/axios";

const BASE_URL = "/sale";

/**
 * Utilidad helper interna para forzar que cualquier respuesta de datos
 * que venga erróneamente indexada como objeto asociativo {"0": {...}}
 * sea devuelta como un array nativo y limpio para React.
 */
const normalizeResponseData = (rawData) => {
  if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
    return Object.values(rawData);
  }
  return Array.isArray(rawData) ? rawData : [];
};

// ========================================
// GET ALL SALES (Soporta meta + data para paginación)
// ========================================
export const getSales = async (params = {}) => {
  const res = await axios.get(`${BASE_URL}`, { params });

  const rawData = res.data?.data;
  const meta = res.data?.meta || {};

  return {
    meta,
    data: normalizeResponseData(rawData),
  };
};

// ========================================
// GET SALE BY ID
// ========================================
export const getSaleById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data?.data;
};

// ========================================
// CREATE SALE
// ========================================
export const createSale = async (data) => {
  const res = await axios.post(`${BASE_URL}`, data);
  return res.data?.data;
};

// ========================================
// UPDATE SALE (🔥 CON BLINDAJE ANTI-[object Object])
// ========================================
export const updateSale = async (idOrObject, data) => {
  const cleanId = idOrObject && typeof idOrObject === "object" ? idOrObject.id : idOrObject;

  if (!cleanId) {
    console.error("❌ Error en updateSale: No se proporcionó un ID válido.", idOrObject);
    throw new Error("ID de venta requerido para la actualización.");
  }

  const res = await axios.put(`${BASE_URL}/${cleanId}`, data);
  return res.data?.data;
};

// ========================================
// CANCEL SALE
// ========================================
export const cancelSale = async (id) => {
  const res = await axios.patch(`${BASE_URL}/${id}/cancel`);
  return res.data;
};

// ========================================
// RETURN SALE (NOTA DE CRÉDITO)
// ========================================
export const returnSale = async (id, items) => {
  const res = await axios.post(`${BASE_URL}/${id}/return`, { items });
  return res.data;
};

// ========================================
// GET SALE PAYMENTS (HISTORIAL DE CAJA)
// ========================================
export const getSalePayments = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}/payments`);
  return normalizeResponseData(res.data?.data);
};

// ========================================
// REGISTER SALE PAYMENT (🔥 ABONOS DE COBRO EN CAJA)
// ========================================
export const registerSalePayment = async (saleId, payload) => {
  // 🎯 REFACTORIZADO: Usamos BASE_URL para garantizar consistencia con los interceptores de Axios
  const response = await axios.post(`${BASE_URL}/${saleId}/payments`, payload);
  return response.data;
};

// ========================================
// GET DAILY REPORT (JSON ANALÍTICO)
// ========================================
export const getDailySalesReport = async (startDate, endDate, companyId) => {
  const res = await axios.get(`${BASE_URL}/reports/daily`, {
    params: {
      companyId,
      startDate,
      endDate,
    },
  });
  return normalizeResponseData(res.data?.data);
};

// ========================================
// GET TOP PRODUCTS (JSON ANALÍTICO)
// ========================================
export const getTopProducts = async () => {
  const res = await axios.get(`${BASE_URL}/reports/top-products`);
  return normalizeResponseData(res.data?.data);
};

// ========================================
// DOWNLOAD DAILY REPORT PDF (BLOB BINARIO)
// ========================================
export const downloadDailySalesPDF = async (params = {}) => {
  const res = await axios.get(`${BASE_URL}/reports/daily/pdf`, {
    params,
    responseType: "blob",
  });
  return res.data;
};

// ========================================
// DOWNLOAD DAILY REPORT EXCEL (BLOB BINARIO)
// ========================================
export const downloadDailySalesExcel = async (params = {}) => {
  const res = await axios.get(`${BASE_URL}/reports/daily/excel`, {
    params,
    responseType: "blob",
  });
  return res.data;
};

// ========================================
// DOWNLOAD TOP PRODUCTS PDF (BLOB BINARIO)
// ========================================
export const downloadTopProductsPDF = async () => {
  const res = await axios.get(`${BASE_URL}/reports/top-products/pdf`, {
    responseType: "blob",
  });
  return res.data;
};

// ========================================
// DOWNLOAD TOP PRODUCTS EXCEL (BLOB BINARIO)
// ========================================
export const downloadTopProductsExcel = async () => {
  const res = await axios.get(`${BASE_URL}/reports/top-products/excel`, {
    responseType: "blob",
  });
  return res.data;
};
