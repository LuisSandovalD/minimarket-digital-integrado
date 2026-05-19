export default function DashboardPreviewSection() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
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
            <span
              className="
                inline-flex
                rounded-full

                border
                border-[#d7e0e7]

                px-5
                py-2.5

                text-sm
                font-semibold

                text-[#274c77]

                dark:border-white/10
                dark:text-[#a3cef1]
              "
            >
              Dashboard ERP
            </span>

            <h2
              className="
                mt-7
                text-5xl
                font-black
                tracking-tight
                leading-tight

                text-[#0f172a]

                dark:text-white
              "
            >
              Todo el control
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
                en un solo panel
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]
              "
            >
              Visualiza ventas,
              inventario, ingresos,
              estadísticas, reportes
              y rendimiento empresarial
              desde una interfaz moderna
              y optimizada.
            </p>

            {/* FEATURES */}
            <div
              className="
                mt-10
                grid
                gap-4

                sm:grid-cols-2
              "
            >
              {[
                "Ventas en tiempo real",
                "Reportes inteligentes",
                "Control multisucursal",
                "Inventario automatizado",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-2xl

                    border
                    border-[#d7e0e7]

                    px-5
                    py-4

                    text-sm
                    font-medium

                    text-[#274c77]

                    dark:border-white/10
                    dark:text-[#a3cef1]
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div
              className="
                overflow-hidden

                rounded-[40px]

                border
                border-[#d7e0e7]

                dark:border-white/10
              "
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                alt="Dashboard ERP"

                className="
                  h-full
                  w-full

                  object-cover

                  transition-transform
                  duration-500

                  hover:scale-[1.02]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}