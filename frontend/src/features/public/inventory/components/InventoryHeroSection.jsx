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
import { BarChart3, Boxes, PackageCheck, Warehouse } from "lucide-react";

const statsCards = [
  { icon: PackageCheck, title: "Stock" },
  { icon: Warehouse, title: "Almacenes" },
  { icon: BarChart3, title: "Reportes" },
];

export default function InventoryHeroSection() {
  return (
    <section className="relative isolate flex justify-center items-center w-full p-4 lg:h-[92vh] md:h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568930/inventory-hero-bg_jbwxpa.svg"
          alt="Inventory"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/80 dark:from-[#020617]/95 dark:via-[#0f172a]/90 dark:to-[#274c77]/70" />
      </div>

      {/* Glow effects */}
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

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-[#a3cef1]"
            >
              <Boxes size={16} />
              Gestión Inteligente de Inventario
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-7 text-5xl font-black leading-tight text-[#0f172a] dark:text-white md:text-6xl"
            >
              Controla tu stock
              <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                en tiempo real
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
            >
              Gestiona productos, almacenes, movimientos, alertas de stock y
              reportes desde una plataforma moderna, rápida y totalmente
              centralizada.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {statsCards.map(({ icon: Icon, title }) => (
                <motion.div
                  key={title}
                  variants={fadeScale}
                  transition={springTransition}
                  whileHover={hoverLift}
                  className="rounded-2xl border border-[#d7e0e7] bg-white/60 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <motion.div
                    whileHover={hoverScale}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#274c77] text-white"
                  >
                    <Icon size={20} />
                  </motion.div>
                  <h3 className="mt-4 font-bold text-[#0f172a] dark:text-white">
                    {title}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.img
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              transition={{ duration: 0.4 }}
              src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568893/inventory-hero-dashboard_ltt7vr.svg"
              alt="Inventory"
              className="w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
