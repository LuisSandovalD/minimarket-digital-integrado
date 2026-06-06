import axios from "axios";

import { getToken } from "../features/auth/services/session.service";

// ========================================
// AXIOS INSTANCE
// ========================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  withCredentials: true,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // TOKEN EXPIRED

    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
