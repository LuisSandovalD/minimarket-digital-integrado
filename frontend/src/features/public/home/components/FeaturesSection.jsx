import { AnimatePresence, motion } from "framer-motion";

import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

import { useState } from "react";

import { features } from "../constants/feactures";

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

export default function FeaturesSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll ? features : features.slice(0, 6);

  return (
    <section
      id="features"
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

            h-[600px]
            w-[600px]

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
          className="max-w-3xl"
        >
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

              bg-white/40

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
            <Sparkles size={16} />
            Funciones inteligentes
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="
              mt-7
              text-4xl
              font-black
              leading-tight
              tracking-tight

              text-[#0f172a]

              dark:text-white

              md:text-5xl
            "
          >
            Todo lo que necesitas
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
              para administrar tu negocio
            </span>
          </motion.h2>

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
            Un sistema ERP POS moderno, rápido y escalable diseñado para ventas,
            inventario, reportes, seguridad y gestión multiempresa.
          </motion.p>
        </motion.div>

        {/* GRID */}
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
            xl:grid-cols-3
          "
        >
          <AnimatePresence>
            {visibleFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  exit={{
                    opacity: 0,
                    y: 20,
                  }}
                  transition={smoothTransition}
                  whileHover={hoverLift}
                  className="
                      group
                      relative
                      overflow-hidden

                      rounded-[34px]

                      border
                      border-[#d7e0e7]

                      bg-white/60

                      backdrop-blur-2xl

                      shadow-xl
                      shadow-[#274c77]/5

                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                >
                  {/* IMAGE */}
                  <div
                    className="
                        relative
                        h-56
                        overflow-hidden
                      "
                  >
                    <motion.img
                      whileHover={{
                        scale: 1.1,
                      }}
                      transition={{
                        duration: 0.7,
                      }}
                      src={feature.image}
                      alt={feature.title}
                      className="
                          h-full
                          w-full
                          object-cover
                        "
                    />

                    {/* OVERLAY */}
                    <div
                      className="
                          absolute
                          inset-0

                          bg-gradient-to-t
                          from-[#020617]
                          via-[#020617]/20
                          to-transparent
                        "
                    />

                    {/* ICON */}
                    <motion.div
                      whileHover={hoverScale}
                      transition={{
                        duration: 0.3,
                      }}
                      className={`
                          absolute
                          left-6
                          top-6

                          flex
                          h-16
                          w-16
                          items-center
                          justify-center

                          rounded-3xl

                          bg-gradient-to-br
                          ${feature.color}

                          text-white

                          shadow-2xl
                        `}
                    >
                      <Icon size={28} />
                    </motion.div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8">
                    <div
                      className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                    >
                      <h3
                        className="
                            text-2xl
                            font-black
                            leading-tight

                            text-[#0f172a]

                            transition-colors
                            duration-300

                            group-hover:text-[#274c77]

                            dark:text-white
                          "
                      >
                        {feature.title}
                      </h3>

                      <motion.div
                        whileHover={{
                          rotate: 45,
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center

                            rounded-2xl

                            border
                            border-[#d7e0e7]

                            bg-white/60

                            text-[#274c77]

                            backdrop-blur-xl

                            transition-all
                            duration-300

                            group-hover:bg-[#274c77]
                            group-hover:text-white

                            dark:border-white/10
                            dark:bg-white/5
                            dark:text-[#a3cef1]
                          "
                      >
                        <ArrowUpRight size={18} />
                      </motion.div>
                    </div>

                    <p
                      className="
                          mt-5
                          text-[15px]
                          leading-relaxed

                          text-[#5b6472]

                          dark:text-[#cbd5e1]
                        "
                    >
                      {feature.description}
                    </p>

                    {/* FOOTER */}
                    <div
                      className="
                          mt-8
                          flex
                          items-center
                          gap-2

                          text-sm
                          font-semibold

                          text-[#274c77]

                          dark:text-[#a3cef1]
                        "
                    >
                      <div
                        className="
                            h-2
                            w-2
                            rounded-full
                            bg-[#6096ba]
                          "
                      />
                      Sistema optimizado
                    </div>
                  </div>

                  {/* GLOW */}
                  <div
                    className="
                        pointer-events-none
                        absolute
                        right-[-60px]
                        top-[-60px]

                        h-40
                        w-40

                        rounded-full

                        bg-[#6096ba]/10

                        blur-3xl

                        opacity-0

                        transition-all
                        duration-500

                        group-hover:opacity-100
                      "
                  />
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* BUTTON */}
        {features.length > 6 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={defaultViewport}
            transition={smoothTransition}
            className="
              mt-16
              flex
              justify-center
            "
          >
            <motion.button
              whileHover={hoverLift}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() => setShowAll(!showAll)}
              className="
                group

                inline-flex
                items-center
                gap-3

                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/60

                px-7
                py-4

                text-sm
                font-semibold

                text-[#274c77]

                shadow-lg
                shadow-[#274c77]/5

                backdrop-blur-xl

                transition-all
                duration-300

                hover:border-[#6096ba]
                hover:bg-[#274c77]
                hover:text-white

                dark:border-white/10
                dark:bg-white/5
                dark:text-[#a3cef1]
                dark:hover:bg-[#274c77]
              "
            >
              {showAll ? (
                <>
                  Ver menos
                  <ChevronUp
                    size={18}
                    className="
                      transition-transform
                      duration-300
                    "
                  />
                </>
              ) : (
                <>
                  Ver más características
                  <ChevronDown
                    size={18}
                    className="
                      transition-transform
                      duration-300
                    "
                  />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
