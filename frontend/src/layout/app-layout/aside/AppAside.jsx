import React from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/features/auth/hooks/useAuth";
import { clearSession, getCompany } from "@/features/auth/services/session.service";
import { hasTierAccess } from "@/features/auth/utils/subscription";

import AsideFooter from "./components/AsideFooter";
import AsideHeader from "./components/AsideHeader";
import AsideNavigation from "./components/AsideNavigation";
import { menuByRole } from "./data/asideMenu";

export default function AppAside({ isOpen }) {
  const navigate = useNavigate();
  //useAuth solo lee pasivamente el estado, manteniéndose nativo y limpio
  const { user, logout, loading } = useAuth();
  const company = getCompany();

  const [activeItem, setActiveItem] = React.useState("dashboard");

  const userRole = user?.role || "EMPLOYEE";
  const companyTier = company?.subscriptionTier || "FREE";
  const isCollapsed = false;

  const menuItems = React.useMemo(() => {
    const roleMenu = menuByRole[userRole] || [];

    return roleMenu
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          if (!item.tier) return true;
          return hasTierAccess(companyTier, item.tier);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [userRole, companyTier]);

  const handleLogout = () => {
    logout?.();
    clearSession();
    navigate("/");
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white/95 backdrop-blur-2xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/95 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <AsideHeader isCollapsed={isCollapsed} company={company} isLoading={loading} />

      <div className="flex-1 overflow-y-auto">
        <AsideNavigation
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isCollapsed={isCollapsed}
          isLoading={loading}
        />
      </div>

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
