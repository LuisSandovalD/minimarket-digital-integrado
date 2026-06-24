// ========================================
// api/axios.js
// ========================================

import axios from "axios";

import {
  clearSession,
  getToken,
} from "../features/auth/services/session.service";

/* ======================================
 * AXIOS INSTANCE
 * ==================================== */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  withCredentials: true,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ======================================
 * REQUEST INTERCEPTOR
 * ==================================== */
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

/* ======================================
 * RESPONSE INTERCEPTOR
 * ==================================== */
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const { response, config } = error;

    if (response?.status === 401) {
      const ignoredRoutes = [
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
        "/auth/verify-reset-code",
        "/auth/reset-password",
      ];

      const shouldIgnore = ignoredRoutes.some((route) =>
        config?.url?.includes(route),
      );

      if (shouldIgnore) {
        return Promise.reject(error);
      }

      console.warn("⚠️ Sesión expirada o token inválido");

      clearSession();

      // Como tu login es modal y NO existe /login
      // enviamos a la página principal.
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
