// features/components/ReportsSection.jsx

import {
  FileBarChart,
  FileSpreadsheet,
  PieChart,
  TrendingUp,
} from "lucide-react";

export default function ReportsSection() {
  return (
    <section className="relative py-20 max-w-7xl mx-auto px-6">
      <div
        className="
          grid
          items-center
          gap-16

          lg:grid-cols-2
        "
      >
        {/* LEFT */}
        <div>
          
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
            <TrendingUp size={16} />

            Reportes Inteligentes
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
            Toma decisiones
            basadas en datos

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
              reportes modernos y dinámicos
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
            Genera reportes empresariales,
            estadísticas avanzadas,
            exportaciones PDF y Excel,
            dashboards interactivos y
            métricas en tiempo real.
          </p>

          {/* FEATURES */}
          <div
            className="
              mt-10

              grid
              gap-4

              sm:grid-cols-3
            "
          >
            {[
              {
                icon: FileBarChart,
                title: "Estadísticas",
              },

              {
                icon: PieChart,
                title: "Dashboards",
              },

              {
                icon: FileSpreadsheet,
                title: "Exportaciones",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    rounded-2xl

                    border
                    border-[#d7e0e7]

                    bg-white/[0.04]
                    p-5

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

                      bg-gradient-to-br
                      from-[#274c77]
                      to-[#6096ba]

                      text-white
                    "
                  >
                    <Icon size={20} />
                  </div>

                  <h3
                    className="
                      mt-4

                      text-sm
                      font-bold

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          
          {/* LIGHT */}
          <div
            className="
              absolute
              inset-0

              rounded-[40px]

              bg-[#6096ba]/10
              blur-3xl
            "
          />

          {/* IMAGE */}
          <div
            className="
              relative
              overflow-hidden

              rounded-[34px]

              border
              border-[#d7e0e7]

              bg-white/[0.04]

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Reports"

              className="
                h-[520px]
                w-full

                object-cover
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-[#020617]/50
                via-transparent
                to-transparent
              "
            />

            {/* FLOAT CARD */}
            <div
              className="
                absolute
                bottom-6
                left-6

                rounded-2xl

                border
                border-white/20

                bg-white/80
                px-5
                py-4

                backdrop-blur-xl

                dark:bg-[#020617]/70
              "
            >
              <h4
                className="
                  text-sm
                  font-bold

                  text-[#0f172a]

                  dark:text-white
                "
              >
                Reportes en tiempo real
              </h4>

              <p
                className="
                  mt-1

                  text-xs

                  text-[#5b6472]

                  dark:text-[#cbd5e1]
                "
              >
                Métricas empresariales
                actualizadas automáticamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}