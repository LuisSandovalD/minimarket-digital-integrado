// ========================================
// features/inventory/services/inventory.service.js
// ========================================

import api from "../../../api/axios";

// ========================================
// GET INVENTORIES
// ========================================

export const getInventoriesService = async () => {
  const response = await api.get("/inventory");

  return response.data;
};

// ========================================
// GET INVENTORY BY ID
// ========================================

export const getInventoryByIdService = async (id) => {
  const response = await api.get(`/inventory/${id}`);

  return response.data;
};

// ========================================
// GET LOW STOCK
// ========================================

export const getLowStockService = async () => {
  const response = await api.get("/inventory/low-stock");

  return response.data;
};

// ========================================
// GET DAMAGED STOCK
// ========================================

export const getDamagedStockService = async () => {
  const response = await api.get("/inventory/damaged");

  return response.data;
};

// ========================================
// GET MOVEMENTS
// ========================================

export const getMovementsService = async () => {
  const response = await api.get("/inventory/movements/all");

  return response.data;
};

// ========================================
// GET PRODUCT MOVEMENTS
// ========================================

export const getProductMovementsService = async (productId) => {
  const response = await api.get(`/inventory/movements/product/${productId}`);

  return response.data;
};

// ========================================
// GET BRANCH MOVEMENTS
// ========================================

export const getBranchMovementsService = async (branchId) => {
  const response = await api.get(`/inventory/movements/branch/${branchId}`);

  return response.data;
};

// ========================================
// ADD STOCK
// ========================================

export const addStockService = async (inventoryId, body) => {
  const response = await api.patch(`/inventory/${inventoryId}/add-stock`, body);

  return response.data;
};

// ========================================
// REMOVE STOCK
// ========================================

export const removeStockService = async (inventoryId, body) => {
  const response = await api.patch(
    `/inventory/${inventoryId}/remove-stock`,
    body,
  );

  return response.data;
};

// ========================================
// RESERVE STOCK
// ========================================

export const reserveStockService = async (inventoryId, body) => {
  const response = await api.patch(`/inventory/${inventoryId}/reserve`, body);

  return response.data;
};

// ========================================
// RELEASE RESERVED STOCK
// ========================================

export const releaseReservedStockService = async (inventoryId, body) => {
  const response = await api.patch(`/inventory/${inventoryId}/release`, body);

  return response.data;
};

// ========================================
// ADD DAMAGED STOCK
// ========================================

export const damagedStockService = async (inventoryId, body) => {
  const response = await api.patch(`/inventory/${inventoryId}/damaged`, body);

  return response.data;
};

// ========================================
// TRANSFER STOCK
// ========================================

export const transferStockService = async (body) => {
  const response = await api.post("/inventory/transfer", body);

  return response.data;
};
