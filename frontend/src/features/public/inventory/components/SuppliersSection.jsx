// inventory/components/SuppliersSection.jsx
import { Shield, MapPin, Star, Clock, TrendingUp, Phone } from "lucide-react";
import { suppliers } from "../constants/suppliers";
export default function SuppliersSection() {
  return (
    <section className="relative py-8 lg:py-12">
      

      <div className="relative grid gap-10 lg:gap-16 lg:grid-cols-12 items-start max-w-7xl mx-auto">

        {/* LEFT COLUMN - IMAGE */}
        <div className="lg:col-span-4 order-2 lg:order-1  h-full">

          <div
            className="
              relative
              rounded-3xl
              overflow-hidden
              h-full
              border
              border-[#d7e0e7]
              shadow-xl
              dark:border-white/10
            "
          >
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop"
                alt="Suppliers"
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
                  bg-gradient-to-r
                  from-[#0f172a]/40
                  via-transparent
                  to-white/5
                  dark:from-[#020617]/50
                  dark:via-transparent
                  dark:to-white/5
                "
              />

              {/* FLOATING BADGE */}
              <div
                className="
                  absolute
                  top-4
                  right-4
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
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-[#0f172a] dark:text-white">
                  3 Activos
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT COLUMN - CONTENT + SUPPLIERS LIST */}
        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">

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
              <Shield size={14} />
              Proveedores
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
                Gestiona
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
                proveedores
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
              Administra contactos, órdenes y abastecimiento desde un único
              panel con control total de tus relaciones comerciales.
            </p>
          </div>

          {/* SUPPLIERS LIST */}
          <div className="space-y-3 pt-2 grid lg:grid-cols-3 gap-3 h-full">
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="
                  group
                  relative
                  overflow-hidden
                  p-4
                  h-full
                  rounded-xl
                  border
                  border-[#d7e0e7]
                  bg-white/50
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-[#6096ba]/50
                  hover:bg-white/70
                  hover:shadow-md
                  dark:border-white/10
                  dark:bg-white/[0.05]
                  dark:hover:bg-white/10
                "
              >
                {/* BACKGROUND ACCENT */}
                <div
                  className={`
                    absolute
                    -right-8
                    top-0
                    h-16
                    w-16
                    rounded-full
                    bg-gradient-to-br
                    ${supplier.color}
                    opacity-10
                    blur-xl
                    transition-all
                    duration-300
                    group-hover:scale-150
                  `}
                />

                {/* CONTENT */}
                <div className="relative z-10 space-y-3 h-full">
                  {/* TOP ROW */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0f172a] dark:text-white">
                        {supplier.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-xs text-[#5b6472] dark:text-[#cbd5e1]">
                        <MapPin size={14} />
                        {supplier.location}
                      </div>
                    </div>

                    {/* RATING */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Star
                          size={16}
                          className="fill-[#f59e0b] text-[#f59e0b]"
                        />
                        <span className="text-sm font-bold text-[#0f172a] dark:text-white">
                          {supplier.rating}
                        </span>
                      </div>
                      <span className="text-xs text-[#5b6472] dark:text-[#cbd5e1]">
                        ({supplier.reviews})
                      </span>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="bg-[#d7e0e7] dark:bg-white/10" />

                  {/* BOTTOM ROW - STATS */}
                  <div className="grid gap-3">
                    {/* Delivery Time */}
                    <div className="flex items-center gap-2">
                      <Clock
                        size={16}
                        className="text-[#6096ba] dark:text-[#a3cef1] flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#5b6472] dark:text-[#cbd5e1]">
                          Entrega
                        </p>
                        <p className="text-xs font-bold text-[#0f172a] dark:text-white">
                          {supplier.deliveryTime}
                        </p>
                      </div>
                    </div>

                    {/* Reliability */}
                    <div className="flex items-center gap-2">
                      <TrendingUp
                        size={16}
                        className="text-[#6096ba] dark:text-[#a3cef1] flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#5b6472] dark:text-[#cbd5e1]">
                          Confianza
                        </p>
                        <p className="text-xs font-bold text-[#0f172a] dark:text-white">
                          {supplier.reliability}
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-2">
                      <Phone
                        size={16}
                        className="text-[#6096ba] dark:text-[#a3cef1] flex-shrink-0"
                      />
                      <div className="min-w-0 truncate">
                        <p className="text-[10px] text-[#5b6472] dark:text-[#cbd5e1]">
                          Contacto
                        </p>
                        <p className="text-xs font-bold text-[#0f172a] dark:text-white truncate">
                          {supplier.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LEFT BORDER ACCENT */}
                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    h-0
                    w-1
                    bg-gradient-to-b
                    ${supplier.color}
                    transition-all
                    duration-500
                    group-hover:h-full
                  `}
                />
              </div>
            ))}
          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div
              className="
                p-3
                rounded-lg
                border
                border-[#d7e0e7]
                bg-white/40
                dark:border-white/10
                dark:bg-white/[0.05]
                text-center
              "
            >
              <p className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1]">
                3
              </p>
              <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] mt-1">
                Proveedores
              </p>
            </div>

            <div
              className="
                p-3
                rounded-lg
                border
                border-[#d7e0e7]
                bg-white/40
                dark:border-white/10
                dark:bg-white/[0.05]
                text-center
              "
            >
              <p className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1]">
                4.7⭐
              </p>
              <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] mt-1">
                Rating promedio
              </p>
            </div>

            <div
              className="
                p-3
                rounded-lg
                border
                border-[#d7e0e7]
                bg-white/40
                dark:border-white/10
                dark:bg-white/[0.05]
                text-center
              "
            >
              <p className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1]">
                99.2%
              </p>
              <p className="text-xs text-[#5b6472] dark:text-[#cbd5e1] mt-1">
                Confiabilidad
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}