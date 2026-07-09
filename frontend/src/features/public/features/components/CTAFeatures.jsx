// features/components/CTAFeatures.jsx

import {
  defaultViewport,
  fadeUp,
  hoverScale,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";

export default function CTAFeatures() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
        className="rounded-[36px] border border-[#d7e0e7] bg-white/10 px-10 py-20 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
      >
        <motion.h2
          variants={fadeUp}
          transition={smoothTransition}
          className="text-4xl font-black text-[#0f172a] dark:text-white sm:text-5xl"
        >
          Lleva tu empresa al siguiente nivel
        </motion.h2>

        <motion.p
          variants={fadeUp}
          transition={smoothTransition}
          className="mt-6 text-lg text-[#5b6472] dark:text-[#cbd5e1]"
        >
          Gestiona todo desde una plataforma moderna.
        </motion.p>

        <motion.button
          variants={fadeUp}
          transition={smoothTransition}
          whileHover={hoverScale}
          whileTap={{ scale: 0.98 }}
          className="mt-10 rounded-2xl bg-[#274c77] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#1f3e61]"
        >
          Comenzar ahora
        </motion.button>
      </motion.div>
    </section>
  );
}
