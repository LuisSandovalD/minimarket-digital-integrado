import { motion } from "framer-motion";

import { Building2, ShoppingCart, ShieldCheck, TrendingUp } from "lucide-react";

import { stats } from "../constants/stats";

import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  defaultViewport,
  hoverLift,
  hoverRotate,
} from "@/components/animations/";

const icons = [Building2, ShoppingCart, ShieldCheck, TrendingUp];

export default function StatsSection() {
  return (
    <section
      className="
        px-4
        py-20

        sm:px-6
        md:px-8
        lg:px-10
        lg:py-24
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
            Un ERP POS moderno para gestionar ventas, inventario, reportes y
            múltiples sucursales desde un solo sistema.
          </p>
        </motion.div>

        {/* STATS */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
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
              <motion.article
                key={index}
                variants={fadeUp}
                transition={smoothTransition}
                whileHover={hoverLift}
                className="
                  group
                  relative

                  overflow-hidden

                  rounded-[30px]

                  border
                  border-[#d7e0e7]

                  bg-white/40

                  p-8

                  backdrop-blur-xl

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                {/* GLOW */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0

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

                {/* ICON */}
                <motion.div
                  whileHover={hoverRotate}
                  className="
                    relative
                    z-10

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

                    shadow-lg
                    shadow-[#274c77]/20
                  "
                >
                  <Icon size={24} />
                </motion.div>

                {/* VALUE */}
                <motion.h3
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="
                    relative
                    z-10

                    mt-7
                    text-5xl
                    font-black
                    tracking-tight

                    text-[#274c77]

                    dark:text-[#a3cef1]
                  "
                >
                  {item.value}
                </motion.h3>

                {/* LABEL */}
                <p
                  className="
                    relative
                    z-10

                    mt-4
                    text-lg
                    font-bold

                    text-[#0f172a]

                    transition-colors
                    duration-300

                    group-hover:text-[#274c77]

                    dark:text-white
                  "
                >
                  {item.label}
                </p>

                {/* DESCRIPTION */}
                <p
                  className="
                    relative
                    z-10

                    mt-3
                    text-sm
                    leading-relaxed

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
                >
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
