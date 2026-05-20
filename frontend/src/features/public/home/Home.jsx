import {
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  WorkflowSection,
  StatsSection,
  DashboardPreviewSection,
  BenefitsSection,
} from "./components";
import CTASection from "./components/CTASection";
import { PageGlow } from "@/components/ui";

export default function Home() {
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

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HERO */}
        <HeroSection />

        {/* MÉTRICAS */}
        <StatsSection />

        {/* FUNCIONES PRINCIPALES */}
        <FeaturesSection />

        {/* PREVIEW DEL SISTEMA */}
        <DashboardPreviewSection />

        {/* FLUJO DEL ERP */}
        <WorkflowSection />

        {/* BENEFICIOS */}
        <BenefitsSection />

        {/* TESTIMONIOS */}
        <TestimonialsSection />

        {/* CALL TO ACTION */}
        <CTASection />
      </div>
    </main>
  );
}