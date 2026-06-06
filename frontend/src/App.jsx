import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";

import { routes } from "./routes/routes";

import { meService } from "./features/auth/services/auth.service";
import { loginSuccess, logoutAction } from "./features/auth/store/authActions";

import {
  clearSession,
  getToken,
} from "./features/auth/services/session.service";

export default function App() {
  const dispatch = useDispatch();

  const loadSessionFromBackend = useCallback(async () => {
    try {
      const response = await meService();

      if (response?.user) {
        dispatch(loginSuccess(response.user));
      } else {
        clearSession();
        dispatch(logoutAction());
      }
    } catch (error) {
      clearSession();
      dispatch(logoutAction());
    }
  }, [dispatch]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      clearSession();
      dispatch(logoutAction());
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
