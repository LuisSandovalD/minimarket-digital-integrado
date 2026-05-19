import React from "react";

import {
  Menu,
  Settings,
} from "lucide-react";

import ThemeToggle
  from "../../../components/theme/ThemeToggle";

import ModernButton
  from "../../../components/buttons/ModernButton";

import SearchInput
  from "../../../components/inputs/SearchInput";



export default function AppHeader({
  onToggleAside,
}) {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        h-20

        border-b
        border-slate-200/60
        dark:border-slate-800/60

        bg-white/70
        dark:bg-slate-950/70

        backdrop-blur-2xl

        supports-[backdrop-filter]:bg-white/60
        dark:supports-[backdrop-filter]:bg-slate-950/60
      "
    >
      <div
        className="
          h-full
          w-full

          px-4
          md:px-6

          flex
          items-center
          justify-between

          gap-3
        "
      >

        {/* ========================================
         * LEFT
         * ====================================== */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* MENU BUTTON */}
          <ModernButton
            icon={Menu}
            text=""
            size="icon"
            variant="ghost"
            onClick={onToggleAside}
            className="
              lg:hidden

              border
              border-slate-200/70
              dark:border-slate-800/70

              bg-white/70
              dark:bg-slate-900/70

              shadow-sm

              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          />

          {/* SEARCH */}
          <div
            className="
              hidden
              lg:flex

              w-full
              max-w-sm
            "
          >
            <SearchInput
              placeholder="
                Buscar productos, ventas...
              "
            />
          </div>

        </div>

        {/* ========================================
         * ACTIONS
         * ====================================== */}
        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          {/* SETTINGS */}
          <ModernButton
            icon={Settings}
            variant="ghost"
            text=""
            size="icon"
            className="
              border
              border-slate-200/70
              dark:border-slate-800/70

              bg-white/70
              dark:bg-slate-900/70

              shadow-sm

              hover:bg-slate-100
              dark:hover:bg-slate-800

              hover:border-slate-300
              dark:hover:border-slate-700
            "
          />

          {/* THEME */}
          <ThemeToggle />

        </div>

      </div>

    </header>
  );
}