import { StatsGrid } from "@/components/card";
import {
  defaultViewport,
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { features } from "../constants/features";

export default function FeaturesSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll ? features : features.slice(0, 6);

  const mappedFeatures = visibleFeatures.map((feature, index) => ({
    id: feature.title ?? index,

    header: (
      <div className="-mx-4 -mt-4 mb-3 overflow-hidden rounded-t-xl">
        <div className="relative h-40">
          <img
            src={feature.image}
            alt={feature.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-transparent to-transparent" />
        </div>
      </div>
    ),

    icon: feature.icon,
    title: feature.title,
    description: feature.description,

    actions: (
      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#274c77]/10 text-[#274c77] transition-all duration-300 group-hover:bg-[#274c77] group-hover:text-white dark:border-white/10 dark:text-[#a3cef1] dark:group-hover:bg-[#a3cef1] dark:group-hover:text-[#0f172a]">
        <ArrowUpRight size={13} />
      </div>
    ),
  }));

  return (
    <section
      id="features"
      className="relative z-10 w-full overflow-hidden px-4 py-12 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          className="relative z-20 mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-white/10 px-3 py-1 text-xs font-semibold text-[#274c77] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03] dark:text-[#a3cef1]"
          >
            <Sparkles
              size={14}
              className="text-[#6096ba] dark:text-[#a3cef1]"
            />
            Funciones inteligentes
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl"
          >
            Todo lo que necesitas
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              para administrar tu negocio
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-3 max-w-xl text-sm leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
          >
            Un sistema ERP POS moderno, rápido y escalable diseñado para ventas,
            inventario, reportes, seguridad y gestión multiempresa.
          </motion.p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          className="relative z-30 mt-10"
        >
          <AnimatePresence mode="popLayout">
            <StatsGrid
              items={mappedFeatures}
              columns={3}
              animate
              cardVariant="transparent"
              cardClassName="group relative overflow-hidden rounded-2xl border border-[#d7e0e7] bg-white/50 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#89c2d9]/60 hover:shadow-xl dark:border-white/5 dark:bg-white/[0.02]"
              gridClassName="md:grid-cols-2 xl:grid-cols-3"
            />
          </AnimatePresence>
        </motion.div>

        {/* BUTTON */}
        {features.length > 6 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={defaultViewport}
            className="relative z-40 mt-8 flex justify-center"
          >
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#274c77]/10 bg-white/40 px-4 py-2.5 text-xs font-bold text-[#274c77] backdrop-blur-md transition-all duration-200 hover:bg-[#274c77] hover:text-white dark:border-white/10 dark:bg-white/[0.02] dark:text-[#a3cef1] dark:hover:bg-[#274c77] dark:hover:text-white"
            >
              {showAll ? (
                <>
                  Ver menos
                  <ChevronUp
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                </>
              ) : (
                <>
                  Ver más características
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
