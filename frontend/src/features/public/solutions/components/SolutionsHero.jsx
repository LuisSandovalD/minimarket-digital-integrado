import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import {
  Building2,
  ShoppingCart,
  Store,
  Warehouse
} from "lucide-react";

const fastFadeUp = {
  hidden: { opacity: 0, y: 15 },
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

const BUSINESS_TYPES = [
  {
    icon: Store,
    label: "Minimarkets",
  },
  {
    icon: ShoppingCart,
    label: "Retail",
  },
  {
    icon: Warehouse,
    label: "Mayoristas",
  },
  {
    icon: Building2,
    label: "Multi-Sucursal",
  },
];

export default function SolutionsHero() {
  return (
    <section className="relative isolate flex items-center justify-center overflow-hidden px-4 py-14 sm:px-6 md:px-8 lg:h-[75vh] lg:px-10 lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568892/hero-section_jnbdp8.svg"
          alt="Solutions Background"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />

        <div className="absolute inset-0 bg-white/20 dark:bg-black/30" />
      </div>

      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-[#6096ba]/10 blur-[120px] dark:bg-[#6096ba]/5" />
      </div>

      <div className="relative z-10 grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
        {/* Left */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="lg:col-span-7"
        >
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            • Soluciones por Industria
          </motion.div>

          <motion.h1
            variants={fastFadeUp}
            className="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-[#0f172a] dark:text-white sm:text-5xl xl:text-6xl"
          >
            Una plataforma que se adapta
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] to-[#6096ba] bg-clip-text text-transparent dark:from-[#a3cef1] dark:to-[#6096ba]">
              a la forma en que vendes
            </span>
          </motion.h1>

          <motion.p
            variants={fastFadeUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#4a5568] dark:text-[#cbd5e1] sm:text-lg"
          >
            Desde pequeños comercios hasta cadenas con múltiples sucursales.
            Nexora ERP centraliza operaciones, automatiza procesos y proporciona
            información en tiempo real para ayudarte a tomar mejores decisiones.
          </motion.p>

          <motion.div
            variants={fastFadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            {BUSINESS_TYPES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-xl border border-[#274c77]/10 bg-white/60 px-4 py-3 backdrop-blur-md dark:bg-[#0f172a]/60"
                >
                  <Icon className="h-4 w-4 text-[#274c77] dark:text-[#a3cef1]" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 26,
          }}
          className="relative flex justify-center lg:col-span-5 lg:justify-end"
        >
          <div className="absolute inset-0 -z-10 bg-[#6096ba]/5 blur-3xl dark:bg-[#6096ba]/10" />

          <img
            src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568893/hero_banner_vtnpo2.svg"
            alt="Nexora ERP Solutions"
            className="h-auto w-full max-w-md object-contain drop-shadow-[0_20px_50px_rgba(39,76,119,0.15)] lg:max-w-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
