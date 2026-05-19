// models/Models.jsx

import {
  ModulePreview,
  DashboardPreview,
  AnalyticsPreview,
  InventoryPreview,
  POSPreview,
  SecurityPreview,
  DevicePreview,
  MultiCompanyPreview,
} from "./components";
import ModulesHeroSection from "./components/ModulesHeroSection";

export default function Models() {
  return (
    <main
      className="
        relative
        overflow-hidden

        bg-gradient-to-b
        from-[#f8fbfd]
        via-white
        to-[#eef4f8]

        text-[#0f172a]

        transition-colors
        duration-300

        dark:from-[#020617]
        dark:via-[#07111f]
        dark:to-[#0f172a]

        dark:text-[#e7ecef]
      "
    >
      {/* TOP LIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          left-[-200px]
          top-[-200px]

          h-[500px]
          w-[500px]

          rounded-full

          bg-[#a3cef1]/20
          blur-3xl

          dark:bg-[#6096ba]/10
        "
      />

      {/* CENTER LIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[25%]

          h-[450px]
          w-[450px]

          -translate-x-1/2

          rounded-full

          bg-[#6096ba]/10
          blur-3xl

          dark:bg-[#274c77]/15
        "
      />

      {/* BOTTOM LIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[-200px]
          right-[-150px]

          h-[500px]
          w-[500px]

          rounded-full

          bg-[#274c77]/10
          blur-3xl

          dark:bg-[#6096ba]/10
        "
      />

            <ModulesHeroSection />
          {/* MÓDULOS */}
          <ModulePreview />

          {/* DASHBOARD */}
          <DashboardPreview />

          {/* ANALÍTICAS */}
          <AnalyticsPreview />

          {/* INVENTARIO */}
          <InventoryPreview />

          {/* POS */}
          <POSPreview />

          {/* SEGURIDAD */}
          <SecurityPreview />

          {/* DISPOSITIVOS */}
          <DevicePreview />

          {/* MULTIEMPRESA */}
          <MultiCompanyPreview />
    </main>
  );
}