// inventory/components/InventoryFAQ.jsx

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faq = [
  {
    question: "¿Puedo controlar múltiples almacenes?",
    answer:
      "Sí, puedes administrar stock y movimientos entre diferentes sucursales.",
  },

  {
    question: "¿El sistema permite códigos de barras?",
    answer:
      "Sí, es compatible con lectores y generación de códigos.",
  },

  {
    question: "¿Existen alertas automáticas?",
    answer:
      "Sí, recibirás alertas de bajo stock y productos críticos.",
  },
];

export default function InventoryFAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-2xl">
          <span
            className="
              inline-flex
              items-center

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
            Preguntas
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
            Preguntas
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
              frecuentes
            </span>
          </h2>

          <p
            className="
              mt-5

              text-lg
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]
            "
          >
            Todo lo que necesitas saber sobre la gestión
            inteligente de inventario.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-14 grid gap-5">
          {faq.map((item, index) => {
            const isOpen = active === index;

            return (
              <article
                key={index}
                className="
                  overflow-hidden

                  rounded-[30px]

                  border
                  border-[#d7e0e7]

                  bg-white/40

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:shadow-xl

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                {/* BUTTON */}
                <button
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6

                    p-7

                    text-left
                  "
                >
                  <h3
                    className="
                      text-xl
                      font-black

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    {item.question}
                  </h3>

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      flex-shrink-0
                      items-center
                      justify-center

                      rounded-2xl

                      border
                      border-slate-200

                      bg-slate-50

                      text-[#6096ba]

                      transition-all
                      duration-300

                      dark:border-white/10
                      dark:bg-white/[0.03]
                      dark:text-[#a3cef1]

                      ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* CONTENT */}
                <div
                  className={`
                    grid
                    transition-all
                    duration-500

                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <p
                      className="
                        px-7
                        pb-7

                        text-base
                        leading-relaxed

                        text-[#5b6472]

                        dark:text-[#cbd5e1]
                      "
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}