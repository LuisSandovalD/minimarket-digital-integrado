// ========================================
// features/product/services/product.service.js
// ========================================

import api from "../../../api/axios";

const ENDPOINT = "/product";

// ========================================
// SERVICIOS HTTP
// ========================================

// Soporta ?page=1&limit=10&search=... a través de los params de Axios
const getProducts = async (filters = {}) => {
  const { data } = await api.get(ENDPOINT, {
    params: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      search: filters.search || undefined, // undefined evita enviar cadenas vacías en la URL
      categoryId: filters.categoryId || undefined,
      status: filters.status || undefined,
      sortBy: filters.sortBy || "createdAt",
      sortOrder: filters.sortOrder || "desc",
    },
  });
  return data;
};

const getProductById = async (id) => {
  const { data } = await api.get(`${ENDPOINT}/${id}`);
  return data;
};

const createProduct = async (payload) => {
  const { data } = await api.post(ENDPOINT, payload);
  return data;
};

const updateProduct = async (id, payload) => {
  const { data } = await api.put(`${ENDPOINT}/${id}`, payload);
  return data;
};

const deleteProduct = async (id) => {
  const { data } = await api.delete(`${ENDPOINT}/${id}`);
  return data;
};

const restoreProduct = async (id) => {
  const { data } = await api.patch(`${ENDPOINT}/${id}/restore`);
  return data;
};

// Se añade soporte opcional de query params para limitar o paginar reportes especiales
const getFeaturedProducts = async (query = {}) => {
  const { data } = await api.get(`${ENDPOINT}/featured`, { params: query });
  return data;
};

const getLowStockProducts = async (query = {}) => {
  const { data } = await api.get(`${ENDPOINT}/low-stock`, { params: query });
  return data;
};

const getExpiringProducts = async (query = {}) => {
  const { data } = await api.get(`${ENDPOINT}/expiring`, { params: query });
  return data;
};

// ========================================
// EXPORTS
// ========================================

const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getFeaturedProducts,
  getLowStockProducts,
  getExpiringProducts,
};

export default productService;
