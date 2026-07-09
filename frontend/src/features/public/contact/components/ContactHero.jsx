import {
  defaultViewport,
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";


export default function ContactHero() {
  return (
    <section className="relative isolate flex justify-center items-center w-full p-4 lg:h-[92vh] md:h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568982/contact-hero-bg_io0sdi.svg"
          alt="ERP POS"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30" />
      </div>

      {/* Glow effects */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-[#6096ba]/15 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-[#274c77]/10 blur-3xl dark:bg-[#274c77]/30"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#274c77] shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]"
          >
            <Mail size={15} />
            Contacto Empresarial
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-[#0f172a] dark:text-white lg:text-7xl"
          >
            Hablemos sobre
            <span className="mt-3 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              tu empresa
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[#475569] dark:text-[#cbd5e1]"
          >
            Nuestro equipo está listo para ayudarte a implementar soluciones
            empresariales modernas, optimizar procesos y llevar la gestión de tu
            negocio al siguiente nivel.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <motion.button
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0f172a] px-7 py-4 text-sm font-bold text-white shadow-xl transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.25)] dark:bg-white dark:text-[#020617]"
            >
              Contactar ahora
              <ArrowUpRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-[#d7e0e7] bg-white/70 px-7 py-4 text-sm font-bold text-[#0f172a] backdrop-blur-xl transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              Agendar demo
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-8 max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          >
            <h3 className="text-2xl font-black text-white">
              Atención personalizada
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#dbe4ee]">
              Nuestro equipo responde rápidamente para ayudarte con
              implementación, soporte y soluciones empresariales.
            </p>

            <div className="mt-6 flex items-center gap-6">
              <div>
                <p className="text-3xl font-black text-white">24/7</p>
                <span className="text-xs text-[#dbe4ee]">Soporte</span>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <p className="text-3xl font-black text-white">+500</p>
                <span className="text-xs text-[#dbe4ee]">Empresas</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 70, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
            src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568892/contact-hero-image_hfly9c.svg"
            alt="Contacto empresarial"
            className="w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
