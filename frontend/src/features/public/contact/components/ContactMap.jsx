import { ModernButton } from "@/components/buttons/";
import {
  defaultViewport,
  fadeScale,
  fadeUp,
  hoverLift,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { Building2, Clock3, MapPin, Navigation } from "lucide-react";

const infoCards = [
  { icon: Building2, title: "Oficina principal", value: "Lima, Perú" },
  {
    icon: Clock3,
    title: "Horario de atención",
    value: "Lunes a Viernes · 8:00 AM - 6:00 PM",
  },
  {
    icon: Navigation,
    title: "Acceso rápido",
    value: "Ubicación accesible y moderna",
  },
];

export default function ContactMap() {
  return (
    <section className="relative overflow-hidden py-14">
      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-0 h-[350px] w-[350px] rounded-full bg-[#89c2d9]/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-center"
        >
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#274c77] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-[#dbeafe]"
          >
            <MapPin size={15} />
            Ubicación
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-7 text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-5xl"
          >
            Encuéntranos fácilmente
            <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              y visita nuestras oficinas
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-6 max-w-xl text-base leading-relaxed text-[#475569] dark:text-[#cbd5e1]"
          >
            Estamos disponibles para ayudarte con asesorías, implementaciones
            ERP, soporte empresarial y soluciones tecnológicas modernas para tu
            negocio.
          </motion.p>

          {/* Info cards */}
          <motion.div variants={staggerContainer} className="mt-10 space-y-4">
            {infoCards.map(({ icon: Icon, title, value }) => (
              <motion.div
                key={title}
                variants={fadeScale}
                transition={springTransition}
                whileHover={hoverLift}
                className="flex items-start gap-4 rounded-3xl border border-[#d7e0e7] bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6096ba] to-[#274c77] text-white"
                >
                  <Icon size={20} />
                </motion.div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a] dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-[#64748b] dark:text-[#cbd5e1]">
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-8"
          >
            <ModernButton
              text="Abrir en Google Maps"
              icon={Navigation}
              variant="primary"
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/JgsPQVbkErPyUsYM8",
                  "_blank",
                )
              }
              size="lg"
            />
          </motion.div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-[#d7e0e7] bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="relative h-full w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7773.899692173965!2d-76.3934391858281!3d-13.038864445374717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1778348645539!5m2!1ses!2spe"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full rounded-[32px]"
            />

            {/* Overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{
                delay: 0.6,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-6 left-6 max-w-xs rounded-3xl border border-white/20 bg-white/80 p-5 shadow-xl backdrop-blur-2xl dark:bg-[#020617]/70"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6096ba] to-[#274c77] text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#0f172a] dark:text-white">
                    Oficina ERP
                  </h4>
                  <p className="mt-1 text-xs text-[#64748b] dark:text-[#cbd5e1]">
                    Soluciones empresariales modernas.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
