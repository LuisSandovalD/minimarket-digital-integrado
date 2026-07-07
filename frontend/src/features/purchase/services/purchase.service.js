// ========================================
// features/purchase/services/purchase.service.js
// ========================================

import api from "@/api/axios";

// ========================================
// GET ALL PURCHASES
// ========================================

export async function getPurchasesService(params = {}) {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "",
    supplierId = "",
    buyerId = "",
    branchId = "",
    startDate = "",
    endDate = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  const response = await api.get("/purchase", {
    params: {
      page,
      limit,

      ...(search && { search }),
      ...(status && { status }),
      ...(supplierId && { supplierId }),
      ...(buyerId && { buyerId }),
      ...(branchId && { branchId }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),

      sortBy,
      sortOrder,
    },
  });

  return response.data;
}

// ========================================
// CREATE PURCHASE
// ========================================

export async function createPurchaseService(data) {
  const response = await api.post("/purchase", data);

  return response.data;
}

// ========================================
// UPDATE PURCHASE
// ========================================

export async function updatePurchaseService(id, data) {
  const response = await api.put(`/purchase/${id}`, data);

  return response.data;
}

// ========================================
// DELETE PURCHASE
// ========================================

export async function deletePurchaseService(id) {
  const response = await api.delete(`/purchase/${id}`);

  return response.data;
}
