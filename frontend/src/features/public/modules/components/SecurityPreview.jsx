import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

// Importación de constantes y efectos
import {
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { securityFeatures } from "../constants/security";

export default function SecurityPreview() {
  return (
    <section
      id="security-preview"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-24 z-10"
    >
      {/* 🌌 Capas Ambientales Lumínicas de Fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden transform-gpu">
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#6096ba]/10 blur-3xl dark:bg-[#274c77]/10"
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* ========================= HEADER SECTIONS ========================= */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between transform-gpu"
        >
          {/* LADO IZQUIERDO: TÍTULOS */}
          <div className="max-w-3xl text-left">
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#274c77] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
            >
              <ShieldCheck size={14} />
              Seguridad Empresarial
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl dark:text-white"
            >
              Protección avanzada
              <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                para toda tu empresa
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-4 text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1] max-w-2xl"
            >
              Protege información, usuarios, accesos y operaciones con sistemas
              modernos de autenticación, permisos y monitoreo.
            </motion.p>
          </div>

          {/* LADO DERECHO: BANNER COMPACTO DE ASISTENCIA */}
          <div className="flex items-center gap-4 rounded-2xl border border-[#274c77]/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#274c77] text-white">
              <Lock size={18} />
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#0f172a] dark:text-white">
                Accesos seguros
              </h4>
              <p className="text-xs text-[#5b6472] dark:text-[#94a3b8]">
                Protección de usuarios y datos empresariales.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================= GRID DIRECTO DE SECURITY ========================= */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index * 0.05, 0.2),
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#274c77]/10 bg-white/50 p-5 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6096ba]/30 dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#274c77]/5 text-[#274c77] transition-colors group-hover:bg-[#274c77] group-hover:text-white dark:bg-white/5 dark:text-[#a3cef1] dark:group-hover:bg-[#a3cef1] dark:group-hover:text-slate-950">
                      <ShieldCheck size={16} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-black tracking-tight text-[#0f172a] dark:text-white group-hover:text-[#274c77] dark:group-hover:text-[#a3cef1] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#5b6472] dark:text-[#cbd5e1] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                  <span className="text-[11px] font-bold text-[#274c77] dark:text-[#a3cef1]">
                    Módulo Activo
                  </span>
                  <button className="text-xs font-bold text-[#274c77] hover:text-[#6096ba] dark:text-[#a3cef1] transition-colors">
                    Ver más
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
