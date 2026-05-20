import { motion } from "framer-motion";

import { workflow } from "../constants/workflow";

import {
  fadeUp,
  fadeScale,
  staggerContainer,
  smoothTransition,
  springTransition,
  defaultViewport,
  hoverLift,
  hoverScale,
} from "@/components/animations/";

export default function WorkflowSection() {
  return (
    <section
      className="
        relative
        overflow-hidden

        px-4
        py-20

        sm:px-6
        md:px-8

        lg:px-10
        lg:py-28
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          inset-0
          -z-10
        "
      >
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2

            h-[500px]
            w-[500px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-[#6096ba]/10

            blur-3xl
          "
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          className="text-center"
        >
          <motion.span
            variants={fadeScale}
            transition={springTransition}
            className="
              inline-flex
              rounded-full

              border
              border-[#d7e0e7]

              bg-white/70

              px-5
              py-2.5

              text-sm
              font-semibold

              text-[#274c77]

              shadow-lg
              shadow-[#274c77]/5

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/5
              dark:text-[#a3cef1]
            "
          >
            Flujo Inteligente
          </motion.span>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="
              mt-7
              text-5xl
              font-black
              tracking-tight

              text-[#0f172a]

              dark:text-white
            "
          >
            Gestiona tu negocio
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
              en pocos pasos
            </span>
          </motion.h2>
        </motion.div>

        {/* STEPS */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          className="
            mt-20
            grid
            gap-8

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {workflow.map((item) => (
            <motion.article
              key={item.step}
              variants={fadeUp}
              transition={smoothTransition}
              whileHover={hoverLift}
              className="
                group
                relative
                overflow-hidden

                rounded-[32px]

                border
                border-[#d7e0e7]

                bg-white/70

                p-8

                shadow-xl
                shadow-[#274c77]/5

                backdrop-blur-2xl

                dark:border-white/10
                dark:bg-white/5
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

              {/* NUMBER */}
              <motion.div
                whileHover={hoverScale}
                transition={{
                  duration: 0.3,
                }}
                className="
                  relative
                  z-10

                  flex
                  h-16
                  w-16
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br
                  from-[#274c77]
                  to-[#6096ba]

                  text-2xl
                  font-black
                  text-white

                  shadow-lg
                  shadow-[#274c77]/20
                "
              >
                {item.step}
              </motion.div>

              {/* TITLE */}
              <h3
                className="
                  relative
                  z-10

                  mt-6
                  text-xl
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

              {/* DESCRIPTION */}
              <p
                className="
                  relative
                  z-10

                  mt-4
                  text-sm
                  leading-relaxed

                  text-[#5b6472]

                  dark:text-[#cbd5e1]
                "
              >
                {item.description}
              </p>

              {/* TAG */}
              <div
                className="
                  relative
                  z-10

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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
