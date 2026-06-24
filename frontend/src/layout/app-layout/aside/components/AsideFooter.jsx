import { UserAvatar } from "@/components/media/";
import AccountModal from "@/features/account/components/AccountModal";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function AsideFooter({
  isCollapsed,
  user,
  company,
  branch,
  onLogout,
  isLoading = false, // Prop declarada correctamente
}) {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="border-t border-slate-200/70 dark:border-slate-800/70 p-3">
      {/* ========================================
       * USER CARD
       * ====================================== */}
      <div
        className={`rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 shadow-sm backdrop-blur-md p-3 ${isCollapsed ? "flex justify-center" : ""}`}
      >
        <UserAvatar
          user={user}
          size="md"
          showInfo={!isCollapsed}
          showEmail={!isCollapsed}
          showStatus
          isLoading={isLoading} // Corregido: antes decía loading
          onClick={() => setOpenProfile(true)}
        />
      </div>

      {/* ========================================
       * LOGOUT
       * ====================================== */}
      <button
        onClick={onLogout}
        disabled={isLoading}
        className={`mt-3 flex w-full items-center gap-3 rounded-2xl px-3 py-3 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 ${isCollapsed ? "justify-center" : "justify-start"}`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0">
          <LogOut className="h-4 w-4" />
        </div>

        {!isCollapsed && (
          <div className="text-left min-w-0 flex-1">
            <div className="text-sm font-semibold truncate">Cerrar sesión</div>
            <div className="text-xs text-slate-400 truncate">
              Salir del sistema
            </div>
          </div>
        )}
      </button>

      {/* ========================================
       * ACCOUNT MODAL
       * ====================================== */}
      <AccountModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        user={user}
        company={company}
        branch={branch}
      />
    </div>
  );
}
