// features/components/MobileFeatures.jsx

import { MetricCard, StatsGrid } from "@/components/card";
import {
  defaultViewport,
  fadeUp,
  hoverScale,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { devices } from "../constants/devices.js";

export default function MobileFeatures() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="space-y-4 lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/50 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]">
              <Smartphone size={16} />
              Responsive Design
            </div>

            <div>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-5xl">
                Trabaja desde
              </h2>

              <h2 className="mt-1 bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent md:text-5xl">
                cualquier dispositivo
              </h2>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-[#334155] dark:text-[#dbe4ee]">
              Compatible con tablets, laptops, celulares y computadoras de
              escritorio para acceder al ERP desde cualquier lugar, manteniendo
              una experiencia rápida y moderna.
            </p>

            <div className="flex gap-8 pt-2">
              <div>
                <p className="text-3xl font-black text-[#274c77] dark:text-[#dbeafe]">
                  4+
                </p>
                <span className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                  Dispositivos
                </span>
              </div>

              <div>
                <p className="text-3xl font-black text-[#274c77] dark:text-[#dbeafe]">
                  100%
                </p>
                <span className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                  Responsive
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="relative lg:col-span-7"
          >
            <motion.div
              whileHover={hoverScale}
              className="relative overflow-hidden rounded-2xl border border-[#d7e0e7] shadow-lg dark:border-white/10"
            >
              <div className="relative h-72 md:h-96">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
                  alt="Mobile ERP"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/40 via-transparent to-white/20 dark:from-[#020617]/50 dark:via-transparent dark:to-white/5" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={smoothTransition}>
              <StatsGrid
                items={devices}
                columns={2}
                CardComponent={MetricCard}
                animate
                gridClassName="mt-6 grid-cols-1 gap-3 lg:grid-cols-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
