import useAuth from "@/features/auth/hooks/useAuth";
import {
  clearSession,
  getCompany,
} from "@/features/auth/services/session.service";
import { hasTierAccess } from "@/features/auth/utils/subscription"; // <-- Utilidad centralizada unificada
import React from "react";
import { useNavigate } from "react-router-dom";
import AsideFooter from "./components/AsideFooter";
import AsideHeader from "./components/AsideHeader";
import AsideNavigation from "./components/AsideNavigation";
import { menuByRole } from "./data/asideMenu";

export default function AppAside({ isOpen }) {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const company = getCompany();
  const [activeItem, setActiveItem] = React.useState("dashboard");

  const userRole = user?.role || "EMPLOYEE";
  const isCollapsed = !isOpen;
  const companyTier = company?.subscriptionTier || "FREE";

  // Procesamiento estructurado del menú adaptado al rol y nivel de suscripción
  const menuItems = React.useMemo(() => {
    const roleMenu = menuByRole[userRole] || [];

    return roleMenu
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          // Si el módulo no tiene restricción de plan, cualquier usuario lo puede ver
          if (!item.tier) return true;

          // Se evalúa mediante la utilidad centralizada si el tier cubre el requisito
          return hasTierAccess(companyTier, item.tier);
        });

        return {
          ...section,
          items: filteredItems,
        };
      })
      .filter((section) => section.items.length > 0); // Remueve las secciones que queden vacías
  }, [userRole, companyTier]);

  const handleLogout = () => {
    logout?.();
    clearSession();
    navigate("/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 hidden lg:flex h-screen flex-col border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"}`}
    >
      {/* HEADER */}
      <AsideHeader
        isCollapsed={isCollapsed}
        company={company}
        isLoading={loading}
      />

      {/* NAVEGACIÓN */}
      <div className="flex-1 overflow-y-auto">
        <AsideNavigation
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isCollapsed={isCollapsed}
          isLoading={loading}
        />
      </div>

      {/* FOOTER */}
      <AsideFooter
        isCollapsed={isCollapsed}
        user={user}
        company={company}
        branch={user?.branch}
        onLogout={handleLogout}
        isLoading={loading}
      />
    </aside>
  );
}
