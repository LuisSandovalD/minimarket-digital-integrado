// ============================================================================
// services/account.service.js
// ============================================================================
import api from "@/api/axios";

/* ======================================
 * 👤 MI PERFIL
 * ==================================== */
export const getMyAccount = async () => {
  const response = await api.get("/auth/me");
  return response.data.data || response.data.user || response.data;
};

export const updateMyAccount = async (data) => {
  // ADAPTACIÓN CONTRA EL ERROR DE AVATAR:
  // Si viene un archivo (instancia de File), mutamos el payload a FormData automáticamente
  let payload = data;
  let headers = {};

  if (data && (data.avatar instanceof File || data instanceof FormData)) {
    if (!(data instanceof FormData)) {
      payload = new FormData();
      Object.keys(data).forEach((key) => {
        // Si el avatar es un archivo, lo adjunta directo; si no hay archivo nuevo, evita mandar un objeto vacío
        if (key === "avatar") {
          if (data.avatar instanceof File) payload.append("avatar", data.avatar);
        } else if (data[key] !== undefined && data[key] !== null) {
          payload.append(key, data[key]);
        }
      });
    }
    headers = { "Content-Type": "multipart/form-data" };
  }

  const response = await api.put("/auth/profile", payload, { headers });
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
  return response.data;
};

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
  const response = await api.delete(`/auth/sessions/${sessionId}`);
  return response.data;
};

/* ======================================
 * 🛑 BAJA DE CUENTA
 * ====================================== */
export const deleteMyAccount = async (data) => {
  const response = await api.delete("/auth/profile", { data });
  return response.data;
};
