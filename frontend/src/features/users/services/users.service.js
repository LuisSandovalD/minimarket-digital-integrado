// ========================================
// features/users/services/user.service.js
// ========================================

import api from "../../../api/axios";

/**
 * Obtiene la lista de usuarios paginada y filtrada.
 * @param {Object} filters - Filtros como { page, limit, search, branchId, isActive }
 */
export const getUsers = async (filters = {}) => {
  // Pasamos los filtros dentro de la configuración de Axios usando 'params'
  const { data } = await api.get("/user", { params: filters });
  return data;
};

export const getHierarchy = async () => {
  const { data } = await api.get("/user/hierarchy");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

export const createUser = async (payload) => {
  const { data } = await api.post("/user", payload);
  return data;
};

export const updateUser = async (id, payload) => {
  const { data } = await api.put(`/user/${id}`, payload);
  return data;
};

export const toggleUserStatus = async (id) => {
  const { data } = await api.patch(`/user/${id}/status`);
  return data;
};

export const restoreUser = async (id) => {
  const { data } = await api.patch(`/user/${id}/restore`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/user/${id}`);
  return data;
};
