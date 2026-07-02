import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppAside from "./aside/AppAside";
import AppHeader from "./header/AppHeader";

export default function AppLayout() {
  // ========================================
  // SIDEBAR STATE
  // ========================================
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ========================================
  // TOGGLE
  // ========================================
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* ====================================
       * SIDEBAR
       * ================================== */}
      <AppAside isOpen={isSidebarOpen} />

      {/* ====================================
       * MAIN CONTENT WRAPPER
       * ================================== */}
      <div
        className={`
          flex 
          flex-col 
          min-h-screen 
          transition-all 
          duration-300
          ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"}
        `}
      >
        {/* HEADER */}
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
