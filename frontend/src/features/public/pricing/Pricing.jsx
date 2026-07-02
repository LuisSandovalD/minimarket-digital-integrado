// Importaciones de efectos y Layout global
import { PageGlow } from "@/components/effects/";

// Importaciones específicas de los componentes de costos y planes
import PlanBasicDetail from "./components/PlanBasicDetail";
import PlanFreeDetail from "./components/PlanFreeDetail";
import PlanPremiumDetail from "./components/PlanPremiumDetail";
import PricingCards from "./components/PricingCards";

export default function Pricing() {
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

      {/* Las 3 tarjetas con la jerarquía visual (el del medio sobresale en altura) */}
      <PricingCards />

      {/* Desglose específico, límites y capacidades del Plan FREE */}
      <PlanFreeDetail />

      {/* Desglose avanzado, módulos y ventajas comerciales del Plan BASIC */}
      <PlanBasicDetail />

      {/* Desglose corporativo, infraestructura pesada y asistente IA del Plan PREMIUM */}
      <PlanPremiumDetail />
    </main>
  );
}
