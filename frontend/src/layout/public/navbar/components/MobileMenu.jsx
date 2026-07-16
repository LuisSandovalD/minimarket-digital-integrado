import { useEffect } from "react";
import MobileMenuFooter from "./MobileMenuFooter";
import MobileMenuHeader from "./MobileMenuHeader";
import MobileMenuLinks from "./MobileMenuLinks";

export default function MobileMenu({ open, onClose, links, onOpenLogin, onOpenRegister }) {
  // Bloquear el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex h-full max-h-screen w-72 flex-col border-r border-[#e7ecef] bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-[#365d86]/20 dark:bg-[#0b1120] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MobileMenuHeader onClose={onClose} />

        {/* Contenedor con scroll interno */}
        <div className="flex-1 overflow-y-auto">
          <MobileMenuLinks links={links} onClose={handleLinkClick} />
        </div>

        <MobileMenuFooter
          onOpenLogin={() => {
            onOpenLogin();
            onClose();
          }}
          onOpenRegister={() => {
            onOpenRegister();
            onClose();
          }}
        />
      </aside>
    </>
  );
}
