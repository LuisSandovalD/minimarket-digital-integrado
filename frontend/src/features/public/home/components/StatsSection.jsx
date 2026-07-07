import { StatsGrid } from "@/components/card";
import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { stats } from "../constants/stats";

const icons = [Building2, ShoppingCart, ShieldCheck, TrendingUp];

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const fastFadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function StatsSection() {
  const items = stats.map((item, index) => ({
    id: item.label ?? index,
    icon: icons[index],
    title: item.value,
    subtitle: item.label,
    description: item.description,
  }));

  return (
    <section className="relative z-10 w-full overflow-hidden px-4 py-12 sm:px-6 md:px-8 lg:px-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            <BarChart3 size={14} />
            Plataforma empresarial
          </motion.div>

          <motion.h2
            variants={fastFadeUp}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl"
          >
            Empresas que ya
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              optimizan su negocio
            </span>
          </motion.h2>

          <motion.p
            variants={fastFadeUp}
            className="mt-3 max-w-xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
          >
            Un ERP POS moderno para gestionar ventas, inventario, reportes y
            múltiples sucursales desde un solo sistema.
          </motion.p>
        </motion.div>

        <div className="relative z-20 mt-12">
          <StatsGrid
            items={items}
            columns={4}
            animate
            cardClassName="rounded-2xl !border-[#d7e0e7] !bg-white/40 !p-6 transition-all duration-150 dark:!border-white/10 dark:!bg-white/[0.03]"
          />
        </div>
      </div>
    </section>
  );
}
