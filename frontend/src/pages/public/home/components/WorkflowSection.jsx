import {
  workflow,
} from "../constants/workflow";

export default function WorkflowSection() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="max-w-3xl">
          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-[#d7e0e7]

              px-5
              py-2.5

              text-sm
              font-semibold

              text-[#274c77]

              dark:border-white/10
              dark:text-[#a3cef1]
            "
          >
            Flujo inteligente ERP POS
          </span>

          <h2
            className="
              mt-7
              text-4xl
              font-black
              tracking-tight

              text-[#0f172a]

              dark:text-white

              md:text-5xl
            "
          >
            Automatiza tu negocio
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
              desde el primer día
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]
            "
          >
            Gestiona ventas, productos,
            inventario, clientes y reportes
            desde una plataforma moderna,
            rápida y preparada para múltiples
            sucursales.
          </p>
        </div>

        {/* TIMELINE */}
        <div
          className="
            relative
            mt-20

            grid
            gap-8

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          

          {workflow.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.step}
                className="
                  group
                  relative

                  rounded-[30px]

                  border
                  border-[#d7e0e7]/70

                  bg-white/5

                  p-8

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#6096ba]/40

                  dark:border-white/10
                "
              >
                {/* STEP */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center

                      rounded-2xl

                      bg-gradient-to-br
                      from-[#274c77]
                      via-[#365d86]
                      to-[#6096ba]

                      text-white

                      shadow-lg
                      shadow-[#274c77]/20

                      transition-transform
                      duration-300

                      group-hover:scale-105
                    "
                  >
                    <Icon size={28} />
                  </div>

                  <span
                    className="
                      text-5xl
                      font-black

                      text-[#d7e0e7]

                      dark:text-white/10
                    "
                  >
                    0{item.step}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="mt-8">
                  <h3
                    className="
                      text-2xl
                      font-bold

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-[15px]
                      leading-relaxed

                      text-[#5b6472]

                      dark:text-[#cbd5e1]
                    "
                  >
                    {item.description}
                  </p>
                </div>

                {/* TAG */}
                <div
                  className="
                    mt-6
                    inline-flex

                    rounded-full

                    border
                    border-[#d7e0e7]

                    px-4
                    py-2

                    text-xs
                    font-semibold

                    text-[#274c77]

                    dark:border-white/10
                    dark:text-[#a3cef1]
                  "
                >
                  {item.tag}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}