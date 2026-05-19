import {
  Building2,
  ShoppingCart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  stats,
} from "../constants/stats";

const icons = [
  Building2,
  ShoppingCart,
  ShieldCheck,
  TrendingUp,
];

export default function StatsSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="max-w-3xl">
          <span
            className="
              inline-flex
              items-center
              rounded-full

              border
              border-[#d7e0e7]

              px-4
              py-2

              text-sm
              font-semibold

              text-[#274c77]

              dark:border-white/10
              dark:text-[#a3cef1]
            "
          >
            Plataforma empresarial
          </span>

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
            Empresas que ya
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
              optimizan su negocio
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              text-lg
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]
            "
          >
            Un ERP POS moderno para
            gestionar ventas, inventario,
            reportes y múltiples sucursales
            desde un solo sistema.
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            mt-16
            grid
            gap-6

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {stats.map((item, index) => {
            const Icon = icons[index];

            return (
              <article
                key={index}
                className="
                  rounded-[30px]

                  border
                  border-[#d7e0e7]

                  p-8

                  transition-all
                  duration-300

                  hover:-translate-y-1

                  dark:border-white/10
                "
              >
                {/* ICON */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center

                    rounded-2xl

                    bg-gradient-to-br
                    from-[#274c77]
                    to-[#6096ba]

                    text-white
                  "
                >
                  <Icon size={24} />
                </div>

                {/* VALUE */}
                <h3
                  className="
                    mt-7
                    text-5xl
                    font-black
                    tracking-tight

                    text-[#274c77]

                    dark:text-[#a3cef1]
                  "
                >
                  {item.value}
                </h3>

                {/* LABEL */}
                <p
                  className="
                    mt-4
                    text-lg
                    font-bold

                    text-[#0f172a]

                    dark:text-white
                  "
                >
                  {item.label}
                </p>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-3
                    text-sm
                    leading-relaxed

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}