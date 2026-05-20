// models/components/InventoryPreview.jsx

import {
  motion,
} from "framer-motion";

import {
  Boxes,
  PackageCheck,
} from "lucide-react";

import {
  inventory,
} from "../constants/inventory";

import ERPPreviewCard from "./ERPPreviewCard";

import {
  fadeUp,
  fadeScale,
  staggerContainer,
  smoothTransition,
  springTransition,
  defaultViewport,
  hoverLift,
} from "@/components/animations";

export default function InventoryPreview() {
  return (
    <section
      className="
        relative
        overflow-hidden

        py-20

        sm:py-24
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
            opacity: [0.2, 0.45, 0.2],
            scale: [1, 1.08, 1],
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            absolute
            left-0
            top-0

            h-[500px]
            w-[500px]

            rounded-full

            bg-[#6096ba]/10

            blur-3xl
          "
        />
      </div>

      <div
        className="
          mx-auto
          max-w-7xl

          px-4

          sm:px-6
          md:px-8
          lg:px-10
        "
      >

        {/* HEADER */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}

          className="
            flex
            flex-col
            gap-8

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">

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

                bg-white/10

                px-4
                py-2

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
              <Boxes size={16} />

              Inventario Inteligente
            </motion.div>

            {/* TITLE */}
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

                dark:text-[#e7ecef]

                md:text-5xl
              "
            >
              Control total del stock

              <span
                className="
                  mt-2
                  block

                  bg-gradient-to-r
                  from-[#274c77]
                  via-[#6096ba]
                  to-[#a3cef1]

                  bg-clip-text
                  text-transparent
                "
              >
                en tiempo real
              </span>
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}

              className="
                mt-7
                max-w-2xl

                text-base
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]

                md:text-lg
              "
            >
              Supervisa productos,
              movimientos, almacenes,
              entradas, salidas y niveles
              de stock desde una sola
              plataforma moderna.
            </motion.p>
          </div>

          {/* RIGHT INFO */}
          <motion.div
            variants={fadeScale}
            transition={springTransition}

            whileHover={hoverLift}

            className="
              flex
              items-center
              gap-4

              rounded-2xl

              border
              border-[#d7e0e7]

              bg-white/10

              px-5
              py-4

              shadow-lg
              shadow-[#274c77]/5

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 4,
              }}

              transition={{
                duration: 0.3,
              }}

              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-xl

                bg-[#274c77]
                text-white

                shadow-lg
              "
            >
              <PackageCheck size={22} />
            </motion.div>

            <div>
              <h4
                className="
                  text-sm
                  font-bold

                  text-[#0f172a]

                  dark:text-white
                "
              >
                Gestión automática
              </h4>

              <p
                className="
                  text-xs

                  text-[#5b6472]

                  dark:text-[#cbd5e1]
                "
              >
                Control inteligente
                de inventario.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}

          className="
            mt-16

            grid
            gap-8

            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {inventory.map((item, index) => (
            <motion.div
              key={index}

              variants={fadeUp}

              transition={{
                ...smoothTransition,
                delay: index * 0.08,
              }}
            >
              <ERPPreviewCard
                {...item}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}