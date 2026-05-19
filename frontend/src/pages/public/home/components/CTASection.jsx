import {
  ArrowRight,
} from "lucide-react";

import {
  ModernButton,
} from "@/components/buttons";

export default function CTASection() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl text-center">

        {/* BADGE */}
        <div
          className="
            inline-flex
            items-center
            gap-2

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
          ERP POS Multiempresa
        </div>

        {/* TITLE */}
        <h2
          className="
            mt-8

            text-4xl
            font-black
            leading-tight
            tracking-tight

            text-[#0f172a]

            dark:text-white

            md:text-6xl
          "
        >
          Empieza a gestionar
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
            tu negocio hoy mismo
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            mx-auto
            mt-6
            max-w-2xl

            text-lg
            leading-relaxed

            text-[#5b6472]

            dark:text-[#cbd5e1]
          "
        >
          Centraliza ventas, inventario,
          reportes y administración
          multiempresa en una sola
          plataforma moderna y segura.
        </p>

        {/* BUTTONS */}
        <div
          className="
            mt-10

            flex
            flex-col
            items-center
            justify-center
            gap-4

            sm:flex-row
          "
        >
          <ModernButton
            text="Crear Cuenta"
            variant="primary"
            icon={ArrowRight}
          />

          <button
            className="
              rounded-2xl

              border
              border-[#d7e0e7]

              px-6
              py-4

              font-semibold

              text-[#274c77]

              transition-all
              duration-300

              hover:border-[#274c77]
              hover:bg-[#274c77]
              hover:text-white

              dark:border-white/10
              dark:text-[#a3cef1]
              dark:hover:bg-[#274c77]
            "
          >
            Ver demostración
          </button>
        </div>
      </div>
    </section>
  );
}