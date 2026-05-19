// inventory/components/AlertsSection.jsx

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  Bell,
  X,
  ArrowRight,
} from "lucide-react";

import { alerts } from "../constants/alerts"

export default function AlertsSection() {
  return (
    <section className="relative py-8 lg:py-12">

      <div className="relative space-y-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-3xl">
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
            <div className="h-2 w-2 rounded-full bg-[#6096ba] animate-pulse" />
            Alertas en tiempo real
          </span>

          {/* TITLE */}
          <h2
            className="
              mt-4
              text-4xl
              md:text-5xl
              font-black
              leading-tight
              text-[#0f172a]
              dark:text-white
            "
          >
            Mantente informado
            <span
              className="
                block
                mt-2
                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]
                bg-clip-text
                text-transparent
              "
            >
              con notificaciones inteligentes
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              text-base
              leading-relaxed
              text-[#5b6472]
              dark:text-[#cbd5e1]
              max-w-2xl
            "
          >
            Recibe notificaciones en tiempo real sobre cambios en inventario,
            nuevos pedidos, recomendaciones de reorden y eventos importantes.
          </p>
        </div>

        {/* ALERTS GRID */}
        <div className="grid gap-4 lg:grid-cols-2">
          {alerts.map((alert) => {
            const AlertIcon = alert.icon;

            return (
              <div
                key={alert.id}
                className={`
                  group
                  relative
                  overflow-hidden
                  p-4
                  lg:p-5
                  rounded-2xl
                  border-2
                  transition-all
                  duration-300
                  hover:shadow-lg
                  hover:-translate-y-1
                  dark:hover:shadow-[0_10px_30px_rgba(96,150,186,0.2)]
                  ${alert.bgColor}
                  ${alert.borderColor}
                  dark:bg-white/[0.03]
                  dark:border-white/10
                  dark:hover:bg-white/[0.08]
                `}
              >
                {/* BACKGROUND ACCENT */}
                <div
                  className={`
                    absolute
                    -right-12
                    -bottom-12
                    h-32
                    w-32
                    rounded-full
                    bg-gradient-to-br
                    ${alert.color}
                    opacity-5
                    blur-2xl
                    transition-all
                    duration-300
                    group-hover:scale-150
                  `}
                />

                {/* CONTENT */}
                <div className="relative z-10 space-y-3">
                  {/* TOP ROW */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`
                        flex-shrink-0
                        h-10
                        w-10
                        rounded-lg
                        bg-gradient-to-br
                        ${alert.color}
                        flex
                        items-center
                        justify-center
                        text-white
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      `}
                    >
                      <AlertIcon size={20} />
                    </div>

                    <button
                      className="
                        flex-shrink-0
                        h-7
                        w-7
                        rounded-md
                        flex
                        items-center
                        justify-center
                        text-[#5b6472]
                        hover:bg-white/50
                        transition-colors
                        dark:text-[#cbd5e1]
                        dark:hover:bg-white/10
                      "
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="space-y-1">
                    <h3
                      className="
                        font-bold
                        text-[#0f172a]
                        dark:text-white
                        line-clamp-2
                      "
                    >
                      {alert.title}
                    </h3>
                    <p
                      className="
                        text-sm
                        text-[#5b6472]
                        dark:text-[#cbd5e1]
                        line-clamp-2
                      "
                    >
                      {alert.description}
                    </p>
                  </div>
                </div>

                {/* TOP BORDER ACCENT */}
                <div
                  className={`
                    absolute
                    top-0
                    left-0
                    h-1
                    w-0
                    bg-gradient-to-r
                    ${alert.color}
                    transition-all
                    duration-500
                    group-hover:w-full
                  `}
                />
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}