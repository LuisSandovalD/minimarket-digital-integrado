// inventory/components/MultiWarehouseSection.jsx

import { Building2 } from "lucide-react";

export default function MultiWarehouseSection() {
  return (
    <section className="py-24">
      <div
        className="
          grid
          items-center
          gap-20

          lg:grid-cols-[1fr_1.6fr]
          max-w-7xl
          mx-auto
        "
      >
        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-slate-200

              bg-slate-50

              px-4
              py-1.5

              text-sm
              font-semibold

              text-[#6096ba]

              dark:border-white/10
              dark:bg-white/[0.03]
              dark:text-[#a3cef1]
            "
          >
            <Building2 size={15} />
            Multi Almacén
          </span>

          <h2
            className="
              mt-6

              text-4xl
              font-black
              leading-tight

              text-[#0f172a]

              dark:text-white

              md:text-5xl
            "
          >
            Centraliza todos
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
              tus almacenes
            </span>
          </h2>

          <p
            className="
              mt-7

              text-lg
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]
            "
          >
            Gestiona múltiples ubicaciones y controla transferencias internas
            desde una plataforma moderna y sincronizada.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div
            className="
              absolute
              inset-0

              rounded-[36px]

              bg-gradient-to-tr
              from-cyan-500/20
              to-blue-500/20

              blur-2xl
            "
          />

          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Multi Warehouse"
            className="
              relative
              z-10

              h-[580px]
              w-full

              rounded-[36px]

              border
              border-[#d7e0e7]

              object-cover

              shadow-2xl

              dark:border-white/10
            "
          />
        </div>
      </div>
    </section>
  );
}
