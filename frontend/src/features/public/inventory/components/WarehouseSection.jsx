// inventory/components/WarehouseSection.jsx

import { useState } from "react";
import {
  Building2,
  MapPin,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import { warehouses } from "../constants/warehouses";

export default function WarehouseSection() {
  const [activeWarehouse, setActiveWarehouse] = useState(0);

  const activeData = warehouses[activeWarehouse];
  const ActiveIcon = activeData.icon;

  return (
    <section className="relative py-8 lg:py-12">

      <div className="relative grid gap-10 lg:gap-16 lg:grid-cols-12 items-center max-w-7xl mx-auto">
        
        {/* LEFT COLUMN - CONTENT + TABS */}
        <div className="lg:col-span-5 space-y-8 ">
          {/* HEADER */}
          <div className="space-y-4">
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
              <Building2 size={14} />
              Almacenes
            </span>

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
                Control de
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
                múltiples almacenes
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
              Administra stock por sucursal, almacén o sede desde una sola
              plataforma con sincronización instantánea.
            </p>
          </div>

         
          {/* ACTIVE WAREHOUSE INFO */}
          <div
            className="
              p-5
              rounded-2xl
              border
              border-[#d7e0e7]
              bg-white/50
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-white/[0.05]
            "
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] font-semibold">
                  Productos
                </p>
                <p className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1] mt-1">
                  {activeData.products}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] font-semibold">
                  Capacidad
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-[#d7e0e7] rounded-full overflow-hidden dark:bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#6096ba] to-[#a3cef1] transition-all duration-300"
                      style={{ width: activeData.capacity }}
                    />
                  </div>
                  <p className="text-sm font-bold text-[#274c77] dark:text-[#a3cef1] min-w-fit">
                    {activeData.capacity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - IMAGE */}
        <div className="lg:col-span-7">
          <div
            className="
              relative
              rounded-3xl
              overflow-hidden
              border
              border-[#d7e0e7]
              shadow-2xl
              dark:border-white/10
            "
          >
            <div className="relative h-72 md:h-80 lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
                alt="Warehouse"
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
                  bg-gradient-to-b
                  from-transparent
                  via-transparent
                  to-[#0f172a]/40
                  dark:to-[#020617]/50
                "
              />

              {/* FLOATING BADGE */}
              <div
                className="
                  absolute
                  top-4
                  left-4
                  z-10
                  px-4
                  py-2
                  rounded-full
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-white/50
                  dark:bg-white/10
                  dark:border-white/20
                  flex
                  items-center
                  gap-2
                "
              >
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-[#0f172a] dark:text-white">
                  Sincronizado
                </span>
              </div>

              {/* WAREHOUSE STATS OVERLAY */}
              <div
                className="
                  absolute
                  bottom-4
                  right-4
                  z-10
                "
              >
                <div
                  className="
                    rounded-2xl
                    bg-white/85
                    backdrop-blur-xl
                    border
                    border-white/50
                    p-4
                    shadow-lg
                    dark:bg-white/[0.08]
                    dark:border-white/20
                    min-w-fit
                  "
                >
                  <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] font-semibold mb-2">
                    {activeData.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#6096ba] to-[#274c77] flex items-center justify-center text-white">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1]">
                        Estado
                      </p>
                      <p className="text-sm font-bold text-[#0f172a] dark:text-white">
                        Activo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}