import { X } from "lucide-react";

import MobileMenuLinks from "./MobileMenuLinks";

import MobileMenuFooter from "./MobileMenuFooter";

export default function MobileMenu({ open, onClose, links }) {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-[#274c77]/40
          backdrop-blur-md
          transition-all
          duration-300
          
          dark:bg-black/50
          
          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* MENU */}
      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          flex
          h-screen
          w-[320px]
          flex-col
          border-l
          border-[#d7e0e7]
          bg-white/95
          shadow-2xl
          backdrop-blur-2xl
          transition-all
          duration-500

          dark:border-[#365d86]/30
          dark:bg-[#0f172a]/95

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#e7ecef]
            px-6
            py-5

            dark:border-[#365d86]/20
          "
        >
          {/* BRAND */}
          <div>
            <h2
              className="
                text-xl
                font-black
                tracking-tight
                text-[#274c77]

                dark:text-[#a3cef1]
              "
            >
              ERP POS
            </h2>

            <p
              className="
                mt-1
                text-xs
                font-medium
                tracking-wide
                text-[#6096ba]

                dark:text-[#8fb8d8]
              "
            >
              Sistema Multiempresa
            </p>
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              text-[#274c77]
              transition-all
              duration-300
              hover:bg-[#e7ecef]
              hover:text-[#1f3c5d]

              dark:text-[#a3cef1]
              dark:hover:bg-[#365d86]/20
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* LINKS */}
        <MobileMenuLinks links={links} />

        {/* FOOTER */}
        <MobileMenuFooter />
      </aside>
    </>
  );
}
