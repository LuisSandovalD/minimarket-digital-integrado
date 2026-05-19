// ========================================
// features/purchase/services/purchase.service.js
// ========================================

import api from "@/api/axios";

// ========================================
// GET ALL PURCHASES
// ========================================

export async function getPurchasesService() {

  const response =
    await api.get("/purchase");

  return response.data;

}

// ========================================
// CREATE PURCHASE
// ========================================

export async function createPurchaseService(data) {

  const response =
    await api.post(
      "/purchase",
      data
    );

  return response.data;

}

// ========================================
// UPDATE PURCHASE
// ========================================

export async function updatePurchaseService(
  id,
  data
) {

  const response =
    await api.put(
      `/purchase/${id}`,
      data
    );

  return response.data;

}

// ========================================
// DELETE PURCHASE
// ========================================

export async function deletePurchaseService(id) {

  const response =
    await api.delete(
      `/purchase/${id}`
    );

  return response.data;

}