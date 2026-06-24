// ========================================
// services/twofactor.service.js
// ========================================
import api from "@/api/axios";

export const verifyTwoFactorService = async (payload) => {
  // Envía el payload completo estructurado con las variables requeridas por el backend
  const response = await api.post("/auth/2fa/verify", payload);
  return response.data;
};
