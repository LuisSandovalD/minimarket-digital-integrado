// models/Models.jsx

import { PageGlow } from "@/components/effects";

import ModulesFeaturesSection from "./components/ModulesFeaturesSection";
import ModulesHeroSection from "./components/ModulesHeroSection";

import {
  AnalyticsPreview,
  DashboardPreview,
  DevicePreview,
  InventoryPreview,
  MultiCompanyPreview,
  POSPreview,
  SecurityPreview,
} from "./components";

export default function Models() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] transition-colors duration-300 dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      <PageGlow />

      <div className="relative z-10">
        <ModulesHeroSection />

        <ModulesFeaturesSection />

        <DashboardPreview />

        <AnalyticsPreview />

        <InventoryPreview />

        <POSPreview />

        <SecurityPreview />

        <DevicePreview />

        <MultiCompanyPreview />
      </div>
    </main>
  );
}
