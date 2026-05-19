// features/components/FeatureWorkflow.jsx

import { workflow } from "../constants/workflow";

export default function FeatureWorkflow() {
  return (
    <section className="relative overflow-hidden py-24 max-w-7xl mx-auto px-4">

      <div className="relative">
        {/* Header */}
        <div className="max-w-3xl">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#89c2d9]/30
              bg-[#89c2d9]/10
              px-4
              py-1
              text-sm
              font-semibold
              tracking-wide
              text-[#6096ba]
              backdrop-blur-sm
            "
          >
            Flujo ERP
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-black
              leading-tight
              tracking-tight
              sm:text-5xl
            "
          >
            Gestión empresarial moderna
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-relaxed
              text-black/60
              dark:text-white/60
            "
          >
            Optimiza cada etapa de tu negocio con un flujo inteligente,
            automatizado y diseñado para mejorar la productividad empresarial.
          </p>
        </div>

        {/* Workflow */}
        <div
          className="
            relative
            mt-20

            grid
            gap-7

            md:grid-cols-2
            xl:grid-cols-5
          "
        >
          {workflow.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="relative flex items-start"
              >
                {/* Connector Line */}
                {index !== workflow.length - 1 && (
                  <div
                    className="
                      absolute
                      left-[85%]
                      top-16
                      hidden
                      h-[2px]
                      w-full
                      bg-gradient-to-r
                      from-[#89c2d9]/60
                      to-transparent
                      xl:block
                    "
                  />
                )}

                <article
                  className="
                    group
                    relative
                    z-10
                    flex
                    h-full
                    flex-col

                    rounded-[30px]

                    border
                    border-[#d7e0e7]

                    bg-white/70
                    p-7
                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:border-[#89c2d9]/50
                    hover:shadow-2xl

                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >
                  {/* Top */}
                  <div className="flex items-center justify-between">
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
                        to-[#6096ba]

                        text-white
                        shadow-lg
                      "
                    >
                      <Icon size={28} />
                    </div>

                    <span
                      className="
                        text-sm
                        font-black
                        tracking-[0.2em]
                        text-[#6096ba]
                      "
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-7">
                    <h3
                      className="
                        text-xl
                        font-black
                        leading-snug
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-relaxed
                        text-black/60
                        dark:text-white/60
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Glow */}
                  <div
                    className="
                      absolute
                      inset-0
                      rounded-[30px]
                      bg-gradient-to-br
                      from-[#89c2d9]/0
                      to-[#89c2d9]/0
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:from-[#89c2d9]/5
                      group-hover:to-[#274c77]/5
                      group-hover:opacity-100
                    "
                  />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}