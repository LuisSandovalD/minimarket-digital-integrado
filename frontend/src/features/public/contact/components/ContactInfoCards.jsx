import {
  fadeScale,
  fadeUp,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";

const cards = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "+51 999 999 999",
    description: "Atención comercial y soporte empresarial.",
  },
  {
    icon: Mail,
    title: "Correo electrónico",
    value: "contacto@empresa.com",
    description: "Escríbenos para consultas o asesoría.",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Lima, Perú",
    description: "Atendemos proyectos en todo el país.",
  },
  {
    icon: Clock3,
    title: "Horario",
    value: "Lun - Vie / 8:00 AM",
    description: "Disponible para reuniones y soporte.",
  },
];

export default function ContactInfoCards() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#89c2d9]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#274c77] shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]"
          >
            <Phone size={15} />
            Información de contacto
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-8 text-5xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white"
          >
            Estamos listos para
            <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              ayudarte
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[#475569] dark:text-[#cbd5e1]"
          >
            Ponte en contacto con nuestro equipo para resolver dudas, solicitar
            una demostración o recibir asesoría sobre nuestras soluciones ERP.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {cards.map(({ icon: Icon, title, value, description }) => (
            <motion.article
              key={title}
              variants={fadeScale}
              transition={springTransition}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative overflow-hidden rounded-[30px] border border-[#d7e0e7] bg-white/70 p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]"
            >
              {/* Shimmer sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 0.06 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#6096ba] to-transparent"
              />

              {/* Corner glow */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#89c2d9]/10 blur-3xl" />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6096ba] to-[#274c77] text-white shadow-lg shadow-[#6096ba]/20"
              >
                <Icon size={24} />
              </motion.div>

              {/* Content */}
              <div className="relative z-10 mt-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-black text-[#0f172a] dark:text-white">
                    {title}
                  </h3>
                  <motion.div
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight size={18} className="text-[#6096ba]" />
                  </motion.div>
                </div>
                <p className="mt-4 text-base font-semibold text-[#274c77] dark:text-[#dbeafe]">
                  {value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                  {description}
                </p>
              </div>

              {/* Bottom border glow */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[#6096ba] to-[#274c77]"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
