import { Link } from "react-router-dom";

export default function MobileMenuLinks({
  links,
}) {
  return (
    <nav className="flex flex-1 flex-col overflow-y-auto p-4 space-y-1">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.href}
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            px-5
            py-4
            text-base
            font-semibold
            text-[#274c77]
            transition-all
            duration-300
            hover:text-[#1f3c5d]

            dark:text-[#a3cef1]
            dark:hover:text-white
          "
        >
          {/* BACKGROUND */}
          <span
            className="
              absolute
              inset-0
              rounded-2xl
              bg-[#e7ecef]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100

              dark:bg-[#365d86]/20
            "
          />

          {/* BORDER ACCENT */}
          <span
            className="
              absolute
              left-0
              top-0
              h-full
              w-1
              rounded-full
              bg-gradient-to-b
              from-[#6096ba]
              to-[#a3cef1]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />

          {/* TEXT */}
          <span className="relative z-10">
            {link.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}