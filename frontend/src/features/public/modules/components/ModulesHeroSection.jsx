import { motion } from "framer-motion";

import {
  BarChart3,
  Boxes,
  Building2,
  Database,
  ShieldCheck,
} from "lucide-react";

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

import dashboardImage from "@/assets/imagenes/modules/hero/dashboard-modules.svg";
import heroBackground from "@/assets/imagenes/modules/hero/modules-hero-bg.svg";

const modulesFeatures = [
  {
    icon: BarChart3,
    title: "Analíticas",
    desc: "KPIs y reportes en tiempo real",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad",
    desc: "Roles, permisos y auditoría",
  },
  {
    icon: Building2,
    title: "Multiempresa",
    desc: "Gestiona múltiples negocios",
  },
  {
    icon: Database,
    title: "Inventario",
    desc: "Control inteligente de stock",
  },
];

export default function ModulesHeroSection() {
  return (
    <section
      className="
        relative isolate
        flex items-center justify-center
        w-full overflow-hidden
        px-4 py-14
        sm:px-6 md:px-8
        lg:h-[92vh] lg:py-0 lg:px-10
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src={heroBackground}
          alt="ERP Modules"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30" />
      </div>

      {/* GLOW EFFECTS */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-[#6096ba]/15 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-[#274c77]/10 blur-3xl dark:bg-[#274c77]/30"
      />

      <div className="w-full max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* BADGE */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-5 py-2.5 text-sm font-semibold tracking-wide text-[#274c77] shadow-lg shadow-[#274c77]/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-[#dbeafe]"
            >
              <Boxes size={16} />
              Módulos ERP Inteligentes
            </motion.div>

            {/* TITLE */}
            <motion.h2
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-5xl xl:text-6xl dark:text-white"
            >
              Explora todos los módulos
              <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#365d86] to-[#6096ba] bg-clip-text text-transparent dark:from-[#a3cef1] dark:via-white dark:to-[#6096ba]">
                que impulsan tu negocio
              </span>
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-4 max-w-2xl text-base leading-relaxed text-[#365d86] dark:text-[#cbd5e1]"
            >
              Descubre una colección completa de módulos diseñados para
              administrar ventas, inventario, compras, clientes, reportes,
              sucursales y mucho más desde una sola plataforma.
            </motion.p>

            {/* FEATURES */}
            <motion.div
              variants={staggerContainer}
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              {modulesFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeScale}
                    transition={springTransition}
                    whileHover={hoverLift}
                    className="rounded-2xl border border-[#d7e0e7] bg-white/60 p-3.5 shadow-lg shadow-[#274c77]/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                  >
                    <motion.div whileHover={hoverScale}>
                      <Icon
                        size={22}
                        className="text-[#274c77] dark:text-[#a3cef1]"
                      />
                    </motion.div>
                    <h3 className="mt-2.5 font-bold text-[#0f172a] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#365d86] dark:text-[#cbd5e1]">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full"
          >
            <motion.img
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              transition={{ duration: 0.4 }}
              src={dashboardImage}
              alt="ERP Dashboard"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
