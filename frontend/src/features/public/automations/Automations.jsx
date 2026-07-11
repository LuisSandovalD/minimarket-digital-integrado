import { PageGlow } from "@/components/effects";

import AutomationsHero from "./components/AutomationsHero.jsx";
import EmailAutomationFlow from "./components/EmailAutomationFlow.jsx";
import SecurityFlow from "./components/SecurityFlow.jsx";
import StockAlertsFlow from "./components/StockAlertsFlow.jsx";
import SubscriptionFlow from "./components/SubscriptionFlow.jsx";

export default function Automations() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] transition-colors duration-300 dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      {/* Efecto de iluminación de fondo */}
      <PageGlow />

      <div className="relative z-10">
        {/* Banner e introducción principal */}
        <AutomationsHero />

        {/* Contenedor optimizado para layouts de múltiples columnas con espaciado orgánico */}
        <div className="mx-auto max-w-7xl px-4 pb-32 pt-16 space-y-32 sm:px-6 lg:px-8">
          <EmailAutomationFlow />

          <SecurityFlow />

          <SubscriptionFlow />

          <StockAlertsFlow />
        </div>
      </div>
    </main>
  );
}
