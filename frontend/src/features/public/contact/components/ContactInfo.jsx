import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { CONTACT_INFO } from "../constants/contactData";

// Variantes estáticas optimizadas para ejecución fluida en GPU
const fastFadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 pt-24 pb-6 sm:px-6 md:px-8 lg:px-10 z-10">
      <motion.div
        variants={fastStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ ...defaultViewport, once: true }}
        className="flex flex-col gap-10 w-full items-center text-center mx-auto transform-gpu"
      >
        {/* ================= CABECERA DE BLOQUE COMPLETAMENTE CENTRADA ================= */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Badge Adaptable */}
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1] shadow-inner backdrop-blur-xl"
          >
            <MessageSquare size={12} strokeWidth={2.5} />
            Canales de Atención Directa
          </motion.div>

          {/* Título */}
          <motion.h2
            variants={fastFadeUp}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl lg:text-5xl"
          >
            Hablemos de tu{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              negocio
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            variants={fastFadeUp}
            className="text-pretty text-base leading-relaxed text-slate-600 dark:text-[#cbd5e1]/70"
          >
            Nuestro equipo te ayuda a configurar Nexora para tu operación. Agenda una demo o escríbenos por el canal que
            prefieras.
          </motion.p>
        </div>

        {/* ================= REJILLA DE TARJETAS EN COLUMNAS (GRID) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
          {CONTACT_INFO.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={fastFadeUp}
                whileHover={{ y: -2 }}
                className="group flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/40 backdrop-blur-md p-6 transition-all duration-300 hover:bg-slate-50/80 hover:border-[#6096ba]/30 shadow-sm hover:shadow-md dark:border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03] dark:hover:border-white/10 transform-gpu"
              >
                {/* Contenedor del Icono Interactivo Centrado */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#274c77]/5 text-[#274c77] dark:bg-[#a3cef1]/10 dark:text-[#a3cef1] transition-all duration-300 group-hover:bg-[#274c77] group-hover:text-white dark:group-hover:bg-[#6096ba] dark:group-hover:text-slate-950 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>

                {/* Textos descriptivos Centrados */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {item.label}
                  </p>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-200 transition-colors duration-300 group-hover:text-[#274c77] dark:group-hover:text-[#a3cef1]">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
