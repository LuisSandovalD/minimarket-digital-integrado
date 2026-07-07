import {
    defaultViewport,
    fadeUp,
    hoverLift,
    staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { Check, Layers } from "lucide-react";
import { modulesFeatures } from "../constants/modules";

export default function ModulesFeaturesSection() {
  return (
    <section
      id="features-detail"
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:py-24 z-10 bg-slate-50/30 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl">
        {/* ENCABEZADO PRINCIPAL (Estilo Espejo de tu Web) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center transform-gpu"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#274c77] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            <Layers size={14} />
            Características Avanzadas
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl"
          >
            Potencia absoluta para cada área{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              sin configuraciones complejas
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
          >
            Explora a fondo las capacidades técnicas de nuestro ecosistema ERP.
            Herramientas modulares diseñadas para escalar junto con tu volumen
            de negocio.
          </motion.p>
        </motion.div>

        {/* REJILLA DE SECCIONES DETALLADAS (Módulos extendidos) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modulesFeatures.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.article
                key={module.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.4),
                  ease: "easeOut",
                }}
                whileHover={hoverLift}
                className="flex flex-col justify-between h-full rounded-2xl border border-[#274c77]/10 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-white/[0.02] transition-all duration-200 transform-gpu"
              >
                <div>
                  {/* Encabezado de la Tarjeta con Icono e Impacto */}
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#274c77]/5 text-[#274c77] dark:bg-white/5 dark:text-[#a3cef1]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0f172a] dark:text-white">
                          {module.title}
                        </h3>
                        <span className="text-[11px] font-medium text-[#6096ba] dark:text-[#a3cef1]/80">
                          {module.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Beneficio & Descripción */}
                  <div className="mt-4">
                    <p className="text-xs italic font-medium text-[#274c77] dark:text-[#a3cef1] bg-[#274c77]/5 dark:bg-[#274c77]/20 px-2.5 py-1.5 rounded-lg">
                      {module.benefit}
                    </p>
                    <p className="mt-3 text-sm text-[#5b6472] dark:text-[#cbd5e1] leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Lista de Features Checkpoints */}
                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 dark:border-white/5">
                    {module.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-[#5b6472] dark:text-[#cbd5e1]"
                      >
                        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                          <Check size={10} className="stroke-[3]" />
                        </span>
                        <span className="leading-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Métrica de Impacto Analítico en el Footer */}
                <div className="mt-6 pt-3 border-t border-dashed border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-white/[0.01] px-3 py-2 text-xs">
                    <span className="text-[#8b8c89] dark:text-slate-400 font-medium">
                      Impacto estimado:
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                      {module.impact}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
