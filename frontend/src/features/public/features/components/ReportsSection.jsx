// features/components/ReportsSection.jsx
import { MetricCard, StatsGrid } from "@/components/card";
import { variants, viewport } from "@/components/effects";
import { motion } from "framer-motion";
import {
  FileBarChart,
  FileSpreadsheet,
  PieChart,
  TrendingUp,
} from "lucide-react";

export default function ReportsSection() {
  // Extraemos las animaciones correspondientes de tus objetos importados
  // Si tus variantes tienen nombres diferentes dentro de 'variants', cámbialas aquí:
  const staggerAnimation = variants?.fastStagger || variants?.staggerContainer;
  const fadeUpAnimation = variants?.fastFadeUp || variants?.fadeInUp;
  const viewportConfig = viewport?.defaultViewport || {
    once: true,
    amount: 0.2,
  };

  return (
    <section className="relative py-12 max-w-7xl mx-auto px-6 overflow-hidden">
      <motion.div
        variants={staggerAnimation}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
        className="grid items-center gap-10 lg:grid-cols-2"
      >
        {/* LEFT */}
        <motion.div
          variants={fadeUpAnimation}
          className="transition-all duration-500 hover:translate-x-0.5"
        >
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#274c77] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03] dark:text-[#a3cef1] transition-all duration-300 hover:scale-105">
            <TrendingUp
              size={14}
              className="text-[#6096ba] dark:text-[#a3cef1]"
            />
            Reportes Inteligentes
          </div>

          {/* TITLE */}
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-4xl">
            Toma decisiones basadas en datos
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              reportes modernos y dinámicos
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5b6472] dark:text-[#cbd5e1]">
            Genera reportes empresariales, estadísticas avanzadas, exportaciones
            PDF y Excel, dashboards interactivos y métricas en tiempo real.
          </p>

          {/* FEATURES COMPACTAS USANDO TU STATSGRID */}
          <StatsGrid
            items={[
              { icon: FileBarChart, title: "Estadísticas" },
              { icon: PieChart, title: "Dashboards" },
              { icon: FileSpreadsheet, title: "Exportaciones" },
            ]}
            columns={3}
            CardComponent={MetricCard}
            animate={true}
            gridClassName="mt-6 gap-4 sm:grid-cols-3"
          />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={fadeUpAnimation}
          className="group relative overflow-hidden rounded-[24px]"
        >
          {/* LIGHT DE RESPALDO SUTIL */}
          <div className="absolute inset-0 rounded-full bg-[#6096ba]/5 blur-3xl transition-opacity duration-500 group-hover:bg-[#89c2d9]/10" />

          {/* IMAGE CONTAINER */}
          <div className="relative overflow-hidden rounded-2xl border border-[#d7e0e7] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 group-hover:border-[#89c2d9]/40 group-hover:shadow-xl dark:border-white/5">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Reports"
              loading="lazy"
              className="h-[380px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-transparent to-transparent" />

            {/* FLOAT CARD COMPACTA Y MODERNA */}
            <div className="absolute bottom-4 left-4 max-w-[260px] rounded-xl border border-white/20 bg-white/70 p-3 shadow-md backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg dark:border-white/10 dark:bg-[#020617]/75">
              <h4 className="text-xs font-bold text-[#0f172a] dark:text-white">
                Reportes en tiempo real
              </h4>
              <p className="mt-0.5 text-[11px] leading-normal text-[#5b6472] dark:text-[#cbd5e1]">
                Métricas empresariales actualizadas automáticamente.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
