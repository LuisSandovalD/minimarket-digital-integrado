import {
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  features,
} from "../constants/feactures";

export default function FeaturesSection() {
  const [showAll, setShowAll] =
    useState(false);

  const visibleFeatures =
    showAll
      ? features
      : features.slice(0, 6);

  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        px-6
        py-28
      "
    >
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="max-w-3xl">
          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-[#d7e0e7]

              bg-white/40
              px-5
              py-2.5

              text-sm
              font-semibold
              text-[#274c77]

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/5
              dark:text-[#a3cef1]
            "
          >
            <Sparkles size={16} />

            Funciones inteligentes
          </div>

          <h2
            className="
              mt-7
              text-4xl
              font-black
              leading-tight
              tracking-tight

              text-[#0f172a]

              dark:text-white

              md:text-5xl
            "
          >
            Todo lo que necesitas
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
              para administrar tu negocio
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
            Un sistema ERP POS moderno,
            rápido y escalable diseñado
            para ventas, inventario,
            reportes, seguridad y gestión
            multiempresa.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            mt-20

            grid
            gap-8

            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {visibleFeatures.map(
            (feature, index) => {
              const Icon =
                feature.icon;

              return (
                <article
                  key={index}
                  className="
                    group
                    relative
                    overflow-hidden

                    rounded-[34px]

                    border
                    border-[#d7e0e7]

                    bg-white/60

                    backdrop-blur-2xl

                    transition-all
                    duration-500

                    hover:-translate-y-3
                    hover:border-[#6096ba]/40
                    hover:shadow-[0_25px_80px_rgba(39,76,119,0.12)]

                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >
                  {/* IMAGE */}
                  <div
                    className="
                      relative
                      h-56
                      overflow-hidden
                    "
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="
                        h-full
                        w-full
                        object-cover

                        transition-transform
                        duration-700

                        group-hover:scale-110
                      "
                    />

                    {/* OVERLAY */}
                    <div
                      className="
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-[#020617]
                        via-[#020617]/20
                        to-transparent
                      "
                    />

                    {/* ICON */}
                    <div
                      className={`
                        absolute
                        left-6
                        top-6

                        flex
                        h-16
                        w-16
                        items-center
                        justify-center

                        rounded-3xl

                        bg-gradient-to-br
                        ${feature.color}

                        text-white

                        shadow-2xl
                      `}
                    >
                      <Icon size={28} />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8">
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <h3
                        className="
                          text-2xl
                          font-black
                          leading-tight

                          text-[#0f172a]

                          dark:text-white
                        "
                      >
                        {feature.title}
                      </h3>

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center

                          rounded-2xl

                          border
                          border-[#d7e0e7]

                          bg-white/60

                          text-[#274c77]

                          transition-all
                          duration-300

                          group-hover:bg-[#274c77]
                          group-hover:text-white

                          dark:border-white/10
                          dark:bg-white/5
                          dark:text-[#a3cef1]
                        "
                      >
                        <ArrowUpRight
                          size={18}
                        />
                      </div>
                    </div>

                    <p
                      className="
                        mt-5
                        text-[15px]
                        leading-relaxed

                        text-[#5b6472]

                        dark:text-[#cbd5e1]
                      "
                    >
                      {feature.description}
                    </p>

                    {/* FOOTER */}
                    <div
                      className="
                        mt-8
                        flex
                        items-center
                        gap-2

                        text-sm
                        font-semibold

                        text-[#274c77]

                        dark:text-[#a3cef1]
                      "
                    >
                      <div
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-[#6096ba]
                        "
                      />

                      Sistema optimizado
                    </div>
                  </div>

                  {/* GLOW */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-[-60px]
                      top-[-60px]

                      h-40
                      w-40

                      rounded-full

                      bg-[#6096ba]/10
                      blur-3xl

                      opacity-0

                      transition-all
                      duration-500

                      group-hover:opacity-100
                    "
                  />
                </article>
              );
            }
          )}
        </div>

        {/* BUTTON */}
        {features.length > 6 && (
          <div
            className="
              mt-16
              flex
              justify-center
            "
          >
            <button
              onClick={() =>
                setShowAll(!showAll)
              }
              className="
                group

                inline-flex
                items-center
                gap-3

                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/60
                px-7
                py-4

                text-sm
                font-semibold

                text-[#274c77]

                shadow-lg
                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#6096ba]
                hover:bg-[#274c77]
                hover:text-white

                dark:border-white/10
                dark:bg-white/5
                dark:text-[#a3cef1]
                dark:hover:bg-[#274c77]
              "
            >
              {showAll ? (
                <>
                  Ver menos

                  <ChevronUp
                    size={18}
                    className="
                      transition-transform
                      duration-300
                    "
                  />
                </>
              ) : (
                <>
                  Ver más características

                  <ChevronDown
                    size={18}
                    className="
                      transition-transform
                      duration-300
                    "
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}