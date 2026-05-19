import {
  useState,
} from "react";

import {
  LogIn,
  UserPlus,
} from "lucide-react";

import {
  ModernButton,
} from "@/components/buttons";

import ThemeToggle
  from "@/components/theme/ThemeToggle";

import {LoginModal} from "@/features/auth/components/login/"
import {RegisterModal} from "@/features/auth/components/register/"
export default function NavbarActions() {
  const [
    openLogin,
    setOpenLogin,
  ] = useState(false);

  const [
    openRegister,
    setOpenRegister,
  ] = useState(false);

  return (
    <>
      {/* ACTIONS */}
      <div className="hidden items-center gap-3 lg:flex">

        {/* LOGIN */}
        <ModernButton
          text="Iniciar Sesión"
          icon={LogIn}
          variant="ghost"
          onClick={() => {
            setOpenRegister(false);
            setOpenLogin(true);
          }}
        />

        {/* REGISTER */}
        <ModernButton
          text="Registrarse"
          icon={UserPlus}
          variant="primary"
          onClick={() => {
            setOpenLogin(false);
            setOpenRegister(true);
          }}
        />

        {/* THEME */}
        <ThemeToggle />
      </div>

      {/* LOGIN MODAL */}
      <LoginModal
        open={openLogin}
        onClose={() =>
          setOpenLogin(false)
        }
      />

      {/* REGISTER MODAL */}
      <RegisterModal
        open={openRegister}
        onClose={() =>
          setOpenRegister(false)
        }
      />
    </>
  );
}