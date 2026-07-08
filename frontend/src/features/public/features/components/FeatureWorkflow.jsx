// features/components/FeatureWorkflow.jsx
import { MetricCard, StatsGrid } from "@/components/card";
import { workflow } from "../constants/workflow.js";

export default function FeatureWorkflow() {
  return (
    <section className="relative overflow-hidden py-24 max-w-7xl mx-auto px-4">
      <div className="relative">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-[#89c2d9]/30 bg-[#89c2d9]/10 px-4 py-1 text-sm font-semibold tracking-wide text-[#6096ba] backdrop-blur-sm">
            Flujo ERP
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Gestión empresarial moderna
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/60 dark:text-white/60">
            Optimiza cada etapa de tu negocio con un flujo inteligente,
            automatizado y diseñado para mejorar la productividad empresarial.
          </p>
        </div>

        {/* Workflow Grid con renderizado dinámico y conectores */}
        <StatsGrid
          items={workflow}
          columns={5}
          CardComponent={MetricCard}
          animate={true}
          gridClassName="mt-20 gap-7 md:grid-cols-2 xl:grid-cols-5"
          renderCustomSeparator={(index) =>
            index !== workflow.length - 1 && (
              <div className="absolute left-[85%] top-16 hidden h-[2px] w-full bg-gradient-to-r from-[#89c2d9]/60 to-transparent xl:block pointer-events-none z-0" />
            )
          }
        />
      </div>
    </section>
  );
}
