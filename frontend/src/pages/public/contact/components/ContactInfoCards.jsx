// contact/components/ContactInfoCards.jsx

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

export default function ContactInfoCards() {
  const cards = [
    {
      title: "Teléfono",
      value: "+51 999 999 999",
      description:
        "Atención comercial y soporte empresarial.",
      icon: Phone,
    },

    {
      title: "Correo electrónico",
      value: "contacto@empresa.com",
      description:
        "Escríbenos para consultas o asesoría.",
      icon: Mail,
    },

    {
      title: "Ubicación",
      value: "Lima, Perú",
      description:
        "Atendemos proyectos en todo el país.",
      icon: MapPin,
    },

    {
      title: "Horario",
      value: "Lun - Vie / 8:00 AM",
      description:
        "Disponible para reuniones y soporte.",
      icon: Clock3,
    },
  ];

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
      {/* BACKGROUND BLUR */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[450px]
          w-[450px]
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

              shadow-lg
              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/10
              dark:text-[#dbeafe]
            "
          >
            <Phone size={15} />

            Información de contacto
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-8

              text-5xl
              font-black
              leading-tight
              tracking-tight

              text-[#0f172a]

              dark:text-white
            "
          >
            Estamos listos para

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
              ayudarte
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
            Ponte en contacto con nuestro equipo
            para resolver dudas, solicitar una
            demostración o recibir asesoría sobre
            nuestras soluciones ERP.
          </p>
        </div>

        {/* CARDS */}
        <div
          className="
            mt-16

            grid
            gap-6

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {cards.map((item, index) => {
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

                  bg-white/70

                  p-7

                  shadow-[0_10px_40px_rgba(15,23,42,0.06)]

                  backdrop-blur-2xl

                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]

                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:hover:bg-white/[0.06]
                "
              >
                {/* LIGHT EFFECT */}
                <div
                  className="
                    absolute
                    right-0
                    top-0

                    h-32
                    w-32

                    rounded-full

                    bg-[#89c2d9]/10

                    blur-3xl
                  "
                />

                {/* ICON */}
                <div
                  className="
                    relative
                    z-10

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
                    shadow-[#6096ba]/20
                  "
                >
                  <Icon size={24} />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-6">
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
                        text-lg
                        font-black

                        text-[#0f172a]

                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <ArrowUpRight
                      size={18}
                      className="
                        text-[#6096ba]

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </div>

                  <p
                    className="
                      mt-4

                      text-base
                      font-semibold

                      text-[#274c77]

                      dark:text-[#dbeafe]
                    "
                  >
                    {item.value}
                  </p>

                  <p
                    className="
                      mt-3

                      text-sm
                      leading-relaxed

                      text-[#64748b]

                      dark:text-[#cbd5e1]
                    "
                  >
                    {item.description}
                  </p>
                </div>

                {/* BOTTOM LINE */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0

                    h-1
                    w-0

                    bg-gradient-to-r
                    from-[#6096ba]
                    to-[#274c77]

                    transition-all
                    duration-500

                    group-hover:w-full
                  "
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}