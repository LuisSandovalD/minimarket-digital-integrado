import {
  FeaturesHeroSection,
  FeatureStats,
  FeaturesGrid,
  AutomationSection,
  ReportsSection,
  SecurityFeatures,
  IntegrationsFeatures,
  MobileFeatures,
  PerformanceSection,
  FeatureWorkflow,
  FAQFeatures,
} from "./components";
import { PageGlow } from "@/components/ui";

export default function Features() {
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
        <FeaturesHeroSection />

        <FeatureStats />

        <FeaturesGrid />

        <AutomationSection />

        <ReportsSection />

        <SecurityFeatures />

        <IntegrationsFeatures />

        <MobileFeatures />

        <PerformanceSection />

        <FeatureWorkflow />

        <FAQFeatures />
      </div>
    </main>
  );
}
