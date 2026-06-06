// features/components/PerformanceSection.jsx

import {
  Rocket,
  Activity,
  Database,
  Gauge,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import { features } from "../constants/performance.js";

export default function PerformanceSection() {
  return (
    <section
      className="
        relative
        py-16
        lg:py-24
        overflow-hidden
      "
    >
      {/* Background Blur - Center */}
      <div
        className="
          absolute
          left-1/2
          top-1/3
          h-96
          w-96
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#a3cef1]/20
          blur-3xl
          pointer-events-none
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* TOP SECTION - CONTENT + METRIC */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-start mb-12">
          {/* LEFT - CONTENT */}
          <div className="lg:col-span-6 space-y-6">
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d7e0e7]
                bg-white/50
                px-4
                py-2
                text-sm
                font-semibold
                text-[#274c77]
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/10
                dark:text-[#dbeafe]
              "
            >
              <Rocket size={16} />
              Alto Rendimiento
            </div>

            {/* TITLE */}
            <div>
              <h2
                className="
                  text-4xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-[#0f172a]
                  dark:text-white
                  md:text-5xl
                "
              >
                Sistema rápido
              </h2>
              <h2
                className="
                  text-4xl
                  font-black
                  leading-tight
                  tracking-tight
                  mt-1
                  md:text-5xl
                  bg-gradient-to-r
                  from-[#274c77]
                  via-[#6096ba]
                  to-[#a3cef1]
                  bg-clip-text
                  text-transparent
                "
              >
                y escalable
              </h2>
            </div>

            {/* DESCRIPTION */}
            <p
              className="
                text-base
                leading-relaxed
                text-[#334155]
                dark:text-[#dbe4ee]
                max-w-lg
              "
            >
              Optimizado para empresas modernas, operaciones en tiempo real y
              grandes volúmenes de información sin perder velocidad, estabilidad
              ni seguridad.
            </p>

            {/* CTA */}
            <button
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-[#0f172a]
                px-6
                py-3
                text-sm
                font-bold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#1e293b]
                dark:bg-white
                dark:text-[#0f172a]
                dark:hover:bg-[#e2e8f0]
              "
            >
              Explorar rendimiento
              <ArrowUpRight size={18} />
            </button>
          </div>

          {/* RIGHT - METRICS CARDS */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div
              className="
                rounded-2xl
                border
                border-[#d7e0e7]
                bg-white/60
                p-5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/10
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-gradient-to-br
                    from-[#6096ba]
                    to-[#274c77]
                    text-white
                  "
                >
                  <TrendingUp size={20} />
                </div>
                <span className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                  Disponibilidad
                </span>
              </div>
              <p className="text-3xl font-black text-[#0f172a] dark:text-white">
                99.9%
              </p>
            </div>

            {/* Metric 2 */}
            <div
              className="
                rounded-2xl
                border
                border-[#d7e0e7]
                bg-white/60
                p-5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/10
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-gradient-to-br
                    from-[#a3cef1]
                    to-[#6096ba]
                    text-white
                  "
                >
                  <Gauge size={20} />
                </div>
                <span className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                  Velocidad
                </span>
              </div>
              <p className="text-3xl font-black text-[#0f172a] dark:text-white">
                x10
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative rounded-2xl overflow-hidden border border-[#d7e0e7] dark:border-white/10 shadow-lg mb-8">
          <div className="relative h-56 md:h-64 lg:h-72">
            <img
              src="https://scansource.com.br/wp-content/uploads/2024/12/06_Funcoes-do-cientista-de-dados-nas-empresas.png"
              alt="Performance"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                hover:scale-110
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#0f172a]/30
                via-transparent
                to-white/10
                dark:from-[#020617]/50
                dark:via-transparent
                dark:to-white/5
              "
            />
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-xl
                  border
                  border-[#d7e0e7]
                  bg-white/60
                  p-4
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:bg-white/80
                  hover:shadow-md
                  hover:-translate-y-1
                  dark:border-white/10
                  dark:bg-white/10
                  dark:hover:bg-white/20
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-gradient-to-br
                    from-[#6096ba]
                    to-[#274c77]
                    text-white
                  "
                >
                  <Icon size={20} />
                </div>

                <h3
                  className="
                    mt-3
                    text-sm
                    font-bold
                    text-[#0f172a]
                    dark:text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-relaxed
                    text-[#475569]
                    dark:text-[#dbe4ee]
                  "
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
