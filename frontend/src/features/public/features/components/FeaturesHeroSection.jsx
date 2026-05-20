import { ArrowRight, Play, ShieldCheck } from "lucide-react";

import { ModernButton } from "@/components/buttons";

export default function FeaturesHeroSection() {
  return (
    <section
      className="
        relative
        isolate

        flex
        justify-center
        items-center

        w-full

        p-4

        lg:h-[92vh]

        md:h-screen

      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
          alt="ERP POS"
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-[#f8fbfd]/95
            via-[#eef4f8]/90
            to-[#dbeafe]/80

            dark:from-[#020617]/95
            dark:via-[#07111f]/90
            dark:to-[#274c77]/70
          "
        />

        {/* EXTRA SHADOW */}
        <div
          className="
            absolute
            inset-0

            bg-white/10
            dark:bg-black/30
          "
        />
      </div>

      {/* LIGHTS */}
      <div
        className="
          absolute
          left-[-100px]
          top-[-100px]
          -z-10

          h-80
          w-80

          rounded-full

          bg-[#6096ba]/15
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-100px]
          right-[-100px]
          -z-10

          h-80
          w-80

          rounded-full

          bg-[#274c77]/10
          blur-3xl

          dark:bg-[#274c77]/30
        "
      />

      <div
        className="
          grid
          items-center
          gap-16

          lg:grid-cols-2
        "
      >
        {/* LEFT */}
        <div className="relative z-10">
          {/* BADGE */}
          <div
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

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/5
              dark:text-[#dbeafe]
            "
          >
            <ShieldCheck size={16} />
            Funciones Empresariales
          </div>

          {/* TITLE */}
          <h1
            className="
              mt-8

              text-5xl
              font-black
              leading-tight
              tracking-tight

              text-[#0f172a]

              md:text-6xl
              xl:text-7xl

              dark:text-white
            "
          >
            Funciones avanzadas para empresas modernas
            <span
              className="
                mt-2
                block

                bg-gradient-to-r
                from-[#274c77]
                via-[#365d86]
                to-[#6096ba]

                bg-clip-text
                text-transparent

                dark:from-[#a3cef1]
                dark:via-white
                dark:to-[#6096ba]
              "
            >
              rápidas, seguras y escalables
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              max-w-2xl

              text-lg
              leading-relaxed

              text-[#365d86]

              dark:text-[#cbd5e1]
            "
          >
            Descubre herramientas diseñadas para optimizar ventas, inventario,
            seguridad, analíticas, reportes y automatización empresarial desde
            una experiencia moderna e intuitiva.
          </p>

          {/* MESSAGE */}
          <div
            className="
              mt-8

              rounded-3xl

              border
              border-[#d7e0e7]

              bg-white/40
              p-6

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <p
              className="
                text-base
                leading-relaxed

                text-[#365d86]

                dark:text-[#cbd5e1]
              "
            >
              Cada funcionalidad del sistema está enfocada en mejorar la
              productividad, automatizar tareas, centralizar operaciones y
              brindar un mayor control empresarial en tiempo real.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div
            className="
              absolute
              inset-0

              rounded-[40px]

              bg-[#6096ba]/10
              blur-3xl
            "
          />

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
            alt="ERP POS"
            className="
              relative

              h-full
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
