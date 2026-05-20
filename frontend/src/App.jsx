import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PublicLayout from "./layout/public/PublicLayout";
import AppLayout from "./layout/app-layout/AppLayout";
import RequireAuth from "./features/auth/guards/RequireAuth";

import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

import { meService } from "./features/auth/services/auth.service";
import {
  loginSuccess,
  logoutAction,
  setAuthLoading,
} from "./features/auth/store/authActions";

import { getUser, getToken } from "./features/auth/services/session.service";

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    async function loadSession() {
      dispatch(setAuthLoading(true));

      try {
        const storedUser = getUser();
        const storedToken = getToken();

        if (storedUser && storedToken) {
          dispatch(loginSuccess(storedUser));
          return;
        }

        const response = await meService();

        if (response?.user) {
          dispatch(loginSuccess(response.user));
        } else {
          dispatch(logoutAction());
        }
      } catch {
        dispatch(logoutAction());
      } finally {
        dispatch(setAuthLoading(false));
      }
    }

    loadSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-gray-500">Cargando sesión...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

// 🔥 AQUÍ está la clave (useRoutes)
function AppRoutes() {
  return useRoutes(routes);
}
