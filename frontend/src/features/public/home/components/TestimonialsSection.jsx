import { motion } from "framer-motion";

import {
  Quote,
  Star,
  BadgeCheck,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useRef } from "react";

import { testimonials } from "../constants/testimonials";

import {
  fadeUp,
  fadeScale,
  staggerContainer,
  smoothTransition,
  springTransition,
  defaultViewport,
  hoverLift,
  hoverScale,
} from "@/components/animations";

export default function TestimonialsSection() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -420 : 420,

      behavior: "smooth",
    });
  };

  return (
    <section
      id="testimonials"
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
            right-0
            top-0

            h-[500px]
            w-[500px]

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
          className="
            flex
            flex-col
            gap-8

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
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
                dark:bg-white/5
                dark:text-[#a3cef1]
              "
            >
              <BadgeCheck size={16} />
              Clientes satisfechos
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
              Nuestro ERP POS multiempresa ayuda a negocios modernos a controlar
              inventario, ventas, reportes, seguridad y múltiples sucursales
              desde una sola plataforma.
            </motion.p>
          </div>

          {/* CONTROLS */}
          <motion.div
            variants={fadeScale}
            transition={springTransition}
            className="
              flex
              items-center
              gap-3
            "
          >
            <motion.button
              whileHover={hoverLift}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => scroll("left")}
              className="
                group

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/60

                text-[#274c77]

                shadow-lg
                shadow-[#274c77]/5

                backdrop-blur-xl

                transition-all
                duration-300

                hover:bg-[#274c77]
                hover:text-white

                dark:border-white/10
                dark:bg-white/5
                dark:text-[#a3cef1]
                dark:hover:bg-[#274c77]
              "
            >
              <ChevronLeft
                size={22}
                className="
                  transition-transform
                  duration-300

                  group-hover:-translate-x-1
                "
              />
            </motion.button>

            <motion.button
              whileHover={hoverLift}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => scroll("right")}
              className="
                group

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/60

                text-[#274c77]

                shadow-lg
                shadow-[#274c77]/5

                backdrop-blur-xl

                transition-all
                duration-300

                hover:bg-[#274c77]
                hover:text-white

                dark:border-white/10
                dark:bg-white/5
                dark:text-[#a3cef1]
                dark:hover:bg-[#274c77]
              "
            >
              <ChevronRight
                size={22}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* SLIDER */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          ref={sliderRef}
          className="
            mt-16

            flex
            gap-8

            overflow-x-auto
            scroll-smooth

            py-10

            snap-x
            snap-mandatory

            [&::-webkit-scrollbar]:hidden
          "
        >
          {testimonials.map((item, index) => (
            <motion.article
              key={index}
              variants={fadeUp}
              transition={{
                ...smoothTransition,
                delay: index * 0.08,
              }}
              whileHover={hoverLift}
              className="
                  group
                  relative

                  min-w-[320px]
                  max-w-[320px]

                  sm:min-w-[360px]
                  sm:max-w-[360px]

                  snap-center

                  overflow-hidden
                  rounded-[34px]

                  border
                  border-[#d7e0e7]

                  bg-white/85

                  p-8

                  shadow-lg
                  shadow-[#274c77]/5

                  backdrop-blur-2xl

                  dark:border-white/10
                  dark:bg-white/5
                  dark:shadow-black/30
                "
            >
              {/* TOP GRADIENT */}
              <div
                className="
                    absolute
                    inset-x-0
                    top-0

                    h-1.5

                    bg-gradient-to-r
                    from-[#274c77]
                    via-[#6096ba]
                    to-[#a3cef1]
                  "
              />

              {/* ICON */}
              <motion.div
                whileHover={hoverScale}
                transition={{
                  duration: 0.3,
                }}
                className="
                    relative

                    flex
                    h-16
                    w-16
                    items-center
                    justify-center

                    rounded-3xl

                    bg-gradient-to-br
                    from-[#274c77]
                    via-[#365d86]
                    to-[#6096ba]

                    text-white

                    shadow-2xl
                  "
              >
                <Quote size={28} />
              </motion.div>

              {/* STARS */}
              <div className="mt-7 flex gap-1">
                {Array.from({
                  length: item.rating,
                }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: i * 0.05,
                    }}
                    viewport={{
                      once: true,
                    }}
                  >
                    <Star
                      size={18}
                      className="
                          fill-yellow-400
                          text-yellow-400
                        "
                    />
                  </motion.div>
                ))}
              </div>

              {/* MESSAGE */}
              <p
                className="
                    mt-6
                    text-[15px]
                    leading-relaxed

                    text-[#5b6472]

                    dark:text-[#cbd5e1]
                  "
              >
                “{item.message}”
              </p>

              {/* USER */}
              <div
                className="
                    mt-8
                    flex
                    items-center
                    gap-4
                  "
              >
                <div className="relative">
                  <motion.img
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    src={item.avatar}
                    alt={item.name}
                    className="
                        h-16
                        w-16

                        rounded-2xl
                        object-cover

                        ring-4
                        ring-[#e7ecef]

                        dark:ring-white/10
                      "
                  />

                  {item.verified && (
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                      }}
                      viewport={{
                        once: true,
                      }}
                      className="
                          absolute
                          -bottom-1
                          -right-1

                          flex
                          h-6
                          w-6
                          items-center
                          justify-center

                          rounded-full

                          bg-[#274c77]
                          text-white
                        "
                    >
                      <BadgeCheck size={14} />
                    </motion.div>
                  )}
                </div>

                <div className="flex-1">
                  <h4
                    className="
                        font-bold
                        text-[#0f172a]

                        dark:text-white
                      "
                  >
                    {item.name}
                  </h4>

                  <p
                    className="
                        mt-1
                        text-sm
                        font-medium

                        text-[#274c77]

                        dark:text-[#a3cef1]
                      "
                  >
                    {item.role}
                  </p>

                  <div
                    className="
                        mt-1

                        flex
                        items-center
                        gap-1

                        text-xs

                        text-[#8b8c89]

                        dark:text-[#94a3b8]
                      "
                  >
                    <MapPin size={13} />

                    {item.location}
                  </div>
                </div>
              </div>

              {/* COMPANY */}
              <div
                className="
                    mt-7

                    rounded-3xl

                    border
                    border-[#d7e0e7]

                    bg-[#f8fbfd]

                    p-5

                    transition-all
                    duration-300

                    group-hover:border-[#6096ba]/40

                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
              >
                <div
                  className="
                      flex
                      items-center
                      justify-between
                    "
                >
                  <div>
                    <p
                      className="
                          text-xs
                          uppercase
                          tracking-[0.2em]

                          text-[#8b8c89]

                          dark:text-[#94a3b8]
                        "
                    >
                      Empresa
                    </p>

                    <h5
                      className="
                          mt-2
                          text-lg
                          font-bold

                          text-[#0f172a]

                          dark:text-white
                        "
                    >
                      {item.company}
                    </h5>
                  </div>

                  <span
                    className="
                        rounded-full

                        bg-emerald-500/10

                        px-4
                        py-1.5

                        text-xs
                        font-semibold

                        text-emerald-600

                        dark:text-emerald-400
                      "
                  >
                    Activo
                  </span>
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
