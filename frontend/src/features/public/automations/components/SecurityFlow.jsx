import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { SECURITY_FLOW } from "../constants/automationsData.js";
import FlowGrid from "./FlowGrid.jsx";

// Variantes de animación idénticas para mantener la consistencia en toda la página
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

export default function SecurityFlow() {
  const Icon = SECURITY_FLOW.icon;

  return (
    <div className="w-full">
      {/* Header Centrado y Animado */}
      <motion.div
        variants={fastStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ ...defaultViewport, once: true }}
        className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center"
      >
        {/* Badge Dinámico */}
        <motion.div
          variants={fastFadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
        >
          <Icon size={14} />
          Capa de Protección Perimetral
        </motion.div>

        {/* Título Dinámico */}
        <motion.h2
          variants={fastFadeUp}
          className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl"
        >
          {SECURITY_FLOW.title}
          <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
            y Control de Accesos
          </span>
        </motion.h2>

        {/* Descripción Dinámica */}
        <motion.p
          variants={fastFadeUp}
          className="mt-3 max-w-2xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
        >
          {SECURITY_FLOW.description}
        </motion.p>
      </motion.div>

      {/* Grid de Tarjetas por Columnas (Configurado a 4 columnas) */}
      <FlowGrid flows={[SECURITY_FLOW]} columns={4} animate={true} />
    </div>
  );
}
