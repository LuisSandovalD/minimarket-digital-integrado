// features/components/IntegrationsFeatures.jsx
import { MetricCard, StatsGrid } from "@/components/card";
import { Globe } from "lucide-react";
import { integrations } from "../constants/integrations.js";

export default function IntegrationsFeatures() {
  return (
    <section className="relative py-12">
      {/* Background Blur */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="mb-12 max-w-3xl">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/50 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]">
            <Globe size={16} />
            Integraciones Empresariales
          </div>

          {/* TITLE */}
          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-5xl">
            Compatible con
            <span className="block mt-2 bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              múltiples plataformas
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#334155] dark:text-[#dbe4ee] md:text-lg">
            Integra pagos digitales, APIs empresariales, SUNAT, códigos QR,
            impresoras y herramientas modernas para optimizar toda la operación
            de tu negocio.
          </p>
        </div>

        {/* IMAGE SECTION - COMPACT */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-[#d7e0e7] dark:border-white/10 shadow-lg">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Integrations"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>

        {/* FEATURES GRID ANIMADO */}
        <StatsGrid
          items={integrations}
          columns={4}
          CardComponent={MetricCard}
          animate={true}
          gridClassName="md:grid-cols-2 lg:grid-cols-4"
        />
      </div>
    </section>
  );
}
