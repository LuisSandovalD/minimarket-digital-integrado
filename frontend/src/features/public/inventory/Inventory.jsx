// pages/public/inventory/Inventory.jsx

import {
  AlertsSection,
  BarcodeSection,
  CategoriesSection,
  InventoryAnalytics,
  InventoryCTA,
  InventoryDevices,
  InventoryFAQ,
  InventoryHeroSection,
  InventoryPerformance,
  InventorySecurity,
  InventoryStats,
  MovementsSection,
  MultiWarehouseSection,
  StockControlSection,
  SuppliersSection,
  WarehouseSection,
} from "./components";

import { PageGlow } from "@/components/effects/";

export default function Inventory() {
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

      <InventoryHeroSection />

      <InventoryStats />

      <StockControlSection />

      <WarehouseSection />

      <BarcodeSection />

      <CategoriesSection />

      <SuppliersSection />

      <AlertsSection />

      <MovementsSection />

      <InventoryAnalytics />

      <MultiWarehouseSection />

      <InventoryDevices />

      <InventorySecurity />

      <InventoryPerformance />

      <InventoryFAQ />

      <InventoryCTA />
    </main>
  );
}
