import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";

import Footer from "./footer/Footer";

export default function PublicLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-white
        text-zinc-900
        dark:bg-black
        dark:text-white
      "
    >
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main
        className="
          relative
          overflow-hidden
        "
      >
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}