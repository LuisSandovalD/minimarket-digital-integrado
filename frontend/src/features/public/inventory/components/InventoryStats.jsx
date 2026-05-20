// inventory/components/InventoryStats.jsx

import { inventoryStats } from "../constants/inventoryStats";
import { TrendingUp, Clock, Package, Users } from "lucide-react";

const iconMap = {
  0: TrendingUp,
  1: Clock,
  2: Package,
  3: Users,
};

export default function InventoryStats() {
  return (
    <section className="relative py-24">
      <div className="relative  max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 space-y-3">
          <span
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              rounded-full
              bg-[#6096ba]/10
              text-xs
              font-semibold
              text-[#6096ba]
              dark:bg-[#6096ba]/20
              dark:text-[#a3cef1]
            "
          >
            <div className="h-2 w-2 rounded-full bg-[#6096ba] dark:bg-[#a3cef1]" />
            Estadísticas en vivo
          </span>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              leading-tight
              text-[#0f172a]
              dark:text-white
              max-w-3xl
            "
          >
            Inventario en
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
              tiempo real
            </span>
          </h2>
        </div>

        {/* STATS GRID */}
        <div
          className="
            grid
            gap-4
            sm:gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {inventoryStats.map((item, index) => {
            const Icon = iconMap[index];

            return (
              <article
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#d7e0e7]
                  bg-white/40
                  p-5
                  lg:p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#6096ba]/50
                  hover:bg-white/60
                  hover:shadow-lg
                  dark:border-white/10
                  dark:bg-white/[0.05]
                  dark:hover:border-white/20
                  dark:hover:bg-white/10
                "
              >
                {/* BACKGROUND ACCENT */}
                <div
                  className="
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-gradient-to-br
                    from-[#6096ba]/20
                    to-[#274c77]/10
                    blur-2xl
                    transition-all
                    duration-300
                    group-hover:scale-150
                  "
                />

                {/* CONTENT */}
                <div className="relative z-10">
                  {/* ICON */}
                  <div
                    className="
                      inline-flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-gradient-to-br
                      from-[#6096ba]
                      to-[#274c77]
                      text-white
                      mb-4
                      transition-transform
                      duration-300
                      group-hover:scale-110
                      group-hover:-translate-y-1
                    "
                  >
                    <Icon size={20} />
                  </div>

                  {/* VALUE */}
                  <h3
                    className="
                      text-4xl
                      lg:text-5xl
                      font-black
                      bg-gradient-to-r
                      from-[#274c77]
                      to-[#6096ba]
                      bg-clip-text
                      text-transparent
                      leading-tight
                    "
                  >
                    {item.value}
                  </h3>

                  {/* LABEL */}
                  <p
                    className="
                      mt-3
                      text-sm
                      leading-relaxed
                      text-[#475569]
                      dark:text-[#cbd5e1]
                      transition-colors
                      duration-300
                      group-hover:text-[#274c77]
                      dark:group-hover:text-[#a3cef1]
                    "
                  >
                    {item.label}
                  </p>
                </div>

                {/* BOTTOM ACCENT LINE */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-0
                    bg-gradient-to-r
                    from-[#6096ba]
                    to-[#a3cef1]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />
              </article>
            );
          })}
        </div>

        {/* BOTTOM INFO */}
        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            gap-4
            p-4
            lg:p-5
            rounded-xl
            border
            border-[#d7e0e7]
            bg-[#f8fbff]/50
            dark:border-white/10
            dark:bg-white/[0.02]
          "
        >
          <div className="flex-1">
            <p
              className="
                text-xs
                font-semibold
                text-[#6096ba]
                dark:text-[#a3cef1]
                uppercase
                tracking-wide
              "
            >
              Última actualización
            </p>
            <p
              className="
                mt-1
                text-sm
                text-[#475569]
                dark:text-[#cbd5e1]
              "
            >
              Hace 2 minutos
            </p>
          </div>

          <div className="hidden sm:block w-px bg-[#d7e0e7] dark:bg-white/10" />

          <div className="flex-1">
            <p
              className="
                text-xs
                font-semibold
                text-[#6096ba]
                dark:text-[#a3cef1]
                uppercase
                tracking-wide
              "
            >
              Estado del sistema
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm text-[#475569] dark:text-[#cbd5e1]">
                Operativo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
