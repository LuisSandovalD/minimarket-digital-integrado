import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
// Importación desde tu carpeta centralizada de constantes
import { dashboardFeatures } from "../constants/dashboard";

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fastFadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function DashboardPreviewSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-8 lg:px-16 z-10">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
        {/* BLOQUE IZQUIERDO: TEXTOS Y CARACTERÍSTICAS (Ocupa 5 de 12 columnas) */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="lg:col-span-5 transform-gpu relative z-20"
        >
          {/* BADGE ATÓMICO */}
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            <ShieldCheck size={14} />
            Dashboard ERP
          </motion.div>

          {/* TÍTULO PRINCIPAL */}
          <motion.h2
            variants={fastFadeUp}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl leading-tight"
          >
            Todo el control
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              en un solo panel
            </span>
          </motion.h2>

          {/* DESCRIPCIÓN */}
          <motion.p
            variants={fastFadeUp}
            className="mt-3 max-w-xl text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]"
          >
            Visualiza ventas, inventario, ingresos, reportes y el rendimiento de
            todas tus sucursales desde una única plataforma moderna y rápida.
          </motion.p>

          {/* MINI-GRID INTERNO DE CARACTERÍSTICAS */}
          <motion.div
            variants={fastStagger}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {dashboardFeatures.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.text}
                  variants={fastFadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-2xl border border-[#274c77]/10 bg-transparent p-4 transition-all duration-200 dark:border-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#274c77] to-[#6096ba] text-white shadow-md">
                    <Icon size={18} />
                  </div>

                  <span className="text-sm font-bold text-[#274c77] dark:text-[#a3cef1]">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* BLOQUE DERECHO: DETALLE VISUAL DEL DASHBOARD (Ocupa 7 de 12 columnas) */}
        <motion.div
          variants={fastFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="lg:col-span-7 relative z-30 w-full"
        >
          {/* Sombra difusa trasera */}
          <div className="absolute inset-0 rounded-[36px] bg-[#6096ba]/10 blur-3xl dark:bg-[#6096ba]/5" />

          {/* Contenedor de la Imagen Mockup */}
          <motion.div
            whileHover={{ y: -4, scale: 1.005 }}
            transition={{ duration: 0.25 }}
            className="group relative overflow-hidden rounded-[32px] border border-[#274c77]/10 bg-transparent shadow-2xl shadow-[#274c77]/5 dark:border-white/5 transform-gpu"
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Dashboard ERP"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-1.02"
              loading="lazy"
            />

            {/* FLOTANTE METRIC DE CRECIMIENTO */}
            <div className="absolute bottom-5 left-5 rounded-2xl border border-[#274c77]/10 bg-white/90 p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#020617]/80 z-20">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6096ba] dark:text-[#a3cef1]">
                Rendimiento general
              </p>
              <h4 className="mt-1 text-2xl font-black text-[#0f172a] dark:text-white leading-none">
                +24%
              </h4>
              <p className="mt-1 text-[11px] font-medium text-[#5b6472] dark:text-[#cbd5e1]">
                Crecimiento mensual
              </p>
            </div>

            {/* PÍLDORA FLOTANTE DEL SISTEMA */}
            <div className="absolute right-5 top-5 rounded-xl bg-[#274c77] px-3 py-1.5 text-xs font-bold text-white shadow-lg z-20">
              ERP POS
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
