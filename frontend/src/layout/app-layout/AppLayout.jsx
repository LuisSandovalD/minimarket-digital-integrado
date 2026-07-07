import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppAside from "./aside/AppAside";
import AppHeader from "./header/AppHeader";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <AppAside isOpen={isSidebarOpen} />

      <div className="flex min-h-screen flex-col lg:ml-72">
        <AppHeader onToggleAside={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
