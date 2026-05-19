import {
  ArrowRight,
  Play,
  ShieldCheck,
  BarChart3,
  Boxes,
} from "lucide-react";

import {
  ModernButton,
} from "@/components/buttons";

import { heroFeatures } from "../constants/heroFeatures";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        px-6
        h-[92vh]
        py-28
        lg:px-10
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

        {/* LIGHT MODE OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#f8fbfd]/95
            via-[#eef4f8]/90
            to-[#dbeafe]/85
            dark:from-[#0f172a]/95
            dark:via-[#0f172a]/85
            dark:to-[#274c77]/80
          "
        />

        {/* EXTRA SHADOW */}
        <div
          className="
            absolute
            inset-0
            bg-white/20
            dark:bg-black/30
          "
        />
      </div>

      {/* LIGHT EFFECTS */}
      <div
        className="
          absolute
          left-0
          top-0
          -z-10
          h-96
          w-96
          rounded-full
          bg-[#6096ba]/15
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          -z-10
          h-96
          w-96
          rounded-full
          bg-[#274c77]/10
          blur-3xl
          dark:bg-[#274c77]/30
        "
      />

      <div className="px-20">
        <div
          className="
            grid
            items-center
            gap-20
            lg:grid-cols-2
          "
        >
          {/* LEFT */}
          <div>
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d7e0e7]
                bg-white/70
                px-5
                py-2.5
                text-sm
                font-semibold
                tracking-wide
                text-[#274c77]
                shadow-lg
                shadow-[#274c77]/5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/5
                dark:text-[#dbeafe]
              "
            >
              <ShieldCheck size={16} />

              ERP • POS • Multiempresa
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
              Gestiona tu empresa

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
                desde un solo lugar
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-7
                max-w-2xl

                text-lg
                leading-relaxed

                text-[#365d86]

                dark:text-[#cbd5e1]
              "
            >
              Administra ventas, inventario,
              compras, reportes y múltiples
              sucursales con una plataforma
              moderna, rápida y diseñada para
              empresas en crecimiento.
            </p>

            {/* FEATURES */}
            <div
              className="
                mt-10
                grid
                gap-4

                sm:grid-cols-3
              "
            >
              {heroFeatures.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      rounded-3xl
                      border
                      border-[#d7e0e7]
                      bg-white/60
                      p-4
                      shadow-lg
                      shadow-[#274c77]/5
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                      dark:border-white/10
                      dark:bg-white/5
                    "
                  >
                    <Icon
                      className="
                        text-[#274c77]
                        dark:text-[#a3cef1]
                      "
                      size={24}
                    />

                    <h3
                      className="
                        mt-4
                        font-bold
                        text-[#0f172a]
                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-[#365d86]
                        dark:text-[#cbd5e1]
                      "
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div
              className="
                mt-12
                flex
                flex-wrap
                items-center
                gap-4
              "
            >
              <ModernButton
                text="Comenzar Ahora"
                icon={ArrowRight}
                className="
                  bg-gradient-to-r
                  from-[#274c77]
                  via-[#365d86]
                  to-[#6096ba]
                  shadow-2xl
                  shadow-[#274c77]/20
                "
              />

              <ModernButton
                text="Ver Demo"
                icon={Play}
                variant="secondary"
                className="
                  border-[#d7e0e7]
                  bg-white/70
                  text-[#274c77]
                  shadow-lg
                  shadow-[#274c77]/5
                  backdrop-blur-xl
                  hover:bg-white
                  dark:border-white/10
                  dark:bg-white/10
                  dark:text-white
                  dark:hover:bg-white/20
                "
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            
            {/* GLOW */}
            <div
              className="
                absolute
                inset-0
                
                bg-[#6096ba]/10
                blur-3xl
                dark:bg-[#6096ba]/20
              "
            />

              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
                alt="ERP POS"
                className="
                  h-full
                  w-full
                  relative
                  object-cover
                  rounded-3xl
                  shadow-2xl
                  shadow-[#274c77]/20
                  transition-transform
                  duration-300
                  hover:scale-[1.02]
                  
                "
              />

              
          </div>
        </div>
      </div>
    </section>
  );
}