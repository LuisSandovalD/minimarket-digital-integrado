// contact/components/ContactHero.jsx

import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function ContactHero() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        px-6
        h-[92vh]
        py-14
        lg:px-10
      "
    >

     {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        
        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
          alt="ERP POS"
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* LIGHT MODE OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#f8fbfd]/95
            via-[#eef4f8]/90
            to-[#dbeafe]/85
            dark:from-[#0f172a]/95
            dark:via-[#0f172a]/85
            dark:to-[#274c77]/80
          "
        />

        {/* EXTRA SHADOW */}
        <div
          className="
            absolute
            inset-0
            bg-white/20
            dark:bg-black/30
          "
        />
      </div>
      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-20
          lg:grid-cols-2
        "
      >
        {/* LEFT CONTENT */}
        <div className="relative z-10">
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
            <Mail size={15} />

            Contacto Empresarial
          </div>

          {/* TITLE */}
          <h1
            className="
              mt-8

              text-5xl
              font-black
              leading-[1.05]
              tracking-tight

              text-[#0f172a]

              dark:text-white

              lg:text-7xl
            "
          >
            Hablemos sobre

            <span
              className="
                mt-3
                block

                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]

                bg-clip-text
                text-transparent
              "
            >
              tu empresa
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              max-w-2xl

              text-lg
              leading-relaxed

              text-[#475569]

              dark:text-[#cbd5e1]
            "
          >
            Nuestro equipo está listo para ayudarte a implementar
            soluciones empresariales modernas, optimizar procesos y
            llevar la gestión de tu negocio al siguiente nivel.
          </p>

          {/* BUTTONS */}
          <div
            className="
              mt-10

              flex
              flex-wrap
              items-center
              gap-5
            "
          >
            {/* PRIMARY */}
            <button
              className="
                inline-flex
                items-center
                gap-2

                rounded-2xl

                bg-[#0f172a]
                px-7
                py-4

                text-sm
                font-bold
                text-white

                shadow-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(15,23,42,0.25)]

                dark:bg-white
                dark:text-[#020617]
              "
            >
              Contactar ahora

              <ArrowUpRight size={18} />
            </button>

            {/* SECONDARY */}
            <button
              className="
                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/70

                px-7
                py-4

                text-sm
                font-bold

                text-[#0f172a]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-white

                dark:border-white/10
                dark:bg-white/10
                dark:text-white
                dark:hover:bg-white/15
              "
            >
              Agendar demo
            </button>
          </div>

          {/* CONTACT INFO */}
          <div
            className="
              mt-14

              grid
              gap-5

              sm:grid-cols-3
            "
          >
            {[
              {
                icon: Mail,
                title: "Correo",
                value: "contacto@empresa.com",
              },

              {
                icon: Phone,
                title: "Teléfono",
                value: "+51 999 999 999",
              },

              {
                icon: MapPin,
                title: "Ubicación",
                value: "Lima, Perú",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    rounded-[28px]

                    border
                    border-[#d7e0e7]

                    bg-white/60

                    p-5

                    shadow-lg
                    backdrop-blur-2xl

                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:shadow-[0_20px_50px_rgba(96,150,186,0.18)]

                    dark:border-white/10
                    dark:bg-white/[0.05]
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
                    <Icon size={22} />
                  </div>

                  <h3
                    className="
                      mt-5

                      text-sm
                      font-black

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2

                      text-sm
                      leading-relaxed

                      text-[#475569]

                      dark:text-[#cbd5e1]
                    "
                  >
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* GLOW */}
          <div
            className="
              absolute
              inset-0

              scale-110

              rounded-[40px]

              bg-[#6096ba]/20
              blur-3xl
            "
          />

          {/* IMAGE CONTAINER */}
          <div
            className="
              relative
              overflow-hidden

              rounded-[40px]

              border
              border-[#d7e0e7]

              bg-white/60

              shadow-[0_30px_80px_rgba(15,23,42,0.18)]

              backdrop-blur-2xl

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            {/* IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
              alt="Contacto empresarial"

              className="
                h-[780px]
                w-full

                object-cover

                transition-transform
                duration-700

                hover:scale-105
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-[#020617]/80
                via-[#020617]/10
                to-transparent
              "
            />

            {/* FLOAT PANEL */}
            <div
              className="
                absolute
                bottom-6
                left-6
                right-6

                rounded-[28px]

                border
                border-white/10

                bg-white/10
                p-6

                backdrop-blur-2xl
              "
            >
              <h3
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                Atención personalizada
              </h3>

              <p
                className="
                  mt-3

                  max-w-md

                  text-sm
                  leading-relaxed

                  text-[#dbe4ee]
                "
              >
                Nuestro equipo responde rápidamente para ayudarte
                con implementación, soporte y soluciones empresariales.
              </p>

              <div
                className="
                  mt-6

                  flex
                  items-center
                  gap-6
                "
              >
                <div>
                  <p
                    className="
                      text-3xl
                      font-black
                      text-white
                    "
                  >
                    24/7
                  </p>

                  <span
                    className="
                      text-xs
                      text-[#dbe4ee]
                    "
                  >
                    Soporte
                  </span>
                </div>

                <div
                  className="
                    h-10
                    w-px

                    bg-white/10
                  "
                />

                <div>
                  <p
                    className="
                      text-3xl
                      font-black
                      text-white
                    "
                  >
                    +500
                  </p>

                  <span
                    className="
                      text-xs
                      text-[#dbe4ee]
                    "
                  >
                    Empresas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}