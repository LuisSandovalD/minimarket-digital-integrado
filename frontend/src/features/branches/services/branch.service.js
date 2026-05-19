// ========================================
// services/branch.service.js
// ========================================

import api from "../../../api/axios";

export async function getBranches() {

  const response =
    await api.get("/branch");

  return response.data.data;

}

export async function getBranchById(id) {

  const response =
    await api.get(`/branch/${id}`);

  return response.data.data;

}

export async function createBranch(data) {

  const response =
    await api.post(
      "/branch",
      data
    );

  return response.data.data;

}

export async function updateBranch(
  id,
  data
) {

  const response =
    await api.put(
      `/branch/${id}`,
      data
    );

  return response.data.data;

}