// ========================================
// guards/RequireAuth.jsx
// ========================================

import {
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";

import useAuth
  from "../hooks/useAuth";

import {
  getToken,
  getSession,
  saveSession,
} from "../services/session.service";

export default function RequireAuth() {

  const {
    isAuthenticated,
    loading,
    user,
  } = useAuth();

  const {
    companySlug,
  } = useParams();

  // ======================================
  // SESSION
  // ======================================

  const token =
    getToken();

  const session =
    getSession();

  // ======================================
  // SAFE COMPANY SLUG
  // ======================================

  const sessionCompanySlug =
    session?.company?.slug || "";

  // ======================================
  // SYNC USER DATA
  // ======================================

  if (
    user &&
    session?.user
  ) {

    const updatedSession = {

      ...session,

      user: {

        ...session.user,

        ...user,

        avatar:
          user.avatar ||
          session.user?.avatar ||
          null,

      },

    };

    // Guardar sesión actualizada
    saveSession(updatedSession);

  }

  // ======================================
  // LOADING
  // ======================================

  if (loading) {

    // Permitir render mientras verifica
    if (token) {

      return <Outlet />;

    }

    return null;

  }

  // ======================================
  // NOT AUTHENTICATED
  // ======================================

  if (
    !isAuthenticated &&
    !token
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  // ======================================
  // INVALID COMPANY
  // ======================================

  if (
    companySlug &&
    sessionCompanySlug &&
    sessionCompanySlug !== companySlug
  ) {

    return (
      <Navigate
        to={`/${sessionCompanySlug}/dashboard`}
        replace
      />
    );

  }

  // ======================================
  // AUTHORIZED
  // ======================================

  return <Outlet />;

}