import MobileMenu from "./components/MobileMenu";
import NavbarActions from "./components/NavbarActions";
import NavbarBrand from "./components/NavbarBrand";
import NavbarLinks from "./components/NavbarLinks";
import NavbarMobileButton from "./components/NavbarMobileButton";
import { navLinks } from "./constants/navLinks";
import useNavbar from "./hooks/useNavbar";

export default function Navbar({ setOpenLogin, setOpenRegister }) {
  const { open, openMenu, closeMenu } = useNavbar();

  return (
    <>
      <header className=" sticky top-0 z-40 overflow-hidden border-b border-[#d7e0e7]/40 bg-white/60 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/45 transition-all duration-300 dark:border-[#365d86]/20 dark:bg-[#0b1120]/55 dark:supports-[backdrop-filter]:bg-[#0b1120]/45 dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)] ">
        {/* MAIN OVERLAY */}
        <div className=" pointer-events-none absolute inset-0 bg-gradient-to-r from-[#eef4f8]/20 via-transparent to-[#a3cef1]/20 dark:from-[#274c77]/20 dark:via-[#13263b]/20 dark:to-[#6096ba]/20" />

        {/* BOTTOM BORDER GLOW */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px from-transparent via-[#6096ba]/50 to-transparent dark:via-[#a3cef1]/35 " />

        {/* CONTENT */}
        <div className="relative flex h-[8vh] items-center justify-between px-6">
          <NavbarBrand />
          <NavbarLinks links={navLinks} />

          <div className="flex items-center gap-2">
            {/* HEREDAMOS LAS PROPS DE MODAL AQUÍ */}
            <NavbarActions setOpenLogin={setOpenLogin} setOpenRegister={setOpenRegister} />
            <NavbarMobileButton onClick={openMenu} />
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <MobileMenu
        open={open}
        onClose={closeMenu}
        links={navLinks}
        onOpenLogin={() => {
          if (setOpenRegister) setOpenRegister(false);
          if (setOpenLogin) setOpenLogin(true);
        }}
        onOpenRegister={() => {
          if (setOpenLogin) setOpenLogin(false);
          if (setOpenRegister) setOpenRegister(true);
        }}
      />
    </>
  );
}
