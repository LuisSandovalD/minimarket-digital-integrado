import api from "../../../api/axios";

export default {
  getAll: () => api.get("/employee"),

  create: (data) => api.post("/employee", data),

  update: (id, data) => api.put(`/employee/${id}`, data),

  remove: (id) => api.delete(`/employee/${id}`),
};
