import { Link, useLocation } from "react-router-dom";

export default function NavbarLinks({ links }) {
  const location = useLocation();

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {links.map((link, index) => {
        const isActive = location.pathname === link.href;

        return (
          <Link
            key={index}
            to={link.href}
            className={`group relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
              isActive
                ? "bg-[#e7ecef] text-[#1f3c5d] dark:bg-[#365d86]/20 dark:text-white"
                : "text-[#274c77] hover:bg-[#e7ecef] hover:text-[#1f3c5d] dark:text-[#dbe7f0] dark:hover:bg-[#365d86]/20 dark:hover:text-white"
            }`}
          >
            {/* BACKGROUND EFFECT */}
            <span
              className={`absolute inset-0 bg-gradient-to-r from-[#a3cef1]/0 via-[#a3cef1]/10 to-[#a3cef1]/0 transition-opacity duration-300 dark:via-[#6096ba]/10 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />

            {/* BOTTOM LINE */}
            <span
              className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#6096ba] to-[#a3cef1] transition-all duration-300 ${
                isActive ? "w-10" : "w-0 group-hover:w-8"
              }`}
            />

            {/* LIGHT EFFECT */}
            <span className="absolute -left-10 top-0 h-full w-8 rotate-12 bg-white/10 blur-md transition-all duration-500 group-hover:left-[120%]" />

            {/* TEXT */}
            <span className="relative z-10">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
