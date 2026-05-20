// features/components/FeatureStats.jsx

import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";

import { stats } from "../constants/stats";

const icons = [Activity, BarChart3, ShieldCheck, Zap];

export default function FeatureStats() {
  return (
    <section className="relative py-20 max-w-7xl mx-auto px-6">
      {/* HEADER */}
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
          Métricas del Sistema
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
          Rendimiento y crecimiento
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
            impulsados por tecnología
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
          Descubre cómo las funciones inteligentes del ERP optimizan procesos
          empresariales, mejoran la productividad y ofrecen una experiencia
          moderna y eficiente.
        </p>
      </div>

      {/* STATS GRID */}
      <div
        className="
          mt-16

          grid
          gap-6

          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((item, index) => {
          const Icon = icons[index];

          return (
            <article
              key={index}
              className="
                group
                relative
                overflow-hidden

                rounded-[30px]

                border
                border-[#d7e0e7]

                bg-white/[0.04]
                p-7

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              {/* LIGHT */}
              <div
                className="
                  absolute
                  right-[-40px]
                  top-[-40px]

                  h-32
                  w-32

                  rounded-full

                  bg-[#6096ba]/10
                  blur-3xl
                "
              />

              {/* ICON */}
              <div
                className="
                  relative

                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br
                  from-[#274c77]
                  to-[#6096ba]

                  text-white
                "
              >
                <Icon size={24} />
              </div>

              {/* VALUE */}
              <h3
                className="
                  relative
                  mt-6

                  text-5xl
                  font-black
                  tracking-tight

                  text-[#274c77]

                  dark:text-[#a3cef1]
                "
              >
                {item.value}
              </h3>

              {/* LABEL */}
              <p
                className="
                  relative
                  mt-4

                  text-sm
                  leading-relaxed

                  text-[#5b6472]

                  dark:text-[#cbd5e1]
                "
              >
                {item.label}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
