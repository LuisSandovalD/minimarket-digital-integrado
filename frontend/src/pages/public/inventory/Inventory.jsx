// pages/public/inventory/Inventory.jsx

import {
  InventoryHeroSection,
  InventoryStats,
  StockControlSection,
  WarehouseSection,
  BarcodeSection,
  CategoriesSection,
  SuppliersSection,
  AlertsSection,
  MovementsSection,
  InventoryAnalytics,
  MultiWarehouseSection,
  InventoryDevices,
  InventorySecurity,
  InventoryPerformance,
  InventoryFAQ,
  InventoryCTA,
} from "./components";

import {PageGlow} from "@/components/ui";

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