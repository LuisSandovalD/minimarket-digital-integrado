// features/components/AutomationSection.jsx

import { Bot, BellRing, RefreshCcw, MailCheck, Sparkles } from "lucide-react";

import { automation } from "../constants/automation.js";

export default function AutomationSection() {
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
            <Sparkles size={16} />
            Automatización Inteligente
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
            Automatiza procesos empresariales
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
              rápidos y eficientes
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
            Reduce tareas manuales, mejora la productividad y optimiza
            operaciones mediante automatizaciones inteligentes integradas dentro
            del ERP.
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
            Automatizaciones conectadas con inventario, ventas, reportes y
            notificaciones empresariales.
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
          xl:grid-cols-4
        "
      >
        {automation.map((item, index) => {
          const Icon = item.icon;

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
                  right-[-30px]
                  top-[-30px]

                  h-28
                  w-28

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
                <Icon size={22} />
              </div>

              {/* TITLE */}
              <h3
                className="
                  relative
                  mt-6

                  text-2xl
                  font-black

                  text-[#0f172a]

                  dark:text-white
                "
              >
                {item.title}
              </h3>

              {/* DESCRIPTION */}
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
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
