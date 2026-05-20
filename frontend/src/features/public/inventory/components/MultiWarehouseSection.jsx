// inventory/components/WarehouseSection.jsx

import {
  Building2,
  MapPin,
  Package,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";

import { warehouses } from "../constants/warehouses";
export default function WarehouseSection() {
  return (
    <section className="relative py-24">
      

      <div className="relative max-w-7xl mx-auto">
        {/* TOP SECTION */}
        <div
          className="
            flex
            flex-col
            gap-10

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
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
              Gestión Multi-Almacén
            </span>

            <h2
              className="
                mt-6

                text-4xl
                font-black
                leading-tight

                text-[#0f172a]

                dark:text-white

                md:text-6xl
              "
            >
              Control inteligente
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
                de almacenes
              </span>
            </h2>

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
              Administra stock por sucursal, almacén o sede desde
              una sola plataforma con sincronización instantánea,
              métricas avanzadas y visibilidad total.
            </p>
          </div>

        </div>

        {/* GRID */}
        <div
          className="
            mt-16

            grid
            gap-6

            lg:grid-cols-3
          "
        >
          {warehouses.map((warehouse) => {
            const WarehouseIcon = warehouse.icon;

            return (
              <article
                key={warehouse.id}
                className="
                  group
                  relative
                  overflow-hidden

                  rounded-[32px]

                  border
                  border-[#d7e0e7]

                  bg-white/50

                  p-7

                  shadow-sm
                  backdrop-blur-xl

                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:shadow-2xl

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                {/* GLOW */}
                <div
                  className={`
                    absolute
                    -right-20
                    -top-20

                    h-52
                    w-52

                    rounded-full

                    bg-gradient-to-br
                    ${warehouse.color}

                    opacity-10

                    blur-3xl

                    transition-all
                    duration-500

                    group-hover:scale-125
                  `}
                />

                <div className="relative z-10">
                  {/* HEADER */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wider

                          text-[#6096ba]

                          dark:text-[#a3cef1]
                        "
                      >
                        Warehouse
                      </p>

                      <h3
                        className="
                          mt-2

                          text-2xl
                          font-black

                          text-[#0f172a]

                          dark:text-white
                        "
                      >
                        {warehouse.name}
                      </h3>

                      <div
                        className="
                          mt-3

                          flex
                          items-center
                          gap-2

                          text-sm

                          text-[#5b6472]

                          dark:text-[#cbd5e1]
                        "
                      >
                        <MapPin size={15} />
                        {warehouse.location}
                      </div>
                    </div>

                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-2xl

                        bg-gradient-to-br
                        ${warehouse.color}

                        text-white

                        shadow-lg

                        transition-transform
                        duration-300

                        group-hover:scale-110
                      `}
                    >
                      <WarehouseIcon size={24} />
                    </div>
                  </div>

                  {/* STATS */}
                  <div
                    className="
                      mt-8

                      space-y-5
                    "
                  >
                    {/* PRODUCTS */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package
                            size={16}
                            className="text-[#6096ba]"
                          />

                          <span
                            className="
                              text-sm

                              text-[#5b6472]

                              dark:text-[#cbd5e1]
                            "
                          >
                            Productos
                          </span>
                        </div>

                        <span
                          className="
                            text-lg
                            font-black

                            text-[#274c77]

                            dark:text-[#a3cef1]
                          "
                        >
                          {warehouse.products}
                        </span>
                      </div>
                    </div>

                    {/* CAPACITY */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap
                            size={16}
                            className="text-[#6096ba]"
                          />

                          <span
                            className="
                              text-sm

                              text-[#5b6472]

                              dark:text-[#cbd5e1]
                            "
                          >
                            Capacidad
                          </span>
                        </div>

                        <span
                          className="
                            text-lg
                            font-black

                            text-[#274c77]

                            dark:text-[#a3cef1]
                          "
                        >
                          {warehouse.capacity}
                        </span>
                      </div>

                      <div
                        className="
                          h-2.5
                          overflow-hidden

                          rounded-full

                          bg-[#d7e0e7]

                          dark:bg-white/10
                        "
                      >
                        <div
                          className={`
                            h-full

                            rounded-full

                            bg-gradient-to-r
                            ${warehouse.color}
                          `}
                          style={{
                            width: warehouse.capacity,
                          }}
                        />
                      </div>
                    </div>

                    {/* EMPLOYEES */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users
                          size={16}
                          className="text-[#6096ba]"
                        />

                        <span
                          className="
                            text-sm

                            text-[#5b6472]

                            dark:text-[#cbd5e1]
                          "
                        >
                          Personal
                        </span>
                      </div>

                      <span
                        className="
                          text-lg
                          font-black

                          text-[#274c77]

                          dark:text-[#a3cef1]
                        "
                      >
                        {warehouse.employees}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM ACCENT */}
                <div
                  className={`
                    absolute
                    bottom-0
                    left-0

                    h-1
                    w-0

                    bg-gradient-to-r
                    ${warehouse.color}

                    transition-all
                    duration-500

                    group-hover:w-full
                  `}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}