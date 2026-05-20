// inventory/components/CategoriesSection.jsx
import { ArrowRight } from "lucide-react";
import { categories } from "../constants/categories";
export default function CategoriesSection() {
  return (
    <section className="relative py-8 lg:py-12">
      <div className="relative space-y-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-7xl">
          {/* BADGE */}
          <span
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              rounded-full
              bg-[#6096ba]/10
              text-xs
              font-semibold
              text-[#6096ba]
              dark:bg-[#6096ba]/20
              dark:text-[#a3cef1]
            "
          >
            <div className="h-2 w-2 rounded-full bg-[#6096ba]" />
            Categorías
          </span>

          {/* TITLE */}
          <h2
            className="
              mt-4
              text-4xl
              md:text-5xl
              font-black
              leading-tight
              text-[#0f172a]
              dark:text-white
            "
          >
            Organiza tus
            <span
              className="
                block
                mt-2
                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]
                bg-clip-text
                text-transparent
              "
            >
              productos fácilmente
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              text-base
              leading-relaxed
              text-[#5b6472]
              dark:text-[#cbd5e1]
              max-w-2xl
            "
          >
            Clasifica productos, marcas y tipos de inventario para una gestión
            más eficiente y una búsqueda rápida en tu sistema.
          </p>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#d7e0e7]
                  bg-white/40
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#6096ba]/50
                  hover:bg-white/60
                  hover:shadow-lg
                  hover:-translate-y-1
                  dark:border-white/10
                  dark:bg-white/[0.05]
                  dark:hover:border-white/20
                  dark:hover:bg-white/10
                "
              >
                {/* BACKGROUND ACCENT */}
                <div
                  className={`
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-gradient-to-br
                    ${category.color}
                    opacity-10
                    blur-2xl
                    transition-all
                    duration-300
                    group-hover:scale-150
                  `}
                />

                {/* CONTENT */}
                <div className="relative z-10 space-y-4">
                  {/* ICON */}
                  <div
                    className={`
                      inline-flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-lg
                      bg-gradient-to-br
                      ${category.color}
                      text-white
                      transition-transform
                      duration-300
                      group-hover:scale-110
                      group-hover:-translate-y-1
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  {/* LABEL */}
                  <div>
                    <h3
                      className="
                        text-lg
                        font-bold
                        text-[#0f172a]
                        dark:text-white
                        transition-colors
                        duration-300
                        group-hover:text-[#274c77]
                        dark:group-hover:text-[#a3cef1]
                      "
                    >
                      {category.label}
                    </h3>
                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#5b6472]
                        dark:text-[#cbd5e1]
                      "
                    >
                      {category.count} productos
                    </p>
                  </div>
                </div>

                {/* BOTTOM BORDER ACCENT */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-0
                    bg-gradient-to-r
                    from-[#6096ba]
                    to-[#a3cef1]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />
              </div>
            );
          })}
        </div>

        {/* BOTTOM INFO SECTION */}
        <div
          className="
            mt-8
            p-6
            lg:p-8
            rounded-2xl
            border
            border-[#d7e0e7]
            bg-white/30
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/[0.02]
          "
        >
          <div className="grid gap-6 md:grid-cols-5">
            {/* Stat 1 */}
            <div className="space-y-2">
              <p
                className="
                  text-xs
                  font-semibold
                  text-[#6096ba]
                  dark:text-[#a3cef1]
                  uppercase
                  tracking-wide
                "
              >
                Total categorías
              </p>
              <p className="text-3xl font-black text-[#274c77] dark:text-[#a3cef1]">
                6
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-16 w-px bg-[#d7e0e7] dark:bg-white/10 mx-auto" />

            {/* Stat 2 */}
            <div className="space-y-2">
              <p
                className="
                  text-xs
                  font-semibold
                  text-[#6096ba]
                  dark:text-[#a3cef1]
                  uppercase
                  tracking-wide
                "
              >
                Productos registrados
              </p>
              <p className="text-3xl font-black text-[#274c77] dark:text-[#a3cef1]">
                18K+
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-16 w-px bg-[#d7e0e7] dark:bg-white/10 mx-auto" />

            {/* Stat 3 */}
            <div className="space-y-2">
              <p
                className="
                  text-xs
                  font-semibold
                  text-[#6096ba]
                  dark:text-[#a3cef1]
                  uppercase
                  tracking-wide
                "
              >
                Búsquedas por minuto
              </p>
              <p className="text-3xl font-black text-[#274c77] dark:text-[#a3cef1]">
                +450
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
