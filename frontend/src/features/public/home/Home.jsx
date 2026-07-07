import { PageGlow } from "@/components/effects";

import {
  CTASection,
  DashboardPreviewSection,
  FeaturesSection,
  HeroSection,
  StatsSection,
  TestimonialsSection,
  WorkflowSection,
} from "./components";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] transition-colors duration-300 dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      <PageGlow />

      <div className="relative z-10">
        <HeroSection />

        <StatsSection />

        <FeaturesSection />

        <DashboardPreviewSection />

        <WorkflowSection />

        <TestimonialsSection />

        <CTASection />
      </div>
    </main>
  );
}
