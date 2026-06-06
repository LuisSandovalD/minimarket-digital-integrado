import {
  fadeScale,
  fadeUp,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { socials } from "../constants/socials";

export default function ContactSocials() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#89c2d9]/20 blur-3xl"
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
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#274c77] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-[#dbeafe]"
          >
            <Sparkles size={15} />
            Redes sociales
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-7 text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-5xl"
          >
            Mantente conectado
            <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              con nuestra comunidad
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[#475569] dark:text-[#cbd5e1]"
          >
            Síguenos en nuestras plataformas para conocer novedades,
            actualizaciones del sistema, contenido empresarial y nuevas
            funcionalidades.
          </motion.p>
        </motion.div>

        {/* Social grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeScale}
                transition={springTransition}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group relative overflow-hidden rounded-[30px] border border-[#d7e0e7] bg-white/70 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]"
              >
                {/* Hover shimmer */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 0.06 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#6096ba] to-transparent"
                />

                {/* Top row */}
                <div className="flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6096ba] to-[#274c77] text-white shadow-lg"
                  >
                    {Icon && <Icon size={24} />}
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight
                      size={20}
                      className="text-[#94a3b8] transition-colors duration-300 group-hover:text-[#274c77] dark:group-hover:text-white"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-lg font-black text-[#0f172a] dark:text-white">
                    {social.platform}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                    Conéctate con nosotros y descubre contenido, novedades y
                    actualizaciones empresariales.
                  </p>
                </div>

                {/* Bottom border glow on hover */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1]"
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
