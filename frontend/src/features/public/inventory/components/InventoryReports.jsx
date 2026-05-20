// inventory/components/InventoryReports.jsx

export default function InventoryReports() {
  return (
    <section className="py-20">
      <div className="max-w-7xl">
        <div
          className="
            grid
            items-center
            gap-16

            lg:grid-cols-2
          "
        >
          <div
            className="
              overflow-hidden

              rounded-[36px]

              border
              border-[#d7e0e7]

              dark:border-white/10
            "
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Reports"

              className="
                h-[620px]
                w-full

                object-cover
              "
            />
          </div>

          <div>
            <span
              className="
                text-sm
                font-semibold
                text-[#6096ba]
              "
            >
              Reportes Inteligentes
            </span>

            <h2
              className="
                mt-4

                text-5xl
                font-black

                text-[#0f172a]

                dark:text-white
              "
            >
              Analiza tu inventario
              con datos en tiempo real
            </h2>

            <p
              className="
                mt-7

                text-lg
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]
              "
            >
              Obtén métricas,
              movimientos de stock,
              productos más vendidos,
              alertas y estadísticas
              empresariales avanzadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}