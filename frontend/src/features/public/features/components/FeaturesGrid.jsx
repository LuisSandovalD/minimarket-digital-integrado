// features/components/FeaturesGrid.jsx

import {
  Layers3,
} from "lucide-react";

import {
  features,
} from "../constants/features";

import FeatureCard from "./FeatureCard";

export default function FeaturesGrid() {
  return (
    <section className="relative py-20 max-w-7xl mx-auto px-6">
      
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
            <Layers3 size={16} />

            Características Inteligentes
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
            Funciones diseñadas para
            optimizar tu empresa

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
              rápidas, modernas y escalables
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              max-w-2xl

              text-base
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]

              md:text-lg
            "
          >
            Explora herramientas enfocadas
            en productividad, automatización,
            seguridad, reportes y gestión
            empresarial desde una plataforma
            moderna y totalmente integrada.
          </p>
        </div>

        {/* RIGHT INFO */}
        <div
          className="
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
          <p
            className="
              text-sm
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]
            "
          >
            Más de <strong>20 funcionalidades</strong>
            empresariales integradas para
            mejorar la administración y
            el crecimiento de tu negocio.
          </p>
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          mt-16

          grid
          gap-8

          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {features.map((item, index) => (
          <FeatureCard
            key={index}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}