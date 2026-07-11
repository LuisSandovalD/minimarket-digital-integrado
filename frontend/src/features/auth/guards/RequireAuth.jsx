// ========================================
// guards/RequireAuth.jsx
// ========================================

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { getSession, getToken, saveSession } from "../services/session.service";

import { loginSuccess } from "../store/authSlice";

export default function RequireAuth() {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, user } = useAuth();

  const { companySlug } = useParams();

  const [initialized, setInitialized] = useState(false);

  /* ======================================
   * RESTORE SESSION
   * ==================================== */
  useEffect(() => {
    const token = getToken();

    const session = getSession();

    if (!isAuthenticated && token && session?.user) {
      dispatch(
        loginSuccess({
          user: session.user,
        }),
      );
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialized(true);
  }, [dispatch, isAuthenticated]);

  const token = getToken();

  const session = getSession();

  const sessionCompanySlug =
    session?.user?.company?.slug || session?.company?.slug || "";

  /* ======================================
   * SYNC USER DATA
   * ==================================== */
  useEffect(() => {
    if (user && session?.user) {
      saveSession({
        ...session,

        user: {
          ...session.user,
          ...user,
        },
      });
    }
  }, [session, user]);

  /* ======================================
   * LOADING
   * ==================================== */
  if (loading || !initialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  /* ======================================
   * NO SESSION
   * ==================================== */
  if (!token) {
    // IMPORTANTE:
    // Cambia "/" por la ruta pública real
    // donde muestras tu modal de login.
    return <Navigate to="/" replace />;
  }

  /* ======================================
   * MULTI-TENANT PROTECTION
   * ==================================== */
  if (companySlug && sessionCompanySlug && companySlug !== sessionCompanySlug) {
    return <Navigate to={`/${sessionCompanySlug}/dashboard`} replace />;
  }

  /* ======================================
   * AUTHORIZED
   * ==================================== */
  return <Outlet />;
}
