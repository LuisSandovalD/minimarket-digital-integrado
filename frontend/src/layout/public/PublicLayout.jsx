import { LoginModal } from "@/features/auth/components/login/";
import { RegisterModal } from "@/features/auth/components/register/";
import { isAuthenticated } from "@/features/auth/services/session.service";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

export default function PublicLayout() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const isLogged = isAuthenticated();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] transition-colors duration-300 transform-gpu dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      {/* NAVBAR */}
      <Navbar setOpenLogin={setOpenLogin} setOpenRegister={setOpenRegister} />

      {/* MAIN CONTENT - Mantiene la consistencia de altura y posicionamiento relativo */}
      <main className="relative w-full overflow-hidden">
        <Outlet context={{ setOpenLogin, setOpenRegister }} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* LOGIN MODAL */}
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSwitchToRegister={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      />

      {/* REGISTER MODAL */}
      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onSwitchToLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
    </div>
  );
}
