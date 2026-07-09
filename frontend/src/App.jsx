// ========================================
// App.jsx
// ========================================

import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";

// Aquí importamos el index.jsx centralizado que une lo público y lo privado
import { routes } from "./routes/index";

import { meService } from "./features/auth/services/auth.service";
import {
  clearSession,
  getToken,
} from "./features/auth/services/session.service";
import {
  loginSuccess,
  logout,
  setLoading,
} from "./features/auth/store/authSlice";

export default function App() {
  const dispatch = useDispatch();

  const loadSessionFromBackend = useCallback(async () => {
    try {
      const response = await meService();

      if (response?.success && response?.id) {
        dispatch(loginSuccess(response));
      } else {
        console.warn("⚠️ Sesión inválida");
        clearSession();
        dispatch(logout());
      }
    } catch (error) {
      console.error(
        "❌ Error verificando sesión:",
        error?.response?.data || error.message,
      );
      clearSession();
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      dispatch(logout());
      dispatch(setLoading(false));
      return;
    }

    loadSessionFromBackend();
  }, [dispatch, loadSessionFromBackend]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return useRoutes(routes);
}
