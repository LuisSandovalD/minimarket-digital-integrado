import { MetricCard } from "@/components/card";
import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SOLUTIONS } from "../constants/solutionsData.js";

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const fastFadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function SolutionsGrid() {
  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 py-24 sm:px-6 md:px-8 lg:px-10 z-10">
      {/* Luz ambiental sutil centrada simétrica corporativa */}
      <div className="pointer-events-none absolute inset-0 -z-10 transform-gpu opacity-30 dark:opacity-25">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#6096ba]/10 dark:bg-primary/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl w-full flex flex-col items-center">
        {/* ================= ENCABEZADO DE SECCIÓN PRINCIPAL (PATRÓN CENTRADO) ================= */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center transform-gpu gap-4 mb-20"
        >
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1] shadow-inner backdrop-blur-xl"
          >
            Ecosistema a tu medida
          </motion.div>

          <motion.h2
            variants={fastFadeUp}
            className="text-balance text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl lg:text-5xl"
          >
            Soluciones adaptadas al{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              giro de tu negocio
            </span>
          </motion.h2>

          <motion.p
            variants={fastFadeUp}
            className="text-pretty text-base leading-relaxed text-slate-600 dark:text-[#cbd5e1] max-w-2xl"
          >
            No importa el tamaño o sector de tu empresa. Nuestra plataforma se moldea para optimizar tus flujos de
            trabajo, automatizar el control y acelerar tus ventas.
          </motion.p>
        </motion.div>

        {/* ================= REJILLA SIMÉTRICA DE 3 COLUMNAS (6 TARJETAS) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl relative z-20">
          {SOLUTIONS.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: Math.min((i % 3) * 0.06, 0.3),
              }}
              className="group h-full transform-gpu"
            >
              <MetricCard
                variant="transparent"
                icon={solution.icon}
                className="h-full border border-slate-200/70 bg-slate-50/40 backdrop-blur-md !p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50/80 hover:border-[#6096ba]/30 shadow-sm hover:shadow-md dark:!border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03] dark:hover:border-white/10"
              >
                {/* Contenido estructural interno sin imagen conceptual, optimizado para puntos clave */}
                <div className="-mt-4 flex flex-col h-full text-left">
                  {/* Título y descripción */}
                  <div className="space-y-2 mb-6 flex-1">
                    <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#274c77] dark:group-hover:text-[#a3cef1] transition-colors duration-200">
                      {solution.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-[#cbd5e1]/70">
                      {solution.description}
                    </p>
                  </div>

                  {/* Listado inferior de puntos con el icono Check corporativo */}
                  <div className="border-t border-slate-100 dark:border-white/5 pt-5 space-y-3">
                    {solution.points?.map((point) => (
                      <div key={point} className="flex gap-3 items-center">
                        <div className="text-[#6096ba] dark:text-[#a3cef1] shrink-0 p-0.5 rounded-md bg-slate-100 dark:bg-white/5">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MetricCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
