// models/Models.jsx

import { PageGlow } from "@/components/effects/";
import {
  AnalyticsPreview,
  DashboardPreview,
  DevicePreview,
  InventoryPreview,
  ModulePreview,
  MultiCompanyPreview,
  POSPreview,
  SecurityPreview,
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
      <PageGlow />

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
