// features/components/PerformanceSection.jsx
import { MetricCard, StatsGrid } from "@/components/card";
import { Gauge, Rocket, TrendingUp } from "lucide-react";
import { features } from "../constants/performance.js";

export default function PerformanceSection() {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* TOP SECTION - CONTENT + METRIC */}
        <div className="grid gap-8 lg:grid-cols-12 items-start mb-8">
          {/* LEFT - CONTENT */}
          <div className="lg:col-span-6 space-y-4">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/50 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]">
              <Rocket size={16} />
              Alto Rendimiento
            </div>

            {/* TITLE */}
            <div>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-5xl">
                Sistema rápido
              </h2>
              <h2 className="text-4xl font-black leading-tight tracking-tight mt-1 md:text-5xl bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                y escalable
              </h2>
            </div>

            {/* DESCRIPTION */}
            <p className="text-base leading-relaxed text-[#334155] dark:text-[#dbe4ee] max-w-lg">
              Optimizado para empresas modernas, operaciones en tiempo real y
              grandes volúmenes de información sin perder velocidad, estabilidad
              ni seguridad.
            </p>
          </div>

          {/* RIGHT - METRICS CARDS ANIMADAS */}
          <div className="lg:col-span-6">
            <StatsGrid
              items={[
                { icon: TrendingUp, title: "Disponibilidad", value: "99.9%" },
                { icon: Gauge, title: "Velocidad", value: "x10" },
              ]}
              columns={2}
              CardComponent={MetricCard}
              animate={true}
            />
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative rounded-2xl overflow-hidden border border-[#d7e0e7] dark:border-white/10 shadow-lg mb-8">
          <div className="relative h-56 md:h-64 lg:h-72">
            <img
              src="https://scansource.com.br/wp-content/uploads/2024/12/06_Funcoes-do-cientista-de-dados-nas-empresas.png"
              alt="Performance"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/30 via-transparent to-white/10 dark:from-[#020617]/50 dark:via-transparent dark:to-white/5" />
          </div>
        </div>

        {/* FEATURES GRID INFERIOR ANIMADO */}
        <StatsGrid
          items={features}
          columns={4}
          CardComponent={MetricCard}
          animate={true}
          gridClassName="md:grid-cols-2 lg:grid-cols-4"
        />
      </div>
    </section>
  );
}
