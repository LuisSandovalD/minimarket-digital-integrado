import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import { ModernButton } from "@/components/buttons";

import {
  defaultViewport,
  fadeScale,
  fadeUp,
  hoverLift,
  hoverScale,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects/";

export default function CTASection() {
  return (
    <section
      className="
        relative
        overflow-hidden

        px-4
        py-24

        sm:px-6
        md:px-8

        lg:px-10
        lg:py-32
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
            opacity: [0.3, 0.6, 0.3],
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

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
        className="
          mx-auto
          max-w-5xl
          text-center
        "
      >
        {/* BADGE */}
        <motion.div
          variants={fadeScale}
          transition={springTransition}
          className="
            inline-flex
            items-center
            gap-2

            rounded-full

            border
            border-[#d7e0e7]

            bg-white/60

            px-5
            py-2.5

            text-sm
            font-semibold

            text-[#274c77]

            shadow-lg
            shadow-[#274c77]/5

            backdrop-blur-xl

            dark:border-white/10
            dark:bg-white/[0.03]
            dark:text-[#a3cef1]
          "
        >
          ERP POS Multiempresa
        </motion.div>

        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          transition={smoothTransition}
          className="
            mt-8

            text-4xl
            font-black
            leading-tight
            tracking-tight

            text-[#0f172a]

            dark:text-white

            md:text-6xl
          "
        >
          Empieza a gestionar
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
            tu negocio hoy mismo
          </span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          transition={smoothTransition}
          className="
            mx-auto
            mt-6
            max-w-2xl

            text-lg
            leading-relaxed

            text-[#5b6472]

            dark:text-[#cbd5e1]
          "
        >
          Centraliza ventas, inventario, reportes y administración multiempresa
          en una sola plataforma moderna y segura.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={fadeUp}
          transition={smoothTransition}
          className="
            mt-10

            flex
            flex-col
            items-center
            justify-center
            gap-4

            sm:flex-row
          "
        >
          <motion.div whileHover={hoverScale} whileTap={{ scale: 0.97 }}>
            <ModernButton
              text="Crear Cuenta"
              variant="primary"
              icon={ArrowRight}
            />
          </motion.div>

          <motion.button
            whileHover={hoverLift}
            whileTap={{ scale: 0.97 }}
            transition={{
              duration: 0.25,
            }}
            className="
              rounded-2xl

              border
              border-[#d7e0e7]

              bg-white/40

              px-6
              py-4

              font-semibold

              text-[#274c77]

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-[#274c77]
              hover:bg-[#274c77]
              hover:text-white

              dark:border-white/10
              dark:bg-white/[0.03]
              dark:text-[#a3cef1]
              dark:hover:bg-[#274c77]
            "
          >
            Ver demostración
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
