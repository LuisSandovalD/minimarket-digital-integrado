import { Badge, StatsGrid } from "@/components/card";
import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { workflow } from "../constants/workflow";

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const fastFadeUp = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function WorkflowSection() {
  const items = workflow.map((step) => ({
    id: step.step,
    icon: step.icon,
    badge: <Badge variant="info">{step.highlight}</Badge>,
    subtitle: `Paso ${step.step}`,
    title: step.title,
    description: step.description,
  }));

  return (
    <section
      id="workflow"
      className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-8 lg:px-16"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.18, 0.1],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6096ba]/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            <GitBranch size={14} />
            Flujo inteligente
          </motion.div>

          <motion.h2
            variants={fastFadeUp}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl"
          >
            Gestiona tu negocio
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              en pocos pasos
            </span>
          </motion.h2>

          <motion.p
            variants={fastFadeUp}
            className="mt-3 max-w-2xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
          >
            Desde la configuración inicial hasta el análisis de resultados, cada
            etapa del ERP POS está diseñada para simplificar la gestión de tu
            empresa.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
        >
          <StatsGrid
            items={items}
            columns={4}
            animate
            cardClassName="min-h-[250px] rounded-2xl transition-all duration-200 hover:-translate-y-1"
          />
        </motion.div>
      </div>
    </section>
  );
}
