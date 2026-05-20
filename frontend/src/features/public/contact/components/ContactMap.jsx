// contact/components/ContactMap.jsx

import { MapPin, Navigation, Clock3, Building2 } from "lucide-react";

import { ModernButton } from "@/components/buttons/";

export default function ContactMap() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#f8fbff]
        py-14

        dark:bg-[#020617]
      "
    >
      {/* BLUR */}
      <div
        className="
          absolute
          right-0
          top-0
          h-[350px]
          w-[350px]

          rounded-full

          bg-[#89c2d9]/20
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          gap-10

          px-6

          lg:grid-cols-2
          lg:px-8
        "
      >
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          {/* BADGE */}
          <div
            className="
              inline-flex
              w-fit
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
            <MapPin size={15} />
            Ubicación
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
            Encuéntranos fácilmente
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
              y visita nuestras oficinas
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              max-w-xl

              text-base
              leading-relaxed

              text-[#475569]

              dark:text-[#cbd5e1]
            "
          >
            Estamos disponibles para ayudarte con asesorías, implementaciones
            ERP, soporte empresarial y soluciones tecnológicas modernas para tu
            negocio.
          </p>

          {/* INFO CARDS */}
          <div className="mt-10 space-y-4">
            {[
              {
                icon: Building2,
                title: "Oficina principal",
                value: "Lima, Perú",
              },

              {
                icon: Clock3,
                title: "Horario de atención",
                value: "Lunes a Viernes · 8:00 AM - 6:00 PM",
              },

              {
                icon: Navigation,
                title: "Acceso rápido",
                value: "Ubicación accesible y moderna",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    flex
                    items-start
                    gap-4

                    rounded-3xl

                    border
                    border-[#d7e0e7]

                    bg-white/70

                    p-5

                    shadow-sm
                    backdrop-blur-xl

                    dark:border-white/10
                    dark:bg-white/[0.04]
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center

                      rounded-2xl

                      bg-gradient-to-br
                      from-[#6096ba]
                      to-[#274c77]

                      text-white
                    "
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3
                      className="
                        text-sm
                        font-bold

                        text-[#0f172a]

                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1

                        text-sm

                        text-[#64748b]

                        dark:text-[#cbd5e1]
                      "
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BUTTON */}
          <div className="mt-8">
            <ModernButton
              text="Abrir en Google Maps"
              icon={Navigation}
              variant="primary"
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/JgsPQVbkErPyUsYM8",
                  "_blank",
                )
              }
              size="lg"
            />
          </div>
        </div>

        {/* MAP */}
        <div
          className="
            relative
            overflow-hidden

            rounded-[36px]

            border
            border-[#d7e0e7]

            bg-white/70

            shadow-[0_20px_80px_rgba(15,23,42,0.08)]

            backdrop-blur-2xl

            dark:border-white/10
            dark:bg-white/[0.04]
            dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          "
        >
          {/* MAP CONTAINER */}
          <div className="relative h-full w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7773.899692173965!2d-76.3934391858281!3d-13.038864445374717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1778348645539!5m2!1ses!2spe"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="
                    rounded-[32px]
                    w-full
                    h-full
                "
            />
            {/* OVERLAY CARD */}
            <div
              className="
                absolute
                bottom-6
                left-6

                max-w-xs

                rounded-3xl

                border
                border-white/20

                bg-white/80

                p-5

                shadow-xl
                backdrop-blur-2xl

                dark:bg-[#020617]/70
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-2xl

                    bg-gradient-to-br
                    from-[#6096ba]
                    to-[#274c77]

                    text-white
                  "
                >
                  <MapPin size={20} />
                </div>

                <div>
                  <h4
                    className="
                      text-sm
                      font-black

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    Oficina ERP
                  </h4>

                  <p
                    className="
                      mt-1

                      text-xs

                      text-[#64748b]

                      dark:text-[#cbd5e1]
                    "
                  >
                    Soluciones empresariales modernas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
