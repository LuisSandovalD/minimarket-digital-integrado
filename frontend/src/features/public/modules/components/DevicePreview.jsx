// models/components/DevicePreview.jsx

import { Monitor, Smartphone, Tablet, Laptop } from "lucide-react";

import { devices } from "../constants/devices";

export default function DevicePreview() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl">
        <div
          className="
            grid
            items-center
            gap-16

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

                bg-white/10
                px-4
                py-2

                text-sm
                font-semibold

                text-[#274c77]

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-[#a3cef1]
              "
            >
              <Monitor size={16} />
              Compatibilidad Total
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
              Trabaja desde
              <span
                className="
                  mt-2
                  block

                  bg-gradient-to-r
                  from-[#274c77]
                  via-[#6096ba]
                  to-[#a3cef1]

                  bg-clip-text
                  text-transparent
                "
              >
                cualquier dispositivo
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-7
                max-w-2xl

                text-base
                leading-relaxed

                text-[#5b6472]

                dark:text-[#cbd5e1]

                md:text-lg
              "
            >
              Accede al ERP POS desde computadoras, laptops, tablets o
              smartphones con una experiencia fluida, moderna y completamente
              responsive.
            </p>

            {/* FEATURES */}
            <div
              className="
                mt-10

                grid
                gap-4

                sm:grid-cols-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4

                  rounded-2xl

                  border
                  border-[#d7e0e7]

                  bg-white/10
                  px-5
                  py-4

                  backdrop-blur-xl

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-xl

                    bg-[#274c77]
                    text-white
                  "
                >
                  <Laptop size={20} />
                </div>

                <div>
                  <h4
                    className="
                      text-sm
                      font-bold

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    Responsive Design
                  </h4>

                  <p
                    className="
                      text-xs

                      text-[#5b6472]

                      dark:text-[#cbd5e1]
                    "
                  >
                    Adaptado a cualquier pantalla.
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-4

                  rounded-2xl

                  border
                  border-[#d7e0e7]

                  bg-white/10
                  px-5
                  py-4

                  backdrop-blur-xl

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-xl

                    bg-[#6096ba]
                    text-white
                  "
                >
                  <Smartphone size={20} />
                </div>

                <div>
                  <h4
                    className="
                      text-sm
                      font-bold

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    Acceso móvil
                  </h4>

                  <p
                    className="
                      text-xs

                      text-[#5b6472]

                      dark:text-[#cbd5e1]
                    "
                  >
                    Gestiona tu negocio desde cualquier lugar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              grid
              gap-2

              sm:grid-cols-3
            "
          >
            {devices.map((item, index) => (
              <article
                key={index}
                className="
                  overflow-hidden

                  rounded-[30px]

                  border
                  border-[#d7e0e7]

                  bg-white/10

                  transition-all
                  duration-300

                  hover:-translate-y-2

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      h-56
                      w-full

                      object-cover

                      transition-transform
                      duration-500

                      hover:scale-105
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center

                      rounded-xl

                      bg-gradient-to-br
                      from-[#274c77]
                      to-[#6096ba]

                      text-white
                    "
                  >
                    {index === 0 && <Monitor size={18} />}

                    {index === 1 && <Tablet size={18} />}

                    {index === 2 && <Smartphone size={18} />}
                  </div>

                  <h3
                    className="
                      mt-4

                      text-xl
                      font-black

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-3

                      text-sm
                      leading-relaxed

                      text-[#5b6472]

                      dark:text-[#cbd5e1]
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
