import { Link, useLocation } from "react-router-dom";

export default function MobileMenuLinks({ links }) {
  const location = useLocation();

  return (
    <nav className="flex flex-1 flex-col overflow-y-auto p-4 space-y-1">
      {links.map((link, index) => {
        const isActive = location.pathname === link.href;

        return (
          <Link
            key={index}
            to={link.href}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              px-5
              py-4

              text-base
              font-semibold
              tracking-wide

              transition-all
              duration-300

              hover:-translate-y-0.5

              ${
                isActive
                  ? `
                    bg-[#e7ecef]
                    text-[#1f3c5d]

                    dark:bg-[#365d86]/20
                    dark:text-white
                  `
                  : `
                    text-[#274c77]

                    hover:bg-[#e7ecef]
                    hover:text-[#1f3c5d]

                    dark:text-[#a3cef1]
                    dark:hover:bg-[#365d86]/20
                    dark:hover:text-white
                  `
              }
            `}
          >
            {/* BACKGROUND EFFECT */}
            <span
              className={`
                absolute
                inset-0

                bg-gradient-to-r
                from-[#a3cef1]/0
                via-[#a3cef1]/10
                to-[#a3cef1]/0

                transition-opacity
                duration-300

                dark:via-[#6096ba]/10

                ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }
              `}
            />

            {/* LEFT ACCENT */}
            <span
              className={`
                absolute
                left-0
                top-1/2

                w-1
                -translate-y-1/2
                rounded-full

                bg-gradient-to-b
                from-[#6096ba]
                to-[#a3cef1]

                transition-all
                duration-300

                ${
                  isActive
                    ? "h-10 opacity-100"
                    : "h-0 opacity-0 group-hover:h-8 group-hover:opacity-100"
                }
              `}
            />

            {/* LIGHT EFFECT */}
            <span
              className="
                absolute
                -left-10
                top-0

                h-full
                w-8

                rotate-12

                bg-white/10

                blur-md

                transition-all
                duration-500

                group-hover:left-[120%]
              "
            />

            {/* TEXT */}
            <span className="relative z-10">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
