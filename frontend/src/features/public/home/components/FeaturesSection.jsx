import { StatsGrid } from "@/components/card";
import { defaultViewport } from "@/components/effects";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { features } from "../constants/feactures";

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const fastFadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll ? features : features.slice(0, 6);

  const mappedFeatures = visibleFeatures.map((feature, index) => ({
    id: feature.title ?? index,

    header: (
      <div className="-mx-5 -mt-5 mb-5 overflow-hidden rounded-t-2xl">
        <div className="relative h-48">
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
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#274c77]/10 text-[#274c77] transition-colors dark:border-white/10 dark:text-[#a3cef1]">
        <ArrowUpRight size={14} />
      </div>
    ),
  }));

  return (
    <section
      id="features"
      className="relative z-10 w-full overflow-hidden px-4 py-16 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="relative z-20 mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            <Sparkles size={14} />
            Funciones inteligentes
          </motion.div>

          <motion.h2
            variants={fastFadeUp}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl"
          >
            Todo lo que necesitas
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              para administrar tu negocio
            </span>
          </motion.h2>

          <motion.p
            variants={fastFadeUp}
            className="mt-3 max-w-xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
          >
            Un sistema ERP POS moderno, rápido y escalable diseñado para ventas,
            inventario, reportes, seguridad y gestión multiempresa.
          </motion.p>
        </motion.div>

        <div className="relative z-30 mt-12">
          <AnimatePresence mode="popLayout">
            <StatsGrid
              items={mappedFeatures}
              columns={3}
              animate
              cardVariant="transparent"
              cardClassName="group overflow-hidden rounded-2xl !border-[#274c77]/10 !bg-transparent !p-5 transition-all duration-300 hover:z-20 dark:!border-white/5"
            />
          </AnimatePresence>
        </div>

        {features.length > 6 && (
          <div className="relative z-40 mt-10 flex justify-center">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#274c77]/10 bg-transparent px-5 py-3 text-sm font-semibold text-[#274c77] transition-all duration-200 hover:bg-[#274c77] hover:text-white dark:border-white/10 dark:text-[#a3cef1] dark:hover:bg-[#274c77]"
            >
              {showAll ? (
                <>
                  Ver menos
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Ver más características
                  <ChevronDown size={16} />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
