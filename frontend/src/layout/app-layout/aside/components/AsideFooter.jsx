import { LogOut } from "lucide-react";
import { useState } from "react";

import { UserAvatar } from "@/components/media";
import AccountModal from "@/features/account/components/AccountModal";

export default function AsideFooter({
  isCollapsed,
  user,
  company,
  branch,
  onLogout,
  isLoading = false,
  onProfileUpdated, // 1. Recibimos el callback del componente padre (AppAside)
}) {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="border-t border-slate-200/70 p-3 dark:border-slate-800/70">
      <div
        className={`rounded-3xl border border-slate-200/70 bg-white/80 p-3 shadow-sm backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/80 ${isCollapsed ? "flex justify-center" : ""}`}
      >
        <UserAvatar
          key={`${user?.id}-${user?.avatar}`}
          user={user}
          size="md"
          showInfo={!isCollapsed}
          showEmail={!isCollapsed}
          showStatus
          isLoading={isLoading}
          onClick={() => setOpenProfile(true)}
        />
      </div>

      <button
        onClick={onLogout}
        disabled={isLoading}
        className={`mt-3 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/20 dark:hover:text-red-400 ${isCollapsed ? "justify-center" : "justify-start"}`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
          <LogOut className="h-4 w-4" />
        </div>

        {!isCollapsed && (
          <div className="min-w-0 flex-1 text-left">
            <div className="truncate text-sm font-semibold">Cerrar sesión</div>
            <div className="truncate text-xs text-slate-400">Salir del sistema</div>
          </div>
        )}
      </button>

      {/* 2. Le inyectamos el callback al modal para que lo use tras guardar los cambios */}
      <AccountModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        user={user}
        company={company}
        branch={branch}
        onUpdateSuccess={onProfileUpdated}
      />
    </div>
  );
}
