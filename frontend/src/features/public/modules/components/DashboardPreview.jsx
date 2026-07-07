import { motion } from "framer-motion";
import { Activity, BarChart3, CheckCircle2, Terminal } from "lucide-react";

import { StatsGrid } from "@/components/card";
import { hoverLift } from "@/components/effects";
import { dashboards } from "../constants/dashboards";

export default function DashboardPreview() {
  return (
    <section
      id="dashboard-preview"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-28 z-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 md:gap-20">
          {/* ========================= FILA 1: TEXTOS Y CARDS ========================= */}
          <div className="flex flex-col w-full transform-gpu">
            {/* ENCABEZADO CENTRADO */}
            <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#274c77] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
              >
                <BarChart3 size={14} className="animate-pulse" />
                Dashboard Inteligente
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl dark:text-white"
              >
                Visualiza toda tu empresa{" "}
                <span className="block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                  desde un solo panel
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-4 text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1] max-w-2xl"
              >
                Monitorea ventas, inventario, ingresos, usuarios y estadísticas
                críticas desde un único ecosistema analítico moderno y de alto
                rendimiento.
              </motion.p>
            </div>

            {/* CUADRÍCULA DE TARJETAS HORIZONTALES */}
            <div className="mt-4 w-full">
              <StatsGrid
                items={dashboards}
                cardVariant="transparent"
                animate={true}
                gridClassName="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 gap-5"
                cardClassName="h-full !border-[#274c77]/10 bg-white !p-6 dark:!border-white/5 dark:bg-white/[0.02] rounded-2xl transition-all duration-200 hover:shadow-md hover:border-[#274c77]/20 dark:hover:border-white/10"
              />
            </div>
          </div>

          {/* ========================= FILA 2: ENTORNO MAC / PREVIEW DE PRESTIGIO ========================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full transform-gpu p-2 sm:p-4 rounded-3xl bg-slate-200/40 border border-slate-200/60 dark:bg-white/[0.01] dark:border-white/5 backdrop-blur-sm shadow-2xl"
          >
            {/* Cabecera Tipo Navegador / Mac App */}
            <div className="flex items-center justify-between px-4 pb-3 pt-1 border-b border-slate-300/50 dark:border-white/5 mb-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 block" />
                <span className="w-3 h-3 rounded-full bg-[#eab308]/80 block" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 block" />
              </div>
              <div className="rounded-lg bg-white/40 dark:bg-white/5 border border-slate-300/30 dark:border-white/5 px-8 py-0.5 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <Terminal size={10} /> erp-panel.cloud/analytics
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Contenedor Interno de la Imagen */}
            <div className="overflow-hidden rounded-xl border border-slate-300/40 dark:border-white/5 bg-slate-950 w-full relative group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                alt="ERP Dashboard Preview"
                className="h-[360px] sm:h-[460px] md:h-[520px] w-full select-none object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.015] pointer-events-none"
              />
              {/* Overlay sutil degradado sobre la imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 🔴 TARJETA FLOTANTE IZQUIERDA: Tiempo Real */}
            <motion.div
              whileHover={hoverLift}
              className="absolute -bottom-4 left-4 md:left-8 flex items-center gap-3 rounded-xl border border-white/40 bg-white/80 p-3.5 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-[#0f172a]/90 transform-gpu"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#274c77] text-white shadow-sm shadow-[#274c77]/30">
                <Activity size={16} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0f172a] dark:text-white">
                  Tiempo Real
                </h4>
                <p className="text-[11px] font-medium text-[#5b6472] dark:text-[#cbd5e1]">
                  Sincronizado en milisegundos
                </p>
              </div>
            </motion.div>

            {/* 🟢 TARJETA FLOTANTE DERECHA: Estado Operativo */}
            <motion.div
              whileHover={hoverLift}
              className="absolute -top-4 right-4 md:right-8 hidden sm:flex items-center gap-3 rounded-xl border border-emerald-500/10 bg-white/90 p-3 shadow-xl backdrop-blur-lg dark:border-emerald-500/10 dark:bg-[#0f172a]/90 transform-gpu"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                <CheckCircle2 size={14} className="stroke-[2.5]" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-emerald-400">
                <span>Servidores Operativos</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
