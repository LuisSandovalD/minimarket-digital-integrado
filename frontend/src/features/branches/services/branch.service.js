import api from "../../../api/axios";

export async function getBranches(params = {}) {
  const response = await api.get("/branch", { params });
  return response.data;
}

export async function getBranchById(id) {
  const response = await api.get(`/branch/${id}`);
  return response.data.data;
}

export async function createBranch(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  const response = await api.post("/branch", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
}

export async function updateBranch(id, data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  const response = await api.put(`/branch/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
}

export async function deleteBranch(id) {
  const response = await api.delete(`/branch/${id}`);
  return response.data;
}
