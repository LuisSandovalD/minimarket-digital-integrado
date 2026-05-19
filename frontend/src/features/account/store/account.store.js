import { create } from "zustand";

import {
  getMyAccount,
  updateMyAccount,
  changePassword,
  deleteMyAccount,
  getSessions,
  closeSession as closeSessionService,
  toggleTwoFactor,
} from "../services/account.service";

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
   * ACCOUNT
   * ========================= */

  fetchAccount: async () => {
    set({ loading: true, error: null });

    try {
      const user = await getMyAccount();

      set({ user, loading: false });
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message ||
          "Error obteniendo cuenta",
      });
    }
  },

  updateProfile: async (data) => {
    set({ saving: true, error: null });

    try {
      const response = await updateMyAccount(data);

      set({
        user: response.user,
        saving: false,
      });

      return response;
    } catch (error) {
      set({
        saving: false,
        error:
          error?.response?.data?.message ||
          "Error actualizando perfil",
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
        error:
          error?.response?.data?.message ||
          "Error actualizando contraseña",
      });

      throw error;
    }
  },

  /* =========================
   * SESSIONS
   * ========================= */

  fetchSessions: async () => {
    set({ sessionsLoading: true, error: null });

    try {
      const sessions = await getSessions();

      set({
        sessions,
        sessionsLoading: false,
      });
    } catch (error) {
      set({
        sessionsLoading: false,
        error:
          error?.response?.data?.message ||
          "Error obteniendo sesiones",
      });
    }
  },

  closeSession: async (sessionId) => {
    try {
      await closeSessionService(sessionId);

      set({
        sessions: get().sessions.filter(
          (s) => s.id !== sessionId
        ),
      });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Error cerrando sesión",
      });
    }
  },

  /* =========================
   * 🔐 2FA FIXED
   * ========================= */

  toggleTwoFactor: async (enable) => {
    set({ twoFactorLoading: true, error: null });

    try {
      // 🔥 AQUÍ SE ENVÍA EL BODY CORRECTAMENTE
      const response = await toggleTwoFactor({
        enabled: enable,
      });

      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              twoFactorEnabled:
                response.twoFactorEnabled ?? enable,
            }
          : state.user,

        twoFactorLoading: false,
      }));

      return response;
    } catch (error) {
      set({
        twoFactorLoading: false,
        error:
          error?.response?.data?.message ||
          "Error actualizando 2FA",
      });

      throw error;
    }
  },

  /* =========================
   * DELETE ACCOUNT
   * ========================= */

  removeAccount: async () => {
    set({ deleteLoading: true, error: null });

    try {
      const response = await deleteMyAccount();

      set({
        user: null,
        deleteLoading: false,
      });

      return response;
    } catch (error) {
      set({
        deleteLoading: false,
        error:
          error?.response?.data?.message ||
          "Error eliminando cuenta",
      });

      throw error;
    }
  },

  /* =========================
   * CLEAR
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