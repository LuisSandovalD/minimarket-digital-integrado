// inventory/components/InventoryCTA.jsx

import { ArrowRight } from "lucide-react";

import { ModernButton } from "@/components/buttons";

export default function InventoryCTA() {
  return (
    <section className="py-24">
      <div
        className="
          relative
          overflow-hidden

          rounded-[40px]

          border
          border-[#d7e0e7]

          bg-gradient-to-br
          from-[#274c77]
          via-[#365d86]
          to-[#6096ba]

          p-10

          shadow-[0_20px_80px_-20px_rgba(39,76,119,0.45)]

          dark:border-white/10

          lg:p-16
          max-w-7xl
            mx-auto
        "
      >
        {/* BACKGROUND GLOWS */}
        <div
          className="
            absolute
            -right-20
            -top-20

            h-72
            w-72

            rounded-full

            bg-white/10

            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0

            h-64
            w-64

            rounded-full

            bg-cyan-300/10

            blur-3xl
          "
        />

        {/* GRID */}
        <div
          className="
            relative
            z-10

            flex
            flex-col
            gap-12

            lg:flex-row
            lg:items-center
            lg:justify-between

          "
        >
          {/* CONTENT */}
          <div className="max-w-2xl">
            <span
              className="
                inline-flex
                items-center

                rounded-full

                border
                border-white/10

                bg-white/10

                px-4
                py-1.5

                text-sm
                font-semibold

                text-[#dbeafe]

                backdrop-blur-xl
              "
            >
              Inventario Inteligente
            </span>

            <h2
              className="
                mt-6

                text-4xl
                font-black
                leading-tight

                text-white

                md:text-5xl
              "
            >
              Optimiza el control
              <span className="block text-[#dbeafe]">
                de tu inventario
              </span>
            </h2>

            <p
              className="
                mt-6

                max-w-xl

                text-lg
                leading-relaxed

                text-[#e7ecef]
              "
            >
              Gestiona productos, almacenes y movimientos desde
              una plataforma moderna, rápida y escalable.
            </p>
          </div>

          {/* ACTION */}
          <div className="flex-shrink-0">
            <ModernButton
              text="Comenzar Ahora"
              icon={ArrowRight}
              className="
                h-14

                rounded-2xl

                bg-white

                px-7

                text-[#274c77]

                shadow-lg

                transition-all
                duration-300

                hover:scale-105
                hover:bg-[#f8fafc]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}