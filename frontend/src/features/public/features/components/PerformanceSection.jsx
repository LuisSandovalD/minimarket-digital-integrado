// features/components/PerformanceSection.jsx

import { MetricCard, StatsGrid } from "@/components/card";
import {
  defaultViewport,
  fadeUp,
  hoverScale,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { Gauge, Rocket, TrendingUp } from "lucide-react";
import { features } from "../constants/performance.js";

export default function PerformanceSection() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
        >
          {/* TOP SECTION */}
          <div className="mb-8 grid items-start gap-8 lg:grid-cols-12">
            {/* LEFT */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="space-y-4 lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/50 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]">
                <Rocket size={16} />
                Alto Rendimiento
              </div>

              <div>
                <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-5xl">
                  Sistema rápido
                </h2>

                <h2 className="mt-1 bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent md:text-5xl">
                  y escalable
                </h2>
              </div>

              <p className="max-w-lg text-base leading-relaxed text-[#334155] dark:text-[#dbe4ee]">
                Optimizado para empresas modernas, operaciones en tiempo real y
                grandes volúmenes de información sin perder velocidad,
                estabilidad ni seguridad.
              </p>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="lg:col-span-6"
            >
              <StatsGrid
                items={[
                  {
                    icon: TrendingUp,
                    title: "Disponibilidad",
                    value: "99.9%",
                  },
                  {
                    icon: Gauge,
                    title: "Velocidad",
                    value: "x10",
                  },
                ]}
                columns={2}
                CardComponent={MetricCard}
                animate
              />
            </motion.div>
          </div>

          {/* IMAGE */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            whileHover={hoverScale}
            className="relative mb-8 overflow-hidden rounded-2xl border border-[#d7e0e7] shadow-lg dark:border-white/10"
          >
            <div className="relative h-56 md:h-64 lg:h-72">
              <img
                src="https://scansource.com.br/wp-content/uploads/2024/12/06_Funcoes-do-cientista-de-dados-nas-empresas.png"
                alt="Performance ERP"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/30 via-transparent to-white/10 dark:from-[#020617]/50 dark:via-transparent dark:to-white/5" />
            </div>
          </motion.div>

          {/* FEATURES GRID */}
          <motion.div variants={fadeUp} transition={smoothTransition}>
            <StatsGrid
              items={features}
              columns={4}
              CardComponent={MetricCard}
              animate
              gridClassName="md:grid-cols-2 lg:grid-cols-4"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
