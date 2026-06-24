// ========================================
// services/auth.service.js
// ========================================

import api from "@/api/axios";
import { clearSession } from "./session.service";

/* ======================================
 * LOGIN
 * ==================================== */
export const loginService = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

/* ======================================
 * REGISTER
 * ==================================== */
export const registerService = async (payload) => {
  const response = await api.post("/auth/register", payload, {
    withCredentials: true,
  });

  return response.data;
};

/* ======================================
 * LOGOUT
 * ==================================== */
export const logoutService = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } finally {
    clearSession();
  }
};

/* ======================================
 * CURRENT USER
 * ==================================== */
export const meService = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

/* ======================================
 * PASSWORD RECOVERY
 * ==================================== */
export const sendRecoveryEmailService = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });

  return response.data;
};

export const verifyRecoveryCodeService = async (code) => {
  const response = await api.post("/auth/verify-reset-code", { code });

  return response.data;
};

export const resetPasswordService = async (code, newPassword) => {
  const response = await api.post("/auth/reset-password", {
    code,
    newPassword,
  });

  return response.data;
};

export default {
  loginService,
  registerService,
  logoutService,
  meService,
  sendRecoveryEmailService,
  verifyRecoveryCodeService,
  resetPasswordService,
};
