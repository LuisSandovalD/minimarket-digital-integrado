import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

// Assets e importaciones dinámicas de efectos
import featuresBg from "@/assets/imagenes/features/hero/features-bg.svg";
import dashboardImage from "@/assets/imagenes/features/hero/features-dashboard.svg";
import {
  defaultViewport,
  fadeScale,
  fadeUp,
  hoverLift,
  hoverScale,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects";
import { featureHighlights } from "../constants/featureHighlights";

const glowBase =
  "absolute -z-10 h-80 w-80 rounded-full blur-3xl transform-gpu pointer-events-none";

export default function FeaturesHeroSection() {
  return (
    <section className="relative isolate flex items-center justify-center w-full overflow-hidden px-4 py-16 sm:px-6 md:px-8 lg:min-h-[75vh] lg:py-12 lg:px-10 z-10">
      {/* 🌌 Capas de Fondo y Gradiantes de Estructura */}
      <div className="absolute inset-0 -z-20 transform-gpu">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={featuresBg}
          alt="ERP Features Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
      </div>

      {/* 🌌 Capas Ambientales Lumínicas de Fondo (Glows adaptados a 75vh) */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className={`${glowBase} -left-10 -top-10 bg-[#6096ba]/15`}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className={`${glowBase} -bottom-10 -right-10 bg-[#274c77]/10 dark:bg-[#274c77]/25`}
      />

      <div className="w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LADO IZQUIERDO: TEXTO Y CONTENIDO PRINCIPAL */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col transform-gpu text-left"
          >
            {/* BADGE */}
            <div>
              <motion.div
                variants={fadeUp}
                transition={smoothTransition}
                className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#274c77] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#dbeafe]"
              >
                <ShieldCheck size={14} />
                Funciones Empresariales
              </motion.div>
            </div>

            {/* TITLE */}
            <motion.h1
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#0f172a] sm:text-4xl xl:text-5xl dark:text-white"
            >
              Funciones avanzadas para
              <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#365d86] to-[#6096ba] bg-clip-text text-transparent dark:from-[#a3cef1] dark:via-white dark:to-[#6096ba]">
                empresas modernas
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-4 text-sm leading-relaxed text-[#365d86] dark:text-[#cbd5e1] max-w-xl sm:text-base"
            >
              Optimiza ventas, inventario, compras, clientes, seguridad y
              reportes con herramientas diseñadas para empresas que buscan
              velocidad, control y crecimiento.
            </motion.p>

            {/* GRID INTERNO DE HIGHLIGHTS */}
            <motion.div
              variants={staggerContainer}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {featureHighlights.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeScale}
                  transition={springTransition}
                  whileHover={hoverLift}
                  className="rounded-2xl border border-[#274c77]/10 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-[#6096ba]/30 dark:border-white/5 dark:bg-white/[0.02]"
                >
                  <motion.div whileHover={hoverScale} className="inline-block">
                    <Icon
                      size={18}
                      className="text-[#274c77] dark:text-[#a3cef1]"
                    />
                  </motion.div>
                  <h3 className="mt-2 text-sm font-bold tracking-tight text-[#0f172a] dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs text-[#5b6472] dark:text-[#cbd5e1] leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* LADO DERECHO: DASHBOARD MOCKUP / IMAGEN PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative transform-gpu lg:mt-0 mt-8"
          >
            {/* Resplandor trasero */}
            <div className="absolute inset-0 bg-[#6096ba]/10 blur-3xl pointer-events-none rounded-[24px]" />

            <div className="overflow-hidden rounded-[24px] border border-[#274c77]/10 bg-white/30 p-1.5 shadow-xl backdrop-blur-sm dark:border-white/5 dark:bg-black/10">
              <div className="overflow-hidden rounded-[18px]">
                <motion.img
                  whileHover={{ scale: 1.015, rotate: 0.1 }}
                  transition={{ duration: 0.3 }}
                  src={dashboardImage}
                  alt="ERP Dashboard Analytics Preview"
                  className="w-full h-full object-cover shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
