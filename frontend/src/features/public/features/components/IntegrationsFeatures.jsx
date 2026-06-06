// features/components/IntegrationsFeatures.jsx

import { Globe, ArrowUpRight } from "lucide-react";
import { integrations } from "../constants/integrations.js";

export default function IntegrationsFeatures() {
  return (
    <section
      className="
        relative
        py-16
        lg:py-24
      "
    >
      {/* Background Blur */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#89c2d9]/20
          blur-3xl
          pointer-events-none
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="mb-12 max-w-3xl">
          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#d7e0e7]
              bg-white/50
              px-4
              py-2
              text-sm
              font-semibold
              text-[#274c77]
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-white/10
              dark:text-[#dbeafe]
            "
          >
            <Globe size={16} />
            Integraciones Empresariales
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-6
              text-4xl
              font-black
              leading-tight
              tracking-tight
              text-[#0f172a]
              dark:text-white
              md:text-5xl
            "
          >
            Compatible con
            <span
              className="
                block
                mt-2
                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]
                bg-clip-text
                text-transparent
              "
            >
              múltiples plataformas
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-relaxed
              text-[#334155]
              dark:text-[#dbe4ee]
              md:text-lg
            "
          >
            Integra pagos digitales, APIs empresariales, SUNAT, códigos QR,
            impresoras y herramientas modernas para optimizar toda la operación
            de tu negocio.
          </p>

          {/* CTA */}
          <button
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-[#0f172a]
              px-6
              py-3
              text-sm
              font-bold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#1e293b]
              dark:bg-white
              dark:text-[#0f172a]
              dark:hover:bg-[#e2e8f0]
            "
          >
            Explorar integraciones
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* IMAGE SECTION - COMPACT */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-[#d7e0e7] dark:border-white/10">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Integrations"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                hover:scale-110
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-white/70
                via-white/40
                to-[#0f172a]/40
                dark:from-[#020617]/85
                dark:via-[#020617]/70
                dark:to-[#020617]/50
              "
            />

            {/* FLOATING STAT CARD */}
            <div
              className="
                absolute
                bottom-4
                right-4
                z-20
                rounded-2xl
                border
                border-[#d7e0e7]
                bg-white/80
                px-5
                py-4
                shadow-lg
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/10
              "
            >
              <div className="flex items-center gap-4">
                <div>
                  <p
                    className="
                      text-2xl
                      font-black
                      text-[#0f172a]
                      dark:text-white
                    "
                  >
                    20+
                  </p>
                  <span className="text-xs text-[#475569] dark:text-[#dbe4ee]">
                    Integraciones
                  </span>
                </div>

                <div
                  className="
                    h-10
                    w-px
                    bg-[#d7e0e7]
                    dark:bg-white/10
                  "
                />

                <div>
                  <p
                    className="
                      text-2xl
                      font-black
                      text-[#0f172a]
                      dark:text-white
                    "
                  >
                    API
                  </p>
                  <span className="text-xs text-[#475569] dark:text-[#dbe4ee]">
                    Compatible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div
          className="
            grid
            gap-4
            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          {integrations.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-2xl
                  border
                  border-[#d7e0e7]
                  bg-white/50
                  p-4
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/70
                  hover:shadow-lg
                  dark:border-white/10
                  dark:bg-white/10
                  dark:hover:bg-white/15
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#6096ba]
                    to-[#274c77]
                    text-white
                  "
                >
                  <Icon size={20} />
                </div>

                <h3
                  className="
                    mt-3
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
                    text-xs
                    leading-relaxed
                    text-[#475569]
                    dark:text-[#dbe4ee]
                  "
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
