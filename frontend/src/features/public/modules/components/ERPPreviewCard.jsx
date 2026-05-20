// models/components/ERPPreviewCard.jsx

import { ArrowUpRight } from "lucide-react";

import { motion } from "framer-motion";

import { fadeUp, smoothTransition } from "@/components/effects/";

export default function ERPPreviewCard({
  title,
  description,
  icon: Icon,
  image,
  delay = 0,
}) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      variants={fadeUp}
      transition={{
        ...smoothTransition,
        delay,
      }}
      className="
        group
        relative
        overflow-hidden

        rounded-[32px]

        border
        border-[#d7e0e7]

        bg-white/40

        backdrop-blur-xl

        transition-all
        duration-500

        hover:-translate-y-2
        hover:border-[#6096ba]/40

        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
        "
      >
        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover

            transition-transform
            duration-700

            group-hover:scale-105
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/50
            via-black/10
            to-transparent
          "
        />

        {/* FLOAT ICON */}
        <div
          className="
            absolute
            left-6
            top-6

            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-white/15
            text-white

            backdrop-blur-xl
          "
        >
          <Icon size={26} />
        </div>

        {/* ACTION */}
        <div
          className="
            absolute
            right-6
            top-6

            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            bg-white/15
            text-white

            opacity-0

            backdrop-blur-xl

            transition-all
            duration-300

            group-hover:opacity-100
          "
        >
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">
        {/* TITLE */}
        <h3
          className="
            text-2xl
            font-black
            tracking-tight

            text-[#0f172a]

            transition-colors
            duration-300

            group-hover:text-[#274c77]

            dark:text-white
            dark:group-hover:text-[#a3cef1]
          "
        >
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4
            leading-relaxed

            text-[#5b6472]

            dark:text-[#cbd5e1]
          "
        >
          {description}
        </p>

        {/* FOOTER */}
        <div
          className="
            mt-8

            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              rounded-full

              border
              border-[#d7e0e7]

              px-4
              py-2

              text-xs
              font-semibold

              text-[#274c77]

              dark:border-white/10
              dark:text-[#a3cef1]
            "
          >
            ERP Module
          </span>

          <button
            className="
              text-sm
              font-semibold

              text-[#274c77]

              transition-all
              duration-300

              hover:text-[#6096ba]

              dark:text-[#a3cef1]
            "
          >
            Explorar
          </button>
        </div>
      </div>

      {/* GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-50px]
          top-[-50px]

          h-40
          w-40

          rounded-full

          bg-[#6096ba]/10

          opacity-0
          blur-3xl

          transition-all
          duration-500

          group-hover:opacity-100
        "
      />
    </motion.article>
  );
}
