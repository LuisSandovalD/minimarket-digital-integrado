import MobileMenuFooter from "./MobileMenuFooter";
import MobileMenuHeader from "./MobileMenuHeader";
import MobileMenuLinks from "./MobileMenuLinks";

export default function MobileMenu({
  open,
  onClose,
  links,
  onOpenLogin,
  onOpenRegister,
}) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* DRAWER — izquierda */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          flex flex-col
          bg-white dark:bg-[#0b1120]
          shadow-2xl border-r border-[#e7ecef] dark:border-[#365d86]/20
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <MobileMenuHeader onClose={onClose} />
        <MobileMenuLinks links={links} onClose={handleLinkClick} />
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
      </div>
    </>
  );
}
