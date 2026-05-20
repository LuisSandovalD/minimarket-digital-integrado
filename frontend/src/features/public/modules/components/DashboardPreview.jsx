// models/components/DashboardPreview.jsx

import { BarChart3, Activity, TrendingUp, ShieldCheck } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="relative py-20 max-w-7xl mx-auto">
      <div
        className="
          grid
          items-center
          gap-14

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
            <BarChart3 size={16} />
            Dashboard Inteligente
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
            Visualiza toda tu empresa
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
              desde un solo panel
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
            Monitorea ventas, inventario, ingresos, usuarios y estadísticas en
            tiempo real desde una interfaz moderna.
          </p>

          {/* MINI CARDS */}
          <div
            className="
              mt-10

              grid
              gap-4

              sm:grid-cols-2
            "
          >
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
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-[#274c77]
                  text-white
                "
              >
                <TrendingUp size={20} />
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
                  Analíticas
                </h4>

                <p
                  className="
                    text-xs

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  Métricas en tiempo real
                </p>
              </div>
            </div>

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
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-[#6096ba]
                  text-white
                "
              >
                <ShieldCheck size={20} />
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
                  Seguridad
                </h4>

                <p
                  className="
                    text-xs

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  Protección avanzada
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div
            className="
              overflow-hidden

              rounded-[30px]

              border
              border-[#d7e0e7]

              dark:border-white/10
            "
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="ERP Dashboard"
              className="
                h-[500px]
                w-full

                object-cover
              "
            />
          </div>

          {/* FLOAT CARD */}
          <div
            className="
              absolute
              bottom-5
              left-5

              flex
              items-center
              gap-3

              rounded-2xl

              border
              border-white/20

              bg-white/80
              px-4
              py-3

              backdrop-blur-xl

              dark:bg-[#020617]/80
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-xl

                bg-[#274c77]
                text-white
              "
            >
              <Activity size={18} />
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
                Tiempo Real
              </h4>

              <p
                className="
                  text-xs

                  text-[#5b6472]

                  dark:text-[#cbd5e1]
                "
              >
                Datos actualizados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
