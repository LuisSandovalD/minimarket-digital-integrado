// inventory/components/AlertsSection.jsx

import {
  BellRing,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import { alerts } from "../constants/alerts";
export default function AlertsSection() {
  return (
    <section className="py-24">
      <div
        className="
          relative
          overflow-hidden
        "
      >
        

        <div
          className="
            relative
            z-10

            grid
            items-center
            gap-20


            lg:grid-cols-[1.3fr_1fr]

            max-w-7xl mx-auto
          "
        >
          {/* LEFT */}
          <div className="max-w-xl">
            <span
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-slate-200

                bg-white/70

                px-4
                py-1.5

                text-sm
                font-semibold

                text-[#6096ba]

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-[#a3cef1]
              "
            >
              <BellRing size={15} />
              Alertas Inteligentes
            </span>

            <h2
              className="
                mt-6

                text-4xl
                font-black
                leading-tight

                text-[#0f172a]

                dark:text-white

                md:text-5xl
              "
            >
              Notificaciones
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
                en tiempo real
              </span>
            </h2>

            <p
              className="
                mt-7

                text-lg
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]
              "
            >
              Recibe alertas sobre stock, seguridad y movimientos
              importantes dentro del inventario.
            </p>

            {/* ALERTS */}
            <div className="mt-10 grid gap-4 grid-cols-2">
              {alerts.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={index}
                    className="
                      group

                      flex
                      items-start
                      gap-4

                      rounded-[28px]

                      border
                      border-[#d7e0e7]

                      bg-white/50

                      p-5

                      shadow-sm
                      backdrop-blur-xl

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:shadow-xl

                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >
                    {/* ICON */}
                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        flex-shrink-0
                        items-center
                        justify-center

                        rounded-2xl

                        bg-gradient-to-br
                        ${item.color}

                        text-white

                        shadow-lg

                        transition-transform
                        duration-300

                        group-hover:scale-110
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    {/* CONTENT */}
                    <div>
                      <h3
                        className="
                          text-xl
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

                          text-[#5b6472]

                          dark:text-[#cbd5e1]
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div
              className="
                absolute
                inset-0

                rounded-[36px]

                blur-2xl
              "
            />

            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Inventory Alerts"
              className="
                relative
                z-10

                h-[620px]
                w-full

                rounded-[36px]

                border
                border-white/20

                object-cover

                shadow-lg
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}