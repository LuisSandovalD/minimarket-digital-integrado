// ========================================
// services/account.service.js
// ========================================
import api from "@/api/axios"; // Tu instancia de Axios configurada

/* ======================================
 * 👤 MI PERFIL
 * ==================================== */
export const getMyAccount = async () => {
  const response = await api.get("/auth/me");
  return response.data.data || response.data.user || response.data;
};

export const updateMyAccount = async (data) => {
  const response = await api.put("/auth/profile", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put("/auth/change-password", data);
  return response.data;
};

/* ======================================
 * 🔐 CONFIGURAR SEGUNDO FACTOR (2FA)
 * ==================================== */
export const setupTwoFactor = async () => {
  const response = await api.post("/auth/2fa/setup");
  return response.data; // { success: true, secret: '...', qrCode: 'data:image...' }
};

// 🚀 SOLUCIÓN: Ahora recibe el objeto completo { token, password } y lo envía en el body del POST
export const enableTwoFactor = async ({ token, password }) => {
  const response = await api.post("/auth/2fa/enable", { token, password });
  return response.data;
};

export const disableTwoFactor = async (password) => {
  const response = await api.post("/auth/2fa/disable", { password });
  return response.data;
};

/* ======================================
 * 💻 DISPOSITIVOS Y SESIONES ACTIVAS
 * ==================================== */
export const getSessions = async () => {
  const response = await api.get("/auth/sessions");
  return response.data.sessions || response.data.data || response.data;
};

export const closeSession = async (sessionId) => {
  // Envía el ID numérico limpio directo a la URL estandarizada del backend
  const response = await api.delete(`/auth/sessions/${sessionId}`);
  return response.data;
};

/* ======================================
 * 🛑 BAJA DE CUENTA
 * ==================================== */
export const deleteMyAccount = async (data) => {
  const response = await api.delete("/auth/profile", { data }); // Envía { password } seguro en el body
  return response.data;
};
