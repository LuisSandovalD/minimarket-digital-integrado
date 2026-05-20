// contact/components/ContactFAQ.jsx

import { useState } from "react";

import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

import { faqs } from "../constants/faqs";

export default function ContactFAQ() {
  const [active, setActive] = useState(0);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#f8fbff]
        py-20

        dark:bg-[#020617]
      "
    >
      {/* BLUR */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[320px]
          w-[320px]
          -translate-x-1/2

          rounded-full

          bg-[#89c2d9]/20
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center">
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

              px-4
              py-2

              text-sm
              font-semibold

              text-[#274c77]

              shadow-sm
              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/10
              dark:text-[#dbeafe]
            "
          >
            <HelpCircle size={15} />

            Preguntas frecuentes
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-7

              text-4xl
              font-black
              tracking-tight

              text-[#0f172a]

              dark:text-white

              md:text-5xl
            "
          >
            Resolvemos tus

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
              principales dudas
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mx-auto
              mt-5
              max-w-2xl

              text-base
              leading-relaxed

              text-[#64748b]

              dark:text-[#cbd5e1]
            "
          >
            Encuentra respuestas rápidas sobre implementación,
            soporte técnico, funcionalidades ERP y acceso
            a la plataforma.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const opened = active === index;

            return (
              <div
                key={index}
                className="
                  overflow-hidden

                  rounded-[30px]

                  border
                  border-[#d7e0e7]

                  bg-white/70

                  shadow-sm
                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:shadow-lg

                  dark:border-white/10
                  dark:bg-white/[0.04]
                "
              >
                {/* BUTTON */}
                <button
                  onClick={() => toggleFAQ(index)}

                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5

                    px-6
                    py-5

                    text-left
                  "
                >
                  <div>
                    <h3
                      className="
                        text-base
                        font-bold

                        text-[#0f172a]

                        dark:text-white

                        md:text-lg
                      "
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* ICON */}
                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center

                      rounded-2xl

                      bg-gradient-to-br
                      from-[#6096ba]
                      to-[#274c77]

                      text-white

                      transition-all
                      duration-300

                      ${opened ? "rotate-180" : ""}
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
                      opened
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div
                      className="
                        px-6
                        pb-6
                        pt-1
                      "
                    >
                      <p
                        className="
                          text-sm
                          leading-relaxed

                          text-[#64748b]

                          dark:text-[#cbd5e1]
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}