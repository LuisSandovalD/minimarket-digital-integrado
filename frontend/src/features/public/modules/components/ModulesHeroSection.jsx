import { Boxes, ShieldCheck, BarChart3, Building2 } from "lucide-react";

export default function ModulesHeroSection() {
  return (
    <section
      className="
        relative
        isolate

        flex
        justify-center
        items-center

        w-full

        p-4

        lg:h-[92vh]

        md:h-screen

      "
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
          alt="ERP POS"
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* OVERLAY LIGHT */}
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

        <div
          className="
            absolute
            inset-0
            bg-white/20
            dark:bg-black/30
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          grid
          items-center
          gap-16

          px-6
          py-20

          lg:p-10

          lg:grid-cols-2
          lg:px-12
        "
      >
        {/* LEFT */}
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

              bg-white/30
              px-4
              py-2

              text-sm
              font-semibold

              text-[#274c77]

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-[#a3cef1]
            "
          >
            <Boxes size={16} />
            Módulos ERP Inteligentes
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
              xl:text-6xl
            "
          >
            Controla toda tu empresa
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
              desde una sola plataforma
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-7
              max-w-2xl

              text-base
              leading-relaxed

              text-[#4b5563]

              dark:text-[#cbd5e1]

              md:text-lg
            "
          >
            Gestiona inventario, ventas, clientes, reportes, seguridad,
            sucursales y analíticas en tiempo real con una experiencia moderna,
            rápida y escalable.
          </p>

          {/* MINI CARDS */}
          <div
            className="
              mt-10

              flex
              flex-wrap
              gap-4
            "
          >
            {/* CARD */}
            <div
              className="
                flex
                items-center
                gap-3

                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/30
                px-4
                py-3

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.04]
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-[#274c77]
                  text-white
                "
              >
                <BarChart3 size={20} />
              </div>

              <div>
                <h4
                  className="
                    text-sm
                    font-bold

                    text-[#0f172a]

                    dark:text-white
                  "
                >
                  Analíticas
                </h4>

                <p
                  className="
                    text-xs

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  Reportes inteligentes
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="
                flex
                items-center
                gap-3

                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/30
                px-4
                py-3

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.04]
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-[#6096ba]
                  text-white
                "
              >
                <ShieldCheck size={20} />
              </div>

              <div>
                <h4
                  className="
                    text-sm
                    font-bold

                    text-[#0f172a]

                    dark:text-white
                  "
                >
                  Seguridad
                </h4>

                <p
                  className="
                    text-xs

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  Protección avanzada
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative hidden lg:block">
          {/* FLOATING IMAGE */}
          <div
            className="
              relative
              overflow-hidden

              rounded-[34px]

              border
              border-white/20

              bg-white/10

              shadow-2xl
              backdrop-blur-2xl
            "
          >
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
              alt="ERP Dashboard"
              className="
                h-[580px]
                w-full
                object-cover
              "
            />

            {/* FLOAT CARD */}
            <div
              className="
                absolute
                bottom-6
                left-6

                flex
                items-center
                gap-4

                rounded-2xl

                border
                border-white/20

                bg-white/80
                px-5
                py-4

                shadow-xl
                backdrop-blur-xl

                dark:bg-[#020617]/75
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-xl

                  bg-gradient-to-br
                  from-[#274c77]
                  to-[#6096ba]

                  text-white
                "
              >
                <Building2 size={22} />
              </div>

              <div>
                <h4
                  className="
                    text-sm
                    font-bold

                    text-[#0f172a]

                    dark:text-white
                  "
                >
                  Multiempresa
                </h4>

                <p
                  className="
                    text-xs

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  Administra múltiples negocios
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
