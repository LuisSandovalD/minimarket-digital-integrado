import {
  fadeScale,
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { Boxes } from "lucide-react";
import { modulesFeatures } from "../constants/modules";

export default function ModulesHeroSection() {
  return (
    <section className="relative isolate flex items-center justify-center w-full overflow-hidden px-4 py-14 sm:px-6 md:px-8 lg:h-[75vh] lg:py-0 lg:px-10 z-10">
      {/* BACKGROUND OPTIMIZADO */}
      <div className="absolute inset-0 -z-20 transform-gpu">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568898/modules-hero-bg_pp6mlh.svg"
          alt="ERP Modules"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30" />
      </div>

      {/* CAPAS DE LUZ ULTRA-SUAVE (GLOW EFFECTS) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden transform-gpu">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#6096ba]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#274c77]/10 blur-[120px] dark:bg-[#274c77]/20" />
      </div>

      <div className="w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LADO IZQUIERDO: CONTENIDO COMPACTO */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="transform-gpu flex flex-col justify-center"
          >
            {/* BADGE UNIFICADO */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#274c77]/10 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#274c77] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
            >
              <Boxes size={14} />
              Módulos ERP Inteligentes
            </motion.div>

            {/* TÍTULO PRINCIPAL */}
            <motion.h2
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-5xl xl:text-6.5xl dark:text-white"
            >
              Explora los módulos
              <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#365d86] to-[#6096ba] bg-clip-text text-transparent dark:from-[#a3cef1] dark:via-white dark:to-[#6096ba]">
                que impulsan tu negocio
              </span>
            </motion.h2>

            {/* DESCRIPCIÓN */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
            >
              Descubre una colección completa de herramientas integradas para
              administrar cada área de tu empresa desde un único ecosistema
              nativo de alto rendimiento.
            </motion.p>

            {/* SECCIÓN COMPACTADA: Mención rápida en micro-badges */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#274c77]/70 dark:text-[#a3cef1]/70 mb-3">
                Áreas principales incluidas:
              </p>
              <div className="flex flex-wrap gap-2 max-w-xl">
                {modulesFeatures.map((item, index) => {
                  const Icon = item.icon || Boxes;
                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeScale}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#274c77]/10 bg-white/40 px-3 py-1.5 text-xs font-medium text-[#0f172a] backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-200"
                    >
                      <Icon
                        size={12}
                        className="text-[#274c77] dark:text-[#a3cef1]"
                      />
                      <span>{item.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* LADO DERECHO: DASHBOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex items-center justify-center w-full lg:h-full transform-gpu"
          >
            <motion.img
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568895/dashboard-modules_hr8pcj.svg"
              alt="ERP Dashboard Preview"
              className="w-full h-auto max-h-[40vh] lg:max-h-[55vh] object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
