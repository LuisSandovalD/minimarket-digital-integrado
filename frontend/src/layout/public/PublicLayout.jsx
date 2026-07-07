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
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
      {/* NAVBAR: Ahora recibe los estados como props directas */}
      <Navbar setOpenLogin={setOpenLogin} setOpenRegister={setOpenRegister} />

      {/* MAIN CONTENT */}
      <main className="relative overflow-hidden">
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
