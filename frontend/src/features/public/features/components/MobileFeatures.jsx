// features/components/MobileFeatures.jsx
import { MetricCard, StatsGrid } from "@/components/card";
import { Smartphone } from "lucide-react";
import { devices } from "../constants/devices.js";

export default function MobileFeatures() {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* TWO COLUMN LAYOUT */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-center">
          {/* LEFT COLUMN - CONTENT */}
          <div className="lg:col-span-5 space-y-4">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/50 px-4 py-2 text-sm font-semibold text-[#274c77] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]">
              <Smartphone size={16} />
              Responsive Design
            </div>

            {/* TITLE */}
            <div>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-5xl">
                Trabaja desde
              </h2>
              <h2 className="text-4xl font-black leading-tight tracking-tight mt-1 md:text-5xl bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                cualquier dispositivo
              </h2>
            </div>

            {/* DESCRIPTION */}
            <p className="text-base leading-relaxed text-[#334155] dark:text-[#dbe4ee] max-w-xl">
              Compatible con tablets, laptops, celulares y computadoras de
              escritorio para acceder al ERP desde cualquier lugar, manteniendo
              una experiencia rápida y moderna.
            </p>

            {/* STATS */}
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
          </div>

          {/* RIGHT COLUMN - IMAGE + CARDS */}
          <div className="lg:col-span-7 relative">
            {/* IMAGE CONTAINER */}
            <div className="relative rounded-2xl overflow-hidden border border-[#d7e0e7] dark:border-white/10 shadow-lg">
              <div className="relative h-72 md:h-96">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
                  alt="Mobile"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/40 via-transparent to-white/20 dark:from-[#020617]/50 dark:via-transparent dark:to-white/5" />
              </div>
            </div>

            {/* FLOATING DEVICES GRID CON RENDERIZADO ANIMADO */}
            <StatsGrid
              items={devices}
              columns={2}
              CardComponent={MetricCard}
              animate={true}
              gridClassName="mt-6 gap-3 grid-cols-1 lg:grid-cols-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
