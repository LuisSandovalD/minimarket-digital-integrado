import { StatsGrid } from "@/components/card";
import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { BarChart3, Boxes, ShoppingCart, Sparkles, Truck } from "lucide-react";
import { HOME_HIGHLIGHTS, STATS } from "../constants/homeData";

// Mapeo dinámico de íconos alineados a tus constantes principales
const icons = [Boxes, ShoppingCart, Truck, Sparkles];

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
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function StatsSection() {
  // Construcción de items inyectando las descripciones detalladas de tu homeData
  const items = STATS.map((stat, index) => {
    const highlight = HOME_HIGHLIGHTS[index] || {};
    return {
      id: stat.label ?? index,
      icon: icons[index] || BarChart3,
      title: stat.value,
      subtitle: stat.label,
      description:
        highlight.description || "Optimización operativa en tiempo real.",
    };
  });

  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 py-24 sm:px-6 md:px-8 lg:px-10 z-10">
      {/* Luces sutiles de fondo para romper la monotonía */}
      <div className="pointer-events-none absolute inset-0 -z-10 transform-gpu opacity-30 dark:opacity-20">
        <div className="absolute left-1/4 top-1/2 h-80 w-80 rounded-full bg-[#6096ba]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto  w-full">
        {/* ================= ENCABEZADO DE SECCIÓN ================= */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center transform-gpu"
        >
          {/* Badge Adaptable */}
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1] shadow-inner"
          >
            <BarChart3 size={14} />
            Métricas de Impacto Global
          </motion.div>

          {/* Título */}
          <motion.h2
            variants={fastFadeUp}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl lg:text-5xl"
          >
            Rendimiento Absoluto para{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              la Gestión de tu Comercio
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            variants={fastFadeUp}
            className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-dark-foreground/70"
          >
            Un ecosistema integral en la nube diseñado para controlar
            inventarios complejos, acelerar tus cajas de venta y proyectar tu
            crecimiento con analítica de precisión.
          </motion.p>
        </motion.div>

        {/* ================= REJILLA DE MÉTRICAS (STATS GRID) ================= */}
        <div className="relative z-20 mt-16 w-full">
          <StatsGrid
            items={items}
            columns={4}
            animate
            cardClassName="rounded-2xl border border-slate-200/70 bg-slate-50/40 p-6 transition-all duration-300 hover:border-[#6096ba]/30 hover:bg-slate-50/80 shadow-sm hover:shadow-md dark:border-white/5 dark:bg-white/[0.01] dark:hover:border-white/10 dark:hover:bg-white/[0.03]"
          />
        </div>
      </div>
    </section>
  );
}
