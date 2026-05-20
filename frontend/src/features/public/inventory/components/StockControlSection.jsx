// inventory/components/StockControlSection.jsx

import {
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Zap,
  ArrowRight,
} from "lucide-react";

import { features } from "../constants/stock";

export default function StockControlSection() {
  

  return (
    <section className="relative isolate overflow-hidden py-24">

      <div className="relative grid gap-10 lg:gap-16 lg:grid-cols-12 items-center  max-w-7xl mx-auto">

        {/*  LEFT  COLUMN - IMAGE + SIDEBAR */}
        <div className="lg:col-span-7 relative">
          {/* MAIN IMAGE */}
          <div
            className="
              relative
              rounded-3xl
              overflow-hidden
              border
              border-[#d7e0e7]
              shadow-xl
              dark:border-white/10
            "
          >
            <div className="relative h-72 md:h-80 lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                alt="Stock Control"
                className="
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
                  from-[#0f172a]/40
                  via-transparent
                  to-white/5
                  dark:from-[#020617]/50
                  dark:via-transparent
                  dark:to-white/5
                "
              />
            </div>
          </div>

          {/* FLOATING STATS SIDEBAR - RIGHT SIDE */}
          <div
            className="
              grid lg:grid-cols-3 gap-3 mt-4
            "
          >
            {/* Stat 1 */}
            <div
              className="
                rounded-2xl
                border
                border-[#d7e0e7]
                bg-white/80
                p-4
                shadow-lg
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.08]
              "
            >
              <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1]">
                Productos registrados
              </p>
              <p className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1] mt-1">
                +50K
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600 dark:text-green-400">
                <TrendingDown size={14} className="rotate-180" />
                <span>En stock</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div
              className="
                rounded-2xl
                border
                border-[#d7e0e7]
                bg-white/80
                p-4
                shadow-lg
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.08]
              "
            >
              <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1]">
                Precisión detectada
              </p>
              <p className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1] mt-1">
                99.8%
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 size={14} />
                <span>Verificado</span>
              </div>
            </div>

            {/* Additional Features */}
            <div
              className="
                rounded-2xl
                border
                border-[#d7e0e7]
                bg-white/50
                p-3
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.05]
              "
            >
              <p className="text-xs font-semibold text-[#6096ba] dark:text-[#a3cef1] mb-2">
                Características
              </p>
              <div className="space-y-1.5">
                {features.slice(2).map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Icon size={14} className="text-[#6096ba] dark:text-[#a3cef1] flex-shrink-0" />
                      <span className="text-[10px] text-[#5b6472] dark:text-[#cbd5e1]">
                        {feature.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

         {/* RIGHT COLUMN - CONTENT */}
        <div className="lg:col-span-5 space-y-6">
          {/* BADGE */}
          <span
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              rounded-full
              bg-[#6096ba]/10
              text-xs
              font-semibold
              text-[#6096ba]
              dark:bg-[#6096ba]/20
              dark:text-[#a3cef1]
            "
          >
            <div className="h-2 w-2 rounded-full bg-[#6096ba]" />
            Stock Inteligente
          </span>

          {/* TITLE */}
          <div>
            <h2
              className="
                text-4xl
                md:text-5xl
                font-black
                leading-tight
                text-[#0f172a]
                dark:text-white
              "
            >
              Control
            </h2>
            <h2
              className="
                text-4xl
                md:text-5xl
                font-black
                leading-tight
                mt-1
                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]
                bg-clip-text
                text-transparent
              "
            >
              preciso
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p
            className="
              text-base
              leading-relaxed
              text-[#5b6472]
              dark:text-[#cbd5e1]
              max-w-lg
            "
          >
            Gestiona entradas, salidas y disponibilidad de productos en tiempo
            real con trazabilidad completa y alertas automáticas.
          </p>

          {/* FEATURES LIST */}
          <div className="space-y-3 pt-2">
            {features.slice(0, 2).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="
                    flex
                    gap-3
                    p-3
                    rounded-lg
                    border
                    border-[#d7e0e7]
                    bg-white/40
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:bg-white/60
                    hover:border-[#6096ba]/30
                    dark:border-white/10
                    dark:bg-white/[0.05]
                    dark:hover:bg-white/10
                  "
                >
                  <Icon
                    size={20}
                    className="
                      flex-shrink-0
                      mt-0.5
                      text-[#6096ba]
                      dark:text-[#a3cef1]
                    "
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0f172a] dark:text-white">
                      {feature.title}
                    </p>
                    <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <button
            className="
              inline-flex
              items-center
              gap-2
              mt-4
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r
              from-[#274c77]
              to-[#6096ba]
              text-white
              text-sm
              font-bold
              transition-all
              duration-300
              hover:shadow-lg
              hover:scale-105
              dark:hover:shadow-[0_0_20px_rgba(96,150,186,0.3)]
            "
          >
            Conocer más detalles
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}