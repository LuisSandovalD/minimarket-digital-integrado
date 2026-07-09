import herosection from "@/assets/imagenes/home/hero/hero-section.svg";
import heroBanner from "@/assets/imagenes/home/hero/hero_banner.svg";
import { ModernButton } from "@/components/buttons";
import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import VideoDemoModal from "./VideoDemoModal";

// Variantes estáticas optimizadas para aceleración de hardware sin re-renders costosos
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

export default function HeroSection() {
  const [promoOpen, setPromoOpen] = useState(false);

  const { setOpenLogin, setOpenRegister } = useOutletContext();

  // Estado global de autenticación
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <section className="relative isolate flex items-center justify-center w-full overflow-hidden px-4 py-14 sm:px-6 md:px-8 lg:h-[75vh] lg:py-0 lg:px-10 z-10">
      <div className="absolute inset-0 -z-20 transform-gpu">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={herosection}
          alt="ERP Modules"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfd]/95 via-[#eef4f8]/90 to-[#dbeafe]/85 dark:from-[#0f172a]/95 dark:via-[#0f172a]/85 dark:to-[#274c77]/80" />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30" />
      </div>

      {/* EFECTO DE LUZ */}
      <div className="pointer-events-none absolute inset-0 -z-10 transform-gpu">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#6096ba]/10 blur-[120px] dark:bg-[#6096ba]/5" />
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
        {/* TEXTO */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="relative z-20 flex flex-col items-start text-left lg:col-span-7"
        >
          {/* Badge */}
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
          >
            • ERP & POS MULTIEMPRESA
          </motion.div>

          {/* Título */}
          <motion.h2
            variants={fastFadeUp}
            className="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-[#0f172a] dark:text-white sm:text-5xl xl:text-6xl"
          >
            Gestiona tu empresa
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] to-[#6096ba] bg-clip-text text-transparent dark:from-[#a3cef1] dark:to-[#6096ba]">
              desde un solo lugar
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            variants={fastFadeUp}
            className="mt-4 max-w-xl text-base leading-relaxed text-[#4a5568] dark:text-[#cbd5e1] sm:text-lg"
          >
            Ventas, inventario, compras y reportes unificados en una interfaz de
            velocidad nativa diseñada para el crecimiento de tu negocio.
          </motion.p>

          {/* Botones */}
          <motion.div
            variants={fastFadeUp}
            className="relative z-30 mt-6 flex w-full flex-wrap items-center gap-3 sm:w-auto"
          >
            {!isAuthenticated && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transform-gpu"
              >
                <ModernButton
                  text="Comenzar Ahora"
                  icon={ArrowRight}
                  variant="primary"
                  onClick={() => {
                    setOpenLogin(false);
                    setOpenRegister(true);
                  }}
                />
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="transform-gpu"
            >
              <ModernButton
                text="Ver Video Promocional"
                icon={Play}
                variant="secondary"
                onClick={() => setPromoOpen(true)}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Imagen */}
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
            src={heroBanner}
            alt="Dashboard Preview"
            className="h-auto w-full max-w-md select-none object-contain drop-shadow-[0_20px_50px_rgba(39,76,119,0.15)] transform-gpu dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:max-w-none"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Modal del video */}
      <VideoDemoModal
        open={promoOpen}
        onClose={() => setPromoOpen(false)}
        videoUrl="/videos/publicidad-erp.mp4"
      />
    </section>
  );
}
