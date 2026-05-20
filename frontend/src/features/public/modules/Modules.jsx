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
import { PageGlow } from "@/components/ui";

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
