// ========================================
// features/customers/services/customer.service.js
// ========================================

import api from "../../../api/axios";

// ========================================
// CUSTOMER SERVICE
// ========================================

const customerService = {
  // ========================================
  // GET ALL
  // ========================================

  getAll: () => {
    return api.get("/customer");
  },

  // ========================================
  // GET ONE
  // ========================================

  getById: (id) => {
    return api.get(`/customer/${id}`);
  },

  // ========================================
  // CREATE
  // ========================================

  create: (data) => {
    return api.post("/customer", data);
  },

  // ========================================
  // UPDATE
  // ========================================

  update: (id, data) => {
    return api.put(`/customer/${id}`, data);
  },

  // ========================================
  // DELETE
  // ========================================

  remove: (id) => {
    return api.delete(`/customer/${id}`);
  },
};

export default customerService;
