// ========================================
// stores/accountStore.js (Zustand)
// ========================================
import { create } from "zustand";

import {
  changePassword,
  closeSession as closeSessionService,
  deleteMyAccount,
  disableTwoFactor as disable2FAService,
  enableTwoFactor as enable2FAService,
  getMyAccount,
  getSessions,
  setupTwoFactor as setup2FAService,
  updateMyAccount,
} from "../services/account.service";

import { mapAccount, mapUserSession } from "../utils/account.mapper";

const useAccountStore = create((set, get) => ({
  /* =========================
   * STATE
   * ========================= */
  user: null,
  sessions: [],
  loading: false,
  saving: false,
  passwordLoading: false,
  sessionsLoading: false,
  twoFactorLoading: false,
  deleteLoading: false,
  error: null,

  /* =========================
   * ACCOUNT ACTIONS
   * ========================= */

  fetchAccount: async () => {
    set({ loading: true, error: null });
    try {
      const rawUser = await getMyAccount();
      // Aplana y estandariza la estructura del usuario (roles, compañía, sucursales)
      set({ user: mapAccount(rawUser), loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Error obteniendo cuenta",
      });
    }
  },

  updateProfile: async (data) => {
    set({ saving: true, error: null });
    try {
      const response = await updateMyAccount(data);
      const rawUser = response.user || response.data?.user || response.data;

      set({
        user: mapAccount(rawUser),
        saving: false,
      });
      return response;
    } catch (error) {
      set({
        saving: false,
        error: error?.response?.data?.message || "Error actualizando perfil",
      });
      throw error;
    }
  },

  updatePassword: async (data) => {
    set({ passwordLoading: true, error: null });
    try {
      const response = await changePassword(data);
      set({ passwordLoading: false });
      return response;
    } catch (error) {
      set({
        passwordLoading: false,
        error: error?.response?.data?.message || "Error actualizando contraseña",
      });
      throw error;
    }
  },

  /* =========================
   * SESSIONS ACTIONS
   * ========================= */

  fetchSessions: async () => {
    set({ sessionsLoading: true, error: null });
    try {
      const rawSessions = await getSessions();

      // Procesa cada sesión transformando el User-Agent crudo en texto amigable para la UI
      const normalizedSessions = Array.isArray(rawSessions) ? rawSessions.map(mapUserSession) : [];

      set({
        sessions: normalizedSessions,
        sessionsLoading: false,
      });
    } catch (error) {
      set({
        sessionsLoading: false,
        error: error?.response?.data?.message || "Error obteniendo sesiones",
      });
    }
  },

  closeSession: async (sessionId) => {
    try {
      await closeSessionService(sessionId);

      // Remoción reactiva optimista filtrando el ID entero de la sesión revocada
      set({
        sessions: get().sessions.filter((s) => s.id !== sessionId && s.sessionId !== sessionId),
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error cerrando sesión",
      });
      throw error;
    }
  },

  /* =========================
   * 🔐 TWO FACTOR AUTH (2FA)
   * ========================= */

  setupTwoFactor: async () => {
    set({ twoFactorLoading: true, error: null });
    try {
      const response = await setup2FAService();
      set({ twoFactorLoading: false });
      return response; // Entrega { success, secret, qrCode } al componente visual
    } catch (error) {
      set({
        twoFactorLoading: false,
        error: error?.response?.data?.message || "Error al iniciar configuración 2FA",
      });
      throw error;
    }
  },

  enableTwoFactor: async (token) => {
    set({ twoFactorLoading: true, error: null });
    try {
      const response = await enable2FAService(token);

      // Activa de inmediato el flag reactivo en la sesión del usuario actual
      set((state) => ({
        user: state.user ? { ...state.user, twoFactorEnabled: true } : null,
        twoFactorLoading: false,
      }));

      return response;
    } catch (error) {
      set({
        twoFactorLoading: false,
        error: error?.response?.data?.message || "Error al activar 2FA",
      });
      throw error;
    }
  },

  disableTwoFactor: async (password) => {
    set({ twoFactorLoading: true, error: null });
    try {
      const response = await disable2FAService(password);

      set((state) => ({
        user: state.user ? { ...state.user, twoFactorEnabled: false } : null,
        twoFactorLoading: false,
      }));

      return response;
    } catch (error) {
      set({
        twoFactorLoading: false,
        error: error?.response?.data?.message || "Error al desactivar 2FA",
      });
      throw error;
    }
  },

  /* =========================
   * DELETE ACCOUNT
   * ========================= */

  removeAccount: async (password) => {
    set({ deleteLoading: true, error: null });
    try {
      const response = await deleteMyAccount(password);

      // Destrucción total de los estados de sesión local al darse de baja
      set({
        user: null,
        sessions: [],
        deleteLoading: false,
      });

      return response;
    } catch (error) {
      set({
        deleteLoading: false,
        error: error?.response?.data?.message || "Error eliminando cuenta",
      });
      throw error;
    }
  },

  /* =========================
   * CLEAR STORE
   * ========================= */

  clearAccount: () => {
    set({
      user: null,
      sessions: [],
      error: null,
    });
  },
}));

export default useAccountStore;
