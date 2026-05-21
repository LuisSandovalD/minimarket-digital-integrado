import { Store, X } from "lucide-react";

import MobileMenuFooter from "./MobileMenuFooter";
import MobileMenuLinks from "./MobileMenuLinks";

export default function MobileMenu({ open, onClose, links }) {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/30
          backdrop-blur-sm
          transition-all duration-300

          dark:bg-black/60

          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* MENU */}
      <aside
        className={`
          fixed top-0 right-0 z-50
          flex h-screen w-[330px] flex-col
          border-l border-slate-200/70
          bg-white/80
          shadow-[0_20px_80px_rgba(0,0,0,0.12)]
          backdrop-blur-2xl
          transition-all duration-500

          dark:border-slate-800
          dark:bg-[#020617]/90

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Decorative Blur */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-slate-200/40 blur-3xl dark:bg-slate-700/10"></div>
        </div>

        {/* HEADER */}
        <div
          className="
            relative z-10
            flex items-center justify-between
            border-b border-slate-200/70
            px-6 py-5

            dark:border-slate-800
          "
        >
          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-slate-100
                shadow-inner

                dark:bg-slate-800
              "
            >
              <Store size={22} className="text-slate-800 dark:text-slate-100" />
            </div>

            <div>
              <h2
                className="
                  text-lg font-semibold tracking-tight
                  text-slate-900

                  dark:text-slate-100
                "
              >
                ERP POS
              </h2>

              <p
                className="
                  text-xs font-medium
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Sistema Multiempresa
              </p>
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-2xl
              text-slate-600
              transition-all duration-300

              hover:bg-slate-100
              hover:text-slate-900

              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* LINKS */}
        <div className="relative z-10 flex-1 overflow-y-auto">
          <MobileMenuLinks links={links} />
        </div>

        {/* FOOTER */}
        <div className="relative z-10">
          <MobileMenuFooter />
        </div>
      </aside>
    </>
  );
}
