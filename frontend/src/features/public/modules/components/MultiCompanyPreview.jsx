// models/components/MultiCompanyPreview.jsx

import { Building2, Network, Warehouse, Users } from "lucide-react";

export default function MultiCompanyPreview() {
  return (
    <section className="relative py-20">
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-16

          lg:grid-cols-2
        "
      >
        {/* IMAGE */}
        <div className="relative">
          {/* IMAGE CONTAINER */}
          <div
            className="
              overflow-hidden

              rounded-[32px]

              border
              border-[#d7e0e7]

              bg-white/10

              backdrop-blur-2xl

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop"
              alt="Multiempresa"
              className="
                h-[520px]
                w-full

                object-cover
              "
            />
          </div>

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

              backdrop-blur-xl

              dark:bg-[#020617]/70
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
                Todo centralizado en un sistema.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
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
            <Network size={16} />
            Gestión Multiempresa
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
            Administra múltiples
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
              negocios y sucursales
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-7
              max-w-2xl

              text-base
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]

              md:text-lg
            "
          >
            Controla empresas, almacenes, usuarios, sucursales y operaciones
            desde una sola plataforma moderna, segura y escalable.
          </p>

          {/* FEATURES */}
          <div
            className="
              mt-10

              grid
              gap-4

              sm:grid-cols-2
            "
          >
            <div
              className="
                flex
                items-center
                gap-4

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
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-xl

                  bg-[#274c77]
                  text-white
                "
              >
                <Warehouse size={20} />
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
                  Múltiples almacenes
                </h4>

                <p
                  className="
                    text-xs

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  Control total del stock.
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-4

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
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-xl

                  bg-[#6096ba]
                  text-white
                "
              >
                <Users size={20} />
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
                  Gestión de usuarios
                </h4>

                <p
                  className="
                    text-xs

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  Roles y permisos avanzados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
