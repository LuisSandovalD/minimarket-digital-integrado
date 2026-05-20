import { Boxes } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarBrand() {
  return (
    <Link
      to="/"
      className="
        group
        relative

        flex
        items-center
        gap-4
      "
    >
      {/* LOGO */}
      <div
        className="
          relative

          flex
          h-14
          w-14
          items-center
          justify-center

          overflow-hidden

          rounded-[20px]

          border
          border-white/20

          bg-gradient-to-br
          from-[#0f172a]
          via-[#132238]
          to-[#1e3a5f]

          shadow-[0_10px_40px_-12px_rgba(39,76,119,0.55)]

          backdrop-blur-xl

          transition-all
          duration-500

          group-hover:-translate-y-1
          group-hover:rotate-3
          group-hover:shadow-[0_20px_60px_-12px_rgba(96,150,186,0.45)]

          dark:border-white/10
        "
      >
        {/* INNER GLOW */}
        <div
          className="
            absolute
            inset-[1px]

            rounded-[18px]

            bg-gradient-to-br
            from-white/10
            to-transparent
          "
        />

        {/* FLOAT LIGHT */}
        <div
          className="
            absolute
            -left-10
            top-0

            h-20
            w-8

            rotate-12

            bg-white/10

            blur-xl

            transition-all
            duration-700

            group-hover:left-16
          "
        />

        {/* CENTER GLOW */}
        <div
          className="
            absolute

            h-10
            w-10

            rounded-full

            bg-cyan-400/20

            blur-2xl
          "
        />

        <Boxes
          size={24}
          className="
            relative
            z-10

            text-white

            transition-all
            duration-500

            group-hover:scale-110
          "
        />
      </div>

      {/* TEXT */}
      <div className="relative">
        <h1
          className="
            text-[1.05rem]
            font-black
            tracking-[-0.03em]

            text-[#0f172a]

            transition-all
            duration-300

            group-hover:text-[#274c77]

            dark:text-white
            dark:group-hover:text-[#a3cef1]
          "
        >
          ERP POS
        </h1>

        <div
          className="
            mt-1

            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-1
              w-1

              rounded-full

              bg-[#6096ba]
            "
          />

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.24em]

              text-[#6096ba]

              dark:text-[#8fb8d8]
            "
          >
            Multiempresa
          </p>
        </div>
      </div>
    </Link>
  );
}
