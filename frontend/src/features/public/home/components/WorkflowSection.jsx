import { motion } from "framer-motion";

import {
  workflow,
} from "../constants/workflow";

import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  defaultViewport,
} from "@/components/animations";

export default function WorkflowSection() {
  return (
    <section
      className="
        px-4
        py-20

        sm:px-6
        md:px-8
        lg:px-10
        lg:py-28
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          transition={smoothTransition}
          className="max-w-3xl"
        >
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
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
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
              <motion.article
                key={item.step}
                variants={fadeUp}
                transition={smoothTransition}

                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}

                className="
                  group
                  relative

                  rounded-[30px]

                  border
                  border-[#d7e0e7]/70

                  bg-white/5

                  p-8

                  backdrop-blur-xl

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
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.08,
                    }}

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
                    "
                  >
                    <Icon size={28} />
                  </motion.div>

                  <motion.span
                    whileHover={{
                      scale: 1.08,
                    }}

                    className="
                      text-5xl
                      font-black

                      text-[#d7e0e7]

                      dark:text-white/10
                    "
                  >
                    0{item.step}
                  </motion.span>
                </div>

                {/* CONTENT */}
                <div className="mt-8">
                  <h3
                    className="
                      text-2xl
                      font-bold

                      text-[#0f172a]

                      transition-colors
                      duration-300

                      group-hover:text-[#274c77]

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

                    transition-all
                    duration-300

                    group-hover:bg-[#274c77]
                    group-hover:text-white

                    dark:border-white/10
                    dark:text-[#a3cef1]
                  "
                >
                  {item.tag}
                </div>

                {/* GLOW EFFECT */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    rounded-[30px]

                    opacity-0

                    transition-opacity
                    duration-500

                    group-hover:opacity-100
                  "
                  style={{
                    background:
                      "radial-gradient(circle at top, rgba(96,150,186,0.15), transparent 70%)",
                  }}
                />
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}