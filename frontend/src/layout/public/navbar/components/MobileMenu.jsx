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

  const backdropClasses =
    "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300";

  const drawerClasses =
    "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-[#e7ecef] bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-[#365d86]/20 dark:bg-[#0b1120]";

  return (
    <>
      <div
        onClick={onClose}
        className={`${backdropClasses} ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`${drawerClasses} ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
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
