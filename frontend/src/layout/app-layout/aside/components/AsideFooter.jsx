// ========================================
// components/layout/AsideFooter.jsx
// ========================================

import { useState } from "react";

import { LogOut } from "lucide-react";

import { UserAvatar } from "@/components/media/";

import AccountModal from "@/features/account/components/AccountModal";

export default function AsideFooter({
  isCollapsed,
  user,
  company,
  branch,
  onLogout,
}) {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div
      className="
        border-t
        border-slate-200/70
        dark:border-slate-800/70

        p-3
      "
    >
      {/* ========================================
       * USER CARD
       * ====================================== */}

      <div
        className="
            rounded-3xl
            border border-slate-200/70 dark:border-slate-800/70

            bg-white/80 dark:bg-slate-900/80

            shadow-sm
            backdrop-blur-md

            p-3
          "
      >
        <UserAvatar
          user={user}
          size="md"
          showInfo={!isCollapsed}
          showEmail={!isCollapsed}
          showStatus
          onClick={() => setOpenProfile(true)}
        />
      </div>

      {/* ========================================
       * LOGOUT
       * ====================================== */}

      <button
        onClick={onLogout}
        className="
          mt-3
          flex
          w-full
          items-center
          gap-3

          rounded-2xl

          px-3
          py-3

          hover:bg-red-50
          dark:hover:bg-red-950/20
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            bg-slate-100
            dark:bg-slate-800
          "
        >
          <LogOut
            className="
              h-4
              w-4
            "
          />
        </div>

        {!isCollapsed && (
          <div>
            <div
              className="
                text-sm
                font-semibold
              "
            >
              Cerrar sesión
            </div>

            <div
              className="
                text-xs
                text-slate-400
              "
            >
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
