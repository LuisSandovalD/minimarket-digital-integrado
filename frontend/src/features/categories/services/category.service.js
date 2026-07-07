// ========================================
// CATEGORY SERVICE
// ========================================

import api from "@/api/axios";

const BASE_URL = "/category";

// ========================================
// GET ALL
// ========================================

export const getCategories = async (params = {}) => {
  const response = await api.get(BASE_URL, { params });
  return response.data;
};

// ========================================
// GET BY ID
// ========================================

export const getCategoryById = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`);

  return response.data;
};

// ========================================
// CREATE
// ========================================

export const createCategory = async (data) => {
  const response = await api.post(BASE_URL, data);

  return response.data;
};

// ========================================
// UPDATE
// ========================================

export const updateCategory = async (id, data) => {
  const response = await api.put(`${BASE_URL}/${id}`, data);

  return response.data;
};

// ========================================
// DELETE
// ========================================

export const deleteCategory = async (id) => {
  const response = await api.delete(`${BASE_URL}/${id}`);

  return response.data;
};
