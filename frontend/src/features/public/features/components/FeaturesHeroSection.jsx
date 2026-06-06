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
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { featureHighlights } from "../constants/featureHighlights";

const glowBase = "absolute -z-10 h-96 w-96 rounded-full blur-3xl";

export default function FeaturesHeroSection() {
  return (
    <section className="relative isolate flex items-center justify-center w-full overflow-hidden px-4 py-20 sm:px-6 md:px-8 lg:h-[92vh] lg:px-10">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src={featuresBg}
          alt="ERP Features"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30" />
      </div>

      {/* Glow effects */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`${glowBase} left-0 top-0 bg-[#6096ba]/15`}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`${glowBase} bottom-0 right-0 bg-[#274c77]/10 dark:bg-[#274c77]/30`}
      />

      <div className="w-full max-w-7xl">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-5 py-2.5 text-sm font-semibold tracking-wide text-[#274c77] shadow-lg shadow-[#274c77]/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-[#dbeafe]"
            >
              <ShieldCheck size={16} />
              Funciones Empresariales
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-5xl xl:text-6xl dark:text-white"
            >
              Funciones avanzadas para
              <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#365d86] to-[#6096ba] bg-clip-text text-transparent dark:from-[#a3cef1] dark:via-white dark:to-[#6096ba]">
                empresas modernas
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-[#365d86] dark:text-[#cbd5e1]"
            >
              Optimiza ventas, inventario, compras, clientes, seguridad y
              reportes con herramientas diseñadas para empresas que buscan
              velocidad, control y crecimiento.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {featureHighlights.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeScale}
                  transition={springTransition}
                  whileHover={hoverLift}
                  className="rounded-3xl border border-[#d7e0e7] bg-white/60 p-4 shadow-lg shadow-[#274c77]/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                >
                  <motion.div whileHover={hoverScale}>
                    <Icon
                      size={24}
                      className="text-[#274c77] dark:text-[#a3cef1]"
                    />
                  </motion.div>
                  <h3 className="mt-4 font-bold text-[#0f172a] dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-[#365d86] dark:text-[#cbd5e1]">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#6096ba]/10 blur-3xl" />

            <motion.img
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              transition={{ duration: 0.4 }}
              src={dashboardImage}
              alt="ERP Dashboard"
              className="relative w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
