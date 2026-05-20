// contact/components/ContactSocials.jsx

import { ArrowUpRight, Sparkles } from "lucide-react";

import { socials } from "../constants/socials";

import { ModernButton } from "@/components/buttons/";

export default function ContactSocials() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#f8fbff]
        py-24

        dark:bg-[#020617]
      "
    >
      {/* BLUR */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#89c2d9]/20
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          lg:px-8
        "
      >
        {/* HEADER */}
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

              bg-white/70

              px-4
              py-2

              text-sm
              font-semibold

              text-[#274c77]

              shadow-sm
              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-[#dbeafe]
            "
          >
            <Sparkles size={15} />
            Redes sociales
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

              dark:text-white

              md:text-5xl
            "
          >
            Mantente conectado
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
              con nuestra comunidad
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              max-w-2xl

              text-base
              leading-relaxed

              text-[#475569]

              dark:text-[#cbd5e1]
            "
          >
            Síguenos en nuestras plataformas para conocer novedades,
            actualizaciones del sistema, contenido empresarial y nuevas
            funcionalidades.
          </p>
        </div>

        {/* SOCIAL GRID */}
        <div
          className="
            mt-14

            grid
            gap-5

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {socials.map((social, index) => {
            const Icon = social.icon;

            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  relative
                  overflow-hidden

                  rounded-[30px]

                  border
                  border-[#d7e0e7]

                  bg-white/70

                  p-6

                  shadow-[0_10px_40px_rgba(15,23,42,0.06)]

                  backdrop-blur-2xl

                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#6096ba]/40
                  hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]

                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:hover:bg-white/[0.07]
                "
              >
                {/* TOP */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center

                      rounded-2xl

                      bg-gradient-to-br
                      from-[#6096ba]
                      to-[#274c77]

                      text-white

                      shadow-lg
                    "
                  >
                    {Icon && <Icon size={24} />}
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="
                      text-[#94a3b8]

                      transition-all
                      duration-300

                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      group-hover:text-[#274c77]

                      dark:group-hover:text-white
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-6">
                  <h3
                    className="
                      text-lg
                      font-black

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    {social.platform}
                  </h3>

                  <p
                    className="
                      mt-2

                      text-sm
                      leading-relaxed

                      text-[#64748b]

                      dark:text-[#cbd5e1]
                    "
                  >
                    Conéctate con nosotros y descubre contenido, novedades y
                    actualizaciones empresariales.
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
