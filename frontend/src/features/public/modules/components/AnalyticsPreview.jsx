// models/components/AnalyticsPreview.jsx

import {
  BarChart3,
  TrendingUp,
  PieChart,
} from "lucide-react";

import {
  analytics,
} from "../constants/analytics";

import ERPPreviewCard from "./ERPPreviewCard";

export default function AnalyticsPreview() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            gap-8

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#d7e0e7]

                bg-white/10
                px-4
                py-2

                text-sm
                font-semibold

                text-[#274c77]

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-[#a3cef1]
              "
            >
              <BarChart3 size={16} />

              Analíticas Inteligentes
            </div>

            {/* TITLE */}
            <h2
              className="
                mt-7

                text-4xl
                font-black
                leading-tight
                tracking-tight

                text-[#0f172a]

                dark:text-[#e7ecef]

                md:text-5xl
              "
            >
              Decisiones empresariales
              <span
                className="
                  mt-2
                  block

                  bg-gradient-to-r
                  from-[#274c77]
                  via-[#6096ba]
                  to-[#a3cef1]

                  bg-clip-text
                  text-transparent
                "
              >
                basadas en datos reales
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-7
                max-w-2xl

                text-base
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]

                md:text-lg
              "
            >
              Analiza ventas,
              ingresos, rendimiento,
              productos y tendencias
              desde dashboards modernos
              y reportes inteligentes.
            </p>
          </div>

          {/* RIGHT INFO */}
          <div
            className="
              flex
              items-center
              gap-4

              rounded-2xl

              border
              border-[#d7e0e7]

              bg-white/10
              px-5
              py-4

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-xl

                bg-[#274c77]
                text-white
              "
            >
              <TrendingUp size={22} />
            </div>

            <div>
              <h4
                className="
                  text-sm
                  font-bold

                  text-[#0f172a]

                  dark:text-white
                "
              >
                Reportes avanzados
              </h4>

              <p
                className="
                  text-xs

                  text-[#5b6472]

                  dark:text-[#cbd5e1]
                "
              >
                Métricas y estadísticas
                en tiempo real.
              </p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div
          className="
            mt-16

            grid
            gap-8

            md:grid-cols-4
          "
        >
          {analytics.map((item, index) => (
            <ERPPreviewCard
              key={index}
              {...item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}