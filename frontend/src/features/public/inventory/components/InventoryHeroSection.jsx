// inventory/components/InventoryHeroSection.jsx

import {
  Boxes,
  PackageCheck,
  Warehouse,
  BarChart3,
} from "lucide-react";

export default function InventoryHeroSection() {
  return (
    <section
      className="
        relative
        isolate

        flex
        justify-center
        items-center

        w-full

        p-4

        lg:h-[92vh]

        md:h-screen

      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
          alt="Inventory"

          className="
            h-full
            w-full
            object-cover
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-[#f8fbfd]/95
            via-[#eef4f8]/90
            to-[#dbeafe]/80

            dark:from-[#020617]/95
            dark:via-[#0f172a]/90
            dark:to-[#274c77]/70
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
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
            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#d7e0e7]

                bg-white/70
                px-4
                py-2

                text-sm
                font-semibold

                text-[#274c77]

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.05]
                dark:text-[#a3cef1]
              "
            >
              <Boxes size={16} />

              Gestión Inteligente de Inventario
            </div>

            <h1
              className="
                mt-7

                text-5xl
                font-black
                leading-tight

                text-[#0f172a]

                dark:text-white

                md:text-6xl
              "
            >
              Controla tu stock
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
                en tiempo real
              </span>
            </h1>

            <p
              className="
                mt-7
                max-w-2xl

                text-lg
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]
              "
            >
              Gestiona productos,
              almacenes, movimientos,
              alertas de stock y reportes
              desde una plataforma moderna,
              rápida y totalmente centralizada.
            </p>

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
                  icon: PackageCheck,
                  title: "Stock",
                },

                {
                  icon: Warehouse,
                  title: "Almacenes",
                },

                {
                  icon: BarChart3,
                  title: "Reportes",
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

                      bg-white/60
                      p-5

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
                      <Icon size={20} />
                    </div>

                    <h3
                      className="
                        mt-4

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
            <div
              className="
                overflow-hidden

                rounded-[32px]

                border
                border-[#d7e0e7]

                bg-white/10

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                alt="Inventory"

                className="
                  h-[620px]
                  w-full

                  object-cover
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}