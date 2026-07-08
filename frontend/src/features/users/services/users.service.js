// ========================================
// features/users/services/user.service.js
// ========================================

import api from "../../../api/axios";

export const getUsers = async (params = {}) => {
  const { data } = await api.get("/user", { params });
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

export const getHierarchy = async () => {
  const { data } = await api.get("/user/hierarchy");
  return data;
};

export const createUser = async (userData) => {
  const { data } = await api.post("/user", userData);
  return data;
};

export const updateUser = async (id, userData) => {
  const { data } = await api.put(`/user/${id}`, userData);
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
