// inventory/components/BarcodeSection.jsx

import { ScanLine, Zap, TrendingUp, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: ScanLine,
    title: "Lectura instantánea",
    description: "Captura datos en menos de 1 segundo",
  },
  {
    icon: TrendingUp,
    title: "Sin errores",
    description: "Reduce errores manuales al 0%",
  },
  {
    icon: CheckCircle,
    title: "100% compatible",
    description: "Funciona con cualquier lector estándar",
  },
  {
    icon: Zap,
    title: "Velocidad máxima",
    description: "Procesa múltiples códigos simultáneamente",
  },
];

export default function BarcodeSection() {
  return (
    <section className="relative py-8 lg:py-12">
      <div className="relative grid gap-10 lg:gap-16 lg:grid-cols-12 items-center max-w-7xl mx-auto">
        {/* RIGHT COLUMN - IMAGE + STATS */}
        <div className="lg:col-span-7 space-y-5">
          {/* IMAGE */}
          <div
            className="
              relative
              rounded-3xl
              overflow-hidden
              border
              border-[#d7e0e7]
              shadow-xl
              dark:border-white/10
            "
          >
            <div className="relative h-72 md:h-80 lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                alt="Barcode Scanner"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-110
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-l
                  from-[#0f172a]/40
                  via-transparent
                  to-white/5
                  dark:from-[#020617]/50
                  dark:via-transparent
                  dark:to-white/5
                "
              />

              {/* FLOATING STAT */}
              <div
                className="
                  absolute
                  bottom-4
                  right-4
                  z-10
                  px-5
                  py-4
                  rounded-2xl
                  bg-white/85
                  backdrop-blur-xl
                  border
                  border-white/50
                  shadow-lg
                  dark:bg-white/[0.08]
                  dark:border-white/20
                "
              >
                <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] font-semibold mb-1">
                  Velocidad promedio
                </p>
                <p className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1]">
                  0.8s
                </p>
                <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] mt-1">
                  por escaneo
                </p>
              </div>
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="
                p-4
                rounded-xl
                border
                border-[#d7e0e7]
                bg-white/50
                backdrop-blur-sm
                dark:border-white/10
                dark:bg-white/[0.05]
              "
            >
              <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] font-semibold mb-2">
                Precisión
              </p>
              <p className="text-3xl font-black text-[#274c77] dark:text-[#a3cef1]">
                99.9%
              </p>
            </div>

            <div
              className="
                p-4
                rounded-xl
                border
                border-[#d7e0e7]
                bg-white/50
                backdrop-blur-sm
                dark:border-white/10
                dark:bg-white/[0.05]
              "
            >
              <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] font-semibold mb-2">
                Reducción de errores
              </p>
              <p className="text-3xl font-black text-[#274c77] dark:text-[#a3cef1]">
                -95%
              </p>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN - CONTENT */}
        <div className="lg:col-span-5 space-y-6">
          {/* ICON */}
          <div
            className="
              inline-flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-[#6096ba]
              to-[#274c77]
              text-white
              shadow-lg
            "
          >
            <ScanLine size={24} />
          </div>

          {/* TITLE */}
          <div>
            <h2
              className="
                text-4xl
                md:text-5xl
                font-black
                leading-tight
                text-[#0f172a]
                dark:text-white
              "
            >
              Escaneo
            </h2>
            <h2
              className="
                text-4xl
                md:text-5xl
                font-black
                leading-tight
                mt-1
                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]
                bg-clip-text
                text-transparent
              "
            >
              rápido
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p
            className="
              text-base
              leading-relaxed
              text-[#5b6472]
              dark:text-[#cbd5e1]
              max-w-lg
            "
          >
            Compatible con lectores de códigos para acelerar ventas y
            movimientos de inventario en tiempo real.
          </p>

          {/* BENEFITS GRID */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="
                    p-3
                    rounded-lg
                    border
                    border-[#d7e0e7]
                    bg-white/40
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:bg-white/60
                    hover:border-[#6096ba]/30
                    dark:border-white/10
                    dark:bg-white/[0.05]
                    dark:hover:bg-white/10
                  "
                >
                  <Icon
                    size={18}
                    className="text-[#6096ba] dark:text-[#a3cef1] mb-2"
                  />
                  <p className="text-xs font-bold text-[#0f172a] dark:text-white">
                    {benefit.title}
                  </p>
                  <p className="text-[10px] text-[#5b6472] dark:text-[#cbd5e1] mt-1">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
