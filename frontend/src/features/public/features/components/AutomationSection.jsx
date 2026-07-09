// features/components/AutomationSection.jsx

import { MetricCard, StatsGrid } from "@/components/card";
import {
  defaultViewport,
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { automation } from "../constants/automation";

export default function AutomationSection() {
  return (
    <section className="relative py-20 max-w-7xl mx-auto px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
      >
        {/* HEADER */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="max-w-3xl"
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/10 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] dark:text-[#a3cef1]">
              <Sparkles size={16} />
              Automatización Inteligente
            </div>

            {/* TITLE */}
            <h2 className="mt-7 text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-[#e7ecef] md:text-5xl">
              Automatiza procesos empresariales
              <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                rápidos y eficientes
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1] md:text-lg">
              Reduce tareas manuales, mejora la productividad y optimiza
              operaciones mediante automatizaciones inteligentes integradas
              dentro del ERP.
            </p>
          </motion.div>

          {/* RIGHT INFO */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="rounded-2xl border border-[#d7e0e7] bg-white/10 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] lg:max-w-xs"
          >
            <p className="text-sm leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]">
              Automatizaciones conectadas con inventario, ventas, reportes y
              notificaciones empresariales.
            </p>
          </motion.div>
        </div>

        {/* GRID */}
        <motion.div variants={fadeUp} transition={smoothTransition}>
          <StatsGrid
            items={automation}
            columns={4}
            CardComponent={MetricCard}
            animate={true}
            gridClassName="mt-16 md:grid-cols-2 xl:grid-cols-4"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
