import { PageGlow } from "@/components/effects/";
import PlanBasicDetail from "./components/PlanBasicDetail";
import PlanFreeDetail from "./components/PlanFreeDetail";
import PlanPremiumDetail from "./components/PlanPremiumDetail";
import PricingCards from "./components/PricingCards";

export default function Pricing() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      <PageGlow />

      {/* Las 3 tarjetas principales (Con animaciones CSS nativas) */}
      <PricingCards />

      {/* Secciones de desglose detallado */}
      <PlanFreeDetail />
      <PlanBasicDetail />
      <PlanPremiumDetail />
    </main>
  );
}
