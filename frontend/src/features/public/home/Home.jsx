import { PageGlow } from "@/components/effects";
import CTASection from "./components/CTASection.jsx";
import HeroSection from "./components/HeroSection.jsx";
import StatsSection from "./components/StatsSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import TrustedSection from "./components/TrustedSection.jsx";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f8fbfd] via-white to-[#eef4f8] text-[#0f172a] transition-colors duration-300 dark:from-[#020617] dark:via-[#07111f] dark:to-[#0f172a] dark:text-[#e7ecef]">
      <PageGlow />

      <div className="relative z-10 flex flex-col">
        <HeroSection />

        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-8">
          <TrustedSection />
          <StatsSection />
          <TestimonialsSection />
          <CTASection />
        </div>
      </div>
    </main>
  );
}
