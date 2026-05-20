import React from "react";

import { useNavigate } from "react-router-dom";

import AsideHeader from "./components/AsideHeader";

import AsideNavigation from "./components/AsideNavigation";

import AsideFooter from "./components/AsideFooter";

import { menuByRole } from "./data/asideMenu";

import useAuth from "@/features/auth/hooks/useAuth";

import {
  clearSession,
  getCompany,
} from "@/features/auth/services/session.service";

// ========================================
// COMPONENT
// ========================================

export default function AppAside({ isOpen }) {
  // ========================================
  // NAVIGATION
  // ========================================

  const navigate = useNavigate();

  // ========================================
  // AUTH
  // ========================================

  const { user, logout } = useAuth();

  // ========================================
  // COMPANY
  // ========================================

  const company = getCompany();

  // ========================================
  // STATE
  // ========================================

  const [activeItem, setActiveItem] = React.useState("dashboard");

  // ========================================
  // ROLE
  // ========================================

  const userRole = user?.role || "EMPLOYEE";

  // ========================================
  // MENU
  // ========================================

  const menuItems = menuByRole[userRole] || [];

  // ========================================
  // COLLAPSED
  // ========================================

  const isCollapsed = !isOpen;

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    // Limpiar auth global
    logout?.();

    // Limpiar localStorage
    clearSession();

    // Redireccionar
    navigate("/");
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <aside
      className={`
        fixed
        top-0
        left-0

        z-50

        hidden
        lg:flex

        h-screen
        flex-col

        border-r
        border-slate-200

        dark:border-slate-800

        bg-white/95
        dark:bg-slate-900/95

        backdrop-blur-2xl

        transition-all
        duration-300

        ${isCollapsed ? "w-20" : "w-72"}
      `}
    >
      {/* ====================================
       * HEADER
       * ================================== */}

      <AsideHeader isCollapsed={isCollapsed} />

      {/* ====================================
       * NAVIGATION
       * ================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
        "
      >
        <AsideNavigation
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isCollapsed={isCollapsed}
        />
      </div>

      {/* ====================================
       * FOOTER
       * ================================== */}

      <AsideFooter
        isCollapsed={isCollapsed}
        user={user}
        company={company}
        branch={user?.branch}
        onLogout={handleLogout}
      />
    </aside>
  );
}
