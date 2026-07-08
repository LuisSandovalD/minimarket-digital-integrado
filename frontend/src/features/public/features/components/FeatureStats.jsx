// features/components/FeatureStats.jsx
import { MetricCard, StatsGrid } from "@/components/card";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { stats } from "../constants/stats.js";

const icons = [Activity, BarChart3, ShieldCheck, Zap];

export default function FeatureStats() {
  // Combinamos los datos estáticos de stats con sus respectivos iconos de lucide
  const normalizedStats = stats.map((item, index) => ({
    ...item,
    icon: icons[index] || BarChart3,
    // Aseguramos el mapeo correcto si las propiedades usan 'label' en vez de 'description'
    description: item.description || item.label,
  }));

  return (
    <section className="relative py-20 max-w-7xl mx-auto px-6">
      {/* HEADER */}
      <div>
        {/* BADGE */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/10 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] dark:text-[#a3cef1]">
          <BarChart3 size={16} />
          Métricas del Sistema
        </div>

        {/* TITLE */}
        <h2 className="mt-7 text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-[#e7ecef] md:text-5xl">
          Rendimiento y crecimiento
          <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
            impulsados por tecnología
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1] md:text-lg">
          Descubre cómo las funciones inteligentes del ERP optimizan procesos
          empresariales, mejoran la productividad y ofrecen una experiencia
          moderner y eficiente.
        </p>
      </div>

      {/* STATS GRID ANIMADO */}
      <StatsGrid
        items={normalizedStats}
        columns={4}
        CardComponent={MetricCard}
        animate={true}
        gridClassName="mt-16 sm:grid-cols-2 xl:grid-cols-4"
      />
    </section>
  );
}
