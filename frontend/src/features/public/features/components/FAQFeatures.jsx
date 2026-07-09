// features/components/FAQFeatures.jsx

import {
  defaultViewport,
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faq } from "../constants/faq";

export default function FAQFeatures() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
        >
          {/* HEADER */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="text-center"
          >
            <span className="inline-flex items-center rounded-full border border-[#89c2d9]/30 bg-[#89c2d9]/10 px-4 py-1 text-sm font-semibold tracking-wide text-[#6096ba] backdrop-blur-sm">
              FAQ
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white sm:text-5xl">
              Preguntas frecuentes
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/60 dark:text-white/60">
              Resolvemos las dudas más comunes sobre el funcionamiento,
              compatibilidad y características principales del sistema.
            </p>
          </motion.div>

          {/* FAQ LIST */}
          <div className="mt-16 space-y-5">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  transition={smoothTransition}
                  className="group overflow-hidden rounded-[28px] border border-[#d7e0e7] bg-white/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#89c2d9]/50 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
                  >
                    <h3 className="text-lg font-bold leading-relaxed text-[#0f172a] dark:text-white">
                      {item.question}
                    </h3>

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-[#6096ba] bg-[#6096ba] text-white"
                          : "border-[#d7e0e7] bg-white text-black/70 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#d7e0e7] px-7 py-6 text-base leading-relaxed text-black/70 dark:border-white/10 dark:text-white/70">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
