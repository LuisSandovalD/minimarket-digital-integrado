// features/components/FeatureStats.jsx

import { MetricCard, StatsGrid } from "@/components/card";
import {
  defaultViewport,
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { stats } from "../constants/stats";

const icons = [Activity, BarChart3, ShieldCheck, Zap];

export default function FeatureStats() {
  const normalizedStats = stats.map((item, index) => ({
    ...item,
    icon: icons[index] || BarChart3,
    description: item.description || item.label,
  }));

  return (
    <section className="relative py-20 max-w-7xl mx-auto px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} transition={smoothTransition}>
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
            moderna y eficiente.
          </p>
        </motion.div>

        {/* STATS GRID */}
        <motion.div variants={fadeUp} transition={smoothTransition}>
          <StatsGrid
            items={normalizedStats}
            columns={4}
            CardComponent={MetricCard}
            animate={true}
            gridClassName="mt-16 sm:grid-cols-2 xl:grid-cols-4"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
