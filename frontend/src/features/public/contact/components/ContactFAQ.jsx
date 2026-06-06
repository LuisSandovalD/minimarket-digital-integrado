import {
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { faqs } from "../constants/faqs";

export default function ContactFAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#274c77] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]"
          >
            <HelpCircle size={15} />
            Preguntas frecuentes
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-7 text-4xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-5xl"
          >
            Resolvemos tus
            <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              principales dudas
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#64748b] dark:text-[#cbd5e1]"
          >
            Encuentra respuestas rápidas sobre implementación, soporte técnico,
            funcionalidades ERP y acceso a la plataforma.
          </motion.p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 space-y-4"
        >
          {faqs.map((faq, index) => {
            const opened = active === index;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="overflow-hidden rounded-[30px] border border-[#d7e0e7] bg-white/70 shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
              >
                <button
                  onClick={() => setActive(opened ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <h3 className="text-base font-bold text-[#0f172a] dark:text-white md:text-lg">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: opened ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6096ba] to-[#274c77] text-white"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {opened && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-1 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
