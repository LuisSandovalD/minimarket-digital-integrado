import { PageGlow } from "@/components/effects/";
import PlanBasicDetail from "./components/PlanBasicDetail";
import PlanFreeDetail from "./components/PlanFreeDetail";
import PlanPremiumDetail from "./components/PlanPremiumDetail";
import PricingCards from "./components/PricingCards";
import PricingHero from "./components/PricingHero";
export default function Pricing() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      <PageGlow />

      <div className="relative z-10 flex flex-col">
        <PricingHero />
        {/* Las 3 tarjetas principales (Con animaciones CSS nativas) */}
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-8">
          <PricingCards />

          {/* Secciones de desglose detallado */}
          <PlanFreeDetail />
          <PlanBasicDetail />
          <PlanPremiumDetail />
        </div>
      </div>
    </main>
  );
}
