// inventory/components/InventoryDevices.jsx

import { devices } from "../constants/devices";
import { Monitor, Tablet, Smartphone } from "lucide-react";

const icons = [Monitor, Tablet, Smartphone];

export default function InventoryDevices() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            grid
            items-center
            gap-20

            lg:grid-cols-[1fr_1.6fr]
          "
        >
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <span
              className="
                inline-flex
                items-center

                rounded-full

                border
                border-slate-200

                bg-slate-50

                px-4
                py-1.5

                text-sm
                font-semibold

                text-[#6096ba]

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              Multiplataforma
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
              Gestiona inventario
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
              desde cualquier lugar

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
              Compatible con computadoras, tablets y dispositivos
              móviles para administrar productos, stock y movimientos
              en tiempo real con una experiencia fluida y moderna.
            </p>

            {/* MINI STATS */}
            <div
              className="
                mt-10

                flex
                flex-wrap
                gap-4
              "
            >
              {[
                "Acceso en tiempo real",
                "Sincronización automática",
                "Control multi-dispositivo",
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl

                    border
                    border-slate-200

                    bg-white/60

                    px-4
                    py-3

                    text-sm
                    font-medium

                    text-slate-700

                    shadow-sm
                    backdrop-blur-xl

                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-slate-300
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT GRID */}
          <div
            className="
              grid
              gap-6

              sm:grid-cols-3
            "
          >
            {devices.map((item, index) => {
              const Icon = icons[index % icons.length];

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

                    bg-white/40

                    backdrop-blur-xl

                    transition-all
                    duration-500

                    hover:-translate-y-2
                    hover:shadow-2xl

                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        h-56
                        w-full

                        object-cover

                        transition-transform
                        duration-700

                        group-hover:scale-105
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-black/50
                        via-black/10
                        to-transparent
                      "
                    />

                    {/* ICON */}
                    <div
                      className="
                        absolute
                        left-5
                        top-5

                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-white/20

                        text-white

                        backdrop-blur-md
                      "
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-7">
                    <h3
                      className="
                        text-2xl
                        font-black

                        text-[#0f172a]

                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-4

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
      </div>
    </section>
  );
}