// inventory/components/InventoryAnalytics.jsx

import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const analyticsCards = [
  {
    title: "Ventas",
    value: "+28%",
    description: "Incremento mensual",
    icon: TrendingUp,
  },
  {
    title: "Rotación",
    value: "94%",
    description: "Productos activos",
    icon: Activity,
  },
  {
    title: "Inventario",
    value: "1.2K",
    description: "Items registrados",
    icon: BarChart3,
  },
];

export default function InventoryAnalytics() {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-8
        py-16
        
        lg:px-14
      "
    >

      <div
        className="
          relative
          z-10

          grid
          items-center
          gap-16

          lg:grid-cols-2
          max-w-7xl 
          mx-auto
        "
      >
        {/* LEFT CONTENT */}
        <div className="">
          <span
            className="

              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-cyan-200

              bg-cyan-50

              px-4
              py-1.5

              text-sm
              font-semibold

              text-cyan-700

              dark:border-cyan-500/20
              dark:bg-cyan-500/10
              dark:text-cyan-300
            "
          >
            <PieChart size={16} />
            Analíticas Inteligentes
          </span>

          <h2
            className="
              mt-6

              text-4xl
              font-black
              leading-tight

              text-slate-900

              dark:text-white

              md:text-5xl
            "
          >
            Datos y métricas
            <br />
            empresariales
            <span
                className="
                  block

                  bg-gradient-to-r
                  from-[#274c77]
                  via-[#6096ba]
                  to-[#a3cef1]

                  bg-clip-text
                  text-transparent
                "
              >
              en tiempo real
            </span>
          </h2>

          <p
            className="
              mt-6

              max-w-xl

              text-lg
              leading-relaxed

              text-slate-600

              dark:text-slate-400
            "
          >
            Visualiza productos más vendidos, niveles de stock,
            rotación de inventario y rendimiento operativo desde
            dashboards modernos y totalmente dinámicos.
          </p>

          {/* STATS */}
          <div
            className="
              mt-10

              grid
              gap-4

              sm:grid-cols-3
            "
          >
            {analyticsCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  className="
                    rounded-3xl

                    border
                    border-slate-200

                    bg-white/70

                    p-5

                    shadow-sm
                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-xl

                    dark:border-slate-800
                    dark:bg-white/5
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center


                      bg-gradient-to-br
                      from-cyan-500
                      to-blue-600

                      text-white
                    "
                  >
                    <Icon size={20} />
                  </div>

                  <h3
                    className="
                      mt-4

                      text-2xl
                      font-black

                      text-slate-900

                      dark:text-white
                    "
                  >
                    {card.value}
                  </h3>

                  <p
                    className="
                      mt-1

                      text-sm
                      font-semibold

                      text-slate-700

                      dark:text-slate-300
                    "
                  >
                    {card.title}
                  </p>

                  <span
                    className="
                      mt-1
                      block

                      text-xs

                      text-slate-500

                      dark:text-slate-500
                    "
                  >
                    {card.description}
                  </span>
                </div>
              );
            })}
          </div>

         
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div
            className="
              absolute
              inset-0

              rounded-[36px]

              bg-gradient-to-tr
              from-cyan-500/20
              to-blue-500/20

              blur-2xl
            "
          />

          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            alt="Analytics"
            className="
              relative
              z-10

              h-[580px]
              w-full

              rounded-[36px]

              border
              border-white/20

              object-cover

              shadow-2xl
            "
          />
        </div>
      </div>
    </section>
  );
}