import api from "@/api/axios";

import { clearSession } from "./session.service";

// ======================================
// LOGIN
// ======================================

export const loginService = async (payload) => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};

// ======================================
// REGISTER
// ======================================

export const registerService = async (payload) => {
  const response = await api.post("/auth/register", payload);

  return response.data;
};

// ======================================
// LOGOUT
// ======================================

export const logoutService = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } finally {
    clearSession();
  }
};

// ======================================
// SESSION / ME
// ======================================

export const meService = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};
