import AIFeatures from "./components/AIFeatures.jsx";
import AnalyticsFeatures from "./components/AnalyticsFeatures.jsx";
import BarcodeFeatures from "./components/BarcodeFeatures.jsx";
import FeaturesHero from "./components/FeaturesHero.jsx";
import InventoryFeatures from "./components/InventoryFeatures.jsx";
import PurchaseFeatures from "./components/PurchaseFeatures.jsx";
import SalesFeatures from "./components/SalesFeatures.jsx";

import { PageGlow } from "@/components/effects";

export default function Features() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] transition-colors duration-300 dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      <PageGlow />

      <div className="relative z-10">
        <FeaturesHero />
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-8">
          <InventoryFeatures />
          <SalesFeatures />
          <PurchaseFeatures />
          <AnalyticsFeatures />
          <AIFeatures />
          <BarcodeFeatures />
        </div>
      </div>
    </main>
  );
}
