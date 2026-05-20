import { motion } from "framer-motion";

import { ArrowRight, Play, ShieldCheck } from "lucide-react";

import { ModernButton } from "@/components/buttons";

import { heroFeatures } from "../constants/heroFeatures";

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

export default function HeroSection() {
  return (
    <section
      className="
        relative
        isolate

        flex
        items-center
        justify-center

        w-full

        overflow-hidden

        px-4
        py-20

        sm:px-6
        md:px-8

        lg:h-[92vh]
        lg:px-10
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        {/* IMAGE */}
        <motion.img
          initial={{
            scale: 1.1,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
          alt="ERP POS"
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* LIGHT MODE OVERLAY */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-[#f8fbfd]/95
            via-[#eef4f8]/90
            to-[#dbeafe]/85

            dark:from-[#0f172a]/95
            dark:via-[#0f172a]/85
            dark:to-[#274c77]/80
          "
        />

        {/* EXTRA SHADOW */}
        <div
          className="
            absolute
            inset-0

            bg-white/20
            dark:bg-black/30
          "
        />
      </div>

      {/* LIGHT EFFECTS */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-0
          top-0
          -z-10

          h-96
          w-96

          rounded-full

          bg-[#6096ba]/15

          blur-3xl
        "
      />

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
          bottom-0
          right-0
          -z-10

          h-96
          w-96

          rounded-full

          bg-[#274c77]/10
          blur-3xl

          dark:bg-[#274c77]/30
        "
      />

      <div className="w-full max-w-7xl">
        <div
          className="
            grid
            items-center
            gap-20

            lg:grid-cols-2
          "
        >
          {/* LEFT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* BADGE */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#d7e0e7]

                bg-white/70

                px-5
                py-2.5

                text-sm
                font-semibold
                tracking-wide

                text-[#274c77]

                shadow-lg
                shadow-[#274c77]/5

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/5
                dark:text-[#dbeafe]
              "
            >
              <ShieldCheck size={16} />
              ERP • POS • Multiempresa
            </motion.div>

            {/* TITLE */}
            <motion.h2
              variants={fadeUp}
              transition={smoothTransition}
              className="
                mt-8

                text-5xl
                font-black
                leading-tight
                tracking-tight

                text-[#0f172a]

                md:text-6xl
                xl:text-7xl

                dark:text-white
              "
            >
              Gestiona tu empresa
              <span
                className="
                  mt-2
                  block

                  bg-gradient-to-r
                  from-[#274c77]
                  via-[#365d86]
                  to-[#6096ba]

                  bg-clip-text
                  text-transparent

                  dark:from-[#a3cef1]
                  dark:via-white
                  dark:to-[#6096ba]
                "
              >
                desde un solo lugar
              </span>
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="
                mt-7
                max-w-2xl

                text-lg
                leading-relaxed

                text-[#365d86]

                dark:text-[#cbd5e1]
              "
            >
              Administra ventas, inventario, compras, reportes y múltiples
              sucursales con una plataforma moderna, rápida y diseñada para
              empresas en crecimiento.
            </motion.p>

            {/* FEATURES */}
            <motion.div
              variants={staggerContainer}
              className="
                mt-10
                grid
                gap-4

                sm:grid-cols-3
              "
            >
              {heroFeatures.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeScale}
                    transition={springTransition}
                    whileHover={hoverLift}
                    className="
                      rounded-3xl

                      border
                      border-[#d7e0e7]

                      bg-white/60

                      p-4

                      shadow-lg
                      shadow-[#274c77]/5

                      backdrop-blur-xl

                      dark:border-white/10
                      dark:bg-white/5
                    "
                  >
                    <motion.div whileHover={hoverScale}>
                      <Icon
                        className="
                          text-[#274c77]
                          dark:text-[#a3cef1]
                        "
                        size={24}
                      />
                    </motion.div>

                    <h3
                      className="
                        mt-4
                        font-bold

                        text-[#0f172a]

                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm

                        text-[#365d86]

                        dark:text-[#cbd5e1]
                      "
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ACTIONS */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="
                mt-12
                flex
                flex-wrap
                items-center
                gap-4
              "
            >
              <motion.div whileHover={hoverScale}>
                <ModernButton text="Comenzar Ahora" icon={ArrowRight} />
              </motion.div>

              <motion.div whileHover={hoverScale}>
                <ModernButton text="Ver Demo" icon={Play} variant="secondary" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
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

                bg-[#6096ba]/10

                blur-3xl

                dark:bg-[#6096ba]/20
              "
            />

            <motion.img
              whileHover={{
                scale: 1.03,
                rotate: 0.3,
              }}
              transition={{
                duration: 0.4,
              }}
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
              alt="ERP POS"
              className="
                relative

                h-full
                w-full

                rounded-3xl

                object-cover

                shadow-2xl
                shadow-[#274c77]/20
              "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
