// models/components/ModulePreview.jsx

import { Layers3, ArrowRight } from "lucide-react";

import { useState } from "react";

import { modules } from "../constants/modules";

import ERPPreviewCard from "./ERPPreviewCard";

export default function ModulePreview() {
  const [showAll, setShowAll] = useState(false);

  const visibleModules = showAll ? modules : modules.slice(0, 6);

  return (
    <section
      className="
        relative
        py-14
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div
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
            <div
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

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-[#a3cef1]
              "
            >
              <Layers3 size={16} />
              Módulos Empresariales
            </div>

            {/* TITLE */}
            <h2
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
              Gestiona toda tu empresa
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
                desde una sola plataforma
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6
                max-w-2xl

                text-lg
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]
              "
            >
              Centraliza inventario, ventas, seguridad, analíticas, reportes,
              clientes y operaciones empresariales en un ecosistema moderno,
              rápido y escalable.
            </p>
          </div>

          {/* INFO */}
          <div
            className="
              flex
              items-center
              gap-4

              rounded-3xl

              border
              border-[#d7e0e7]

              bg-white/30
              px-6
              py-5

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                bg-gradient-to-br
                from-[#274c77]
                to-[#6096ba]

                text-white
              "
            >
              <Layers3 size={24} />
            </div>

            <div>
              <h4
                className="
                  text-lg
                  font-bold

                  text-[#0f172a]

                  dark:text-white
                "
              >
                +12 módulos integrados
              </h4>

              <p
                className="
                  mt-1
                  text-sm

                  text-[#5b6472]

                  dark:text-[#cbd5e1]
                "
              >
                Diseñados para empresas modernas y escalables.
              </p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div
          className="
            mt-20

            grid
            gap-8

            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {visibleModules.map((item, index) => (
            <ERPPreviewCard key={index} {...item} />
          ))}
        </div>

        {/* BUTTON */}
        {modules.length > 6 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
                group

                inline-flex
                items-center
                gap-3

                rounded-2xl

                border
                border-[#d7e0e7]

                bg-white/40
                px-7
                py-4

                text-sm
                font-semibold

                text-[#274c77]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#6096ba]
                hover:bg-white/60

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-[#a3cef1]
                dark:hover:bg-white/[0.05]
              "
            >
              {showAll ? "Mostrar menos" : "Mostrar todos los módulos"}

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
