import { motion } from "framer-motion";

import {
  defaultViewport,
  fadeScale,
  fadeUp,
  hoverLift,
  slideRight,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects/";

export default function DashboardPreviewSection() {
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
        <div
          className="
            grid
            items-center
            gap-16

            lg:grid-cols-2
          "
        >
          {/* LEFT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={defaultViewport}
          >
            {/* BADGE */}
            <motion.span
              variants={fadeUp}
              transition={smoothTransition}
              className="
                inline-flex
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
              Dashboard ERP
            </motion.span>

            {/* TITLE */}
            <motion.h2
              variants={fadeUp}
              transition={smoothTransition}
              className="
                mt-7
                text-5xl
                font-black
                tracking-tight
                leading-tight

                text-[#0f172a]

                dark:text-white
              "
            >
              Todo el control
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
                en un solo panel
              </span>
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]
              "
            >
              Visualiza ventas, inventario, ingresos, estadísticas, reportes y
              rendimiento empresarial desde una interfaz moderna y optimizada.
            </motion.p>

            {/* FEATURES */}
            <motion.div
              variants={staggerContainer}
              className="
                mt-10
                grid
                gap-4

                sm:grid-cols-2
              "
            >
              {[
                "Ventas en tiempo real",
                "Reportes inteligentes",
                "Control multisucursal",
                "Inventario automatizado",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeScale}
                  transition={springTransition}
                  whileHover={hoverLift}
                  className="
                    rounded-2xl

                    border
                    border-[#d7e0e7]

                    bg-white/40

                    px-5
                    py-4

                    text-sm
                    font-medium

                    text-[#274c77]

                    backdrop-blur-xl

                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-[#a3cef1]
                  "
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={defaultViewport}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* GLOW */}
            <div
              className="
                absolute
                inset-0

                rounded-[40px]

                bg-[#6096ba]/10

                blur-3xl

                dark:bg-[#6096ba]/20
              "
            />

            <motion.div
              whileHover={{
                scale: 1.02,
                y: -4,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                relative

                overflow-hidden

                rounded-[40px]

                border
                border-[#d7e0e7]

                shadow-2xl
                shadow-[#274c77]/10

                dark:border-white/10
              "
            >
              <motion.img
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.6,
                }}
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                alt="Dashboard ERP"
                className="
                  h-full
                  w-full

                  object-cover
                "
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
