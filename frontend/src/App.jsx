import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";

import { routes } from "./routes/routes";

import { meService } from "./features/auth/services/auth.service";
import { loginSuccess, logoutAction } from "./features/auth/store/authActions";

import { getToken, getUser } from "./features/auth/services/session.service";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const loadSessionFromBackend = useCallback(async () => {
    try {
      const response = await meService();

      if (response?.user) {
        dispatch(loginSuccess(response.user));
      } else {
        dispatch(logoutAction());
      }
    } catch (error) {
      dispatch(logoutAction());
    }
  }, [dispatch]);

  useEffect(() => {
    const storedUser = getUser();
    const storedToken = getToken();

    if (storedUser && storedToken) {
      dispatch(loginSuccess(storedUser));
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
