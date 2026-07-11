import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { Clock3, Headphones, Mail, MessageSquare } from "lucide-react";

const fastFadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const CONTACT_FEATURES = [
  {
    icon: MessageSquare,
    label: "Asesoría Personalizada",
  },
  {
    icon: Mail,
    label: "Respuesta Rápida",
  },
  {
    icon: Clock3,
    label: "Menos de 24 Horas",
  },
  {
    icon: Headphones,
    label: "Soporte Especializado",
  },
];

export default function ContactHero() {
  return (
    <section className="relative isolate flex items-center justify-center overflow-hidden px-4 py-14 sm:px-6 md:px-8 lg:h-[75vh] lg:px-10 lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568892/hero-section_jnbdp8.svg"
          alt="Contact Background"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />

        <div className="absolute inset-0 bg-white/20 dark:bg-black/30" />
      </div>

      {/* Ambient Light */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#6096ba]/10 blur-[120px] dark:bg-[#6096ba]/5" />
      </div>

      <div className="relative z-10 grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
        {/* Left */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="relative z-20 flex flex-col items-start text-left lg:col-span-7"
        >
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            • Contacto y Asesoría
          </motion.div>

          <motion.h1
            variants={fastFadeUp}
            className="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-[#0f172a] dark:text-white sm:text-5xl xl:text-6xl"
          >
            Hablemos de cómo hacer crecer
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] to-[#6096ba] bg-clip-text text-transparent dark:from-[#a3cef1] dark:to-[#6096ba]">
              tu negocio
            </span>
          </motion.h1>

          <motion.p
            variants={fastFadeUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#4a5568] dark:text-[#cbd5e1] sm:text-lg"
          >
            Nuestro equipo está listo para ayudarte a implementar Nexora ERP en
            tu empresa. Cuéntanos tus necesidades y descubre cómo optimizar
            ventas, inventario, compras y operaciones desde una sola plataforma.
          </motion.p>

          <motion.div
            variants={fastFadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            {CONTACT_FEATURES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-xl border border-[#274c77]/10 bg-white/60 px-4 py-3 backdrop-blur-md dark:bg-[#0f172a]/60"
                >
                  <Icon className="h-4 w-4 text-[#274c77] dark:text-[#a3cef1]" />
                  <span className="text-sm font-medium text-[#0f172a] dark:text-white">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            variants={fastFadeUp}
            className="mt-8 flex flex-wrap gap-8"
          >
            <div>
              <div className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1]">
                &lt; 24h
              </div>
              <div className="text-sm text-[#4a5568] dark:text-[#cbd5e1]">
                Tiempo de respuesta
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1]">
                100%
              </div>
              <div className="text-sm text-[#4a5568] dark:text-[#cbd5e1]">
                Atención personalizada
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-[#274c77] dark:text-[#a3cef1]">
                24/7
              </div>
              <div className="text-sm text-[#4a5568] dark:text-[#cbd5e1]">
                Plataforma disponible
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ ...defaultViewport, once: true }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 26,
          }}
          className="relative z-10 flex w-full justify-center lg:col-span-5 lg:justify-end"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[#6096ba]/5 blur-3xl dark:bg-[#6096ba]/10" />

          <img
            src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568893/hero_banner_vtnpo2.svg"
            alt="Contacto Nexora ERP"
            className="h-auto w-full max-w-md select-none object-contain drop-shadow-[0_20px_50px_rgba(39,76,119,0.15)] transform-gpu dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:max-w-none"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
