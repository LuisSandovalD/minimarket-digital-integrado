import { BrowserRouter } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

import { meService } from "./features/auth/services/auth.service";
import {
  loginSuccess,
  logoutAction,
  setAuthLoading,
} from "./features/auth/store/authActions";

import { LoadingScreen } from "./components/loading/LoadingScreen";
import { getToken, getUser } from "./features/auth/services/session.service";

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
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return useRoutes(routes);
}
