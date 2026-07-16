import { ModernButton } from "@/components/buttons";
import {
  defaultViewport,
  fadeScale,
  fadeUp,
  hoverLift,
  hoverScale,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CTASection({ setOpenLogin, setOpenRegister }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const companySlug = user?.company?.slug;

  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 py-24 sm:px-6 md:px-8 lg:px-10 z-10">
      <div className="mx-auto  w-full">
        {/* CONTENEDOR TIPO TARJETA PREMIUM TOTALMENTE ADAPTABLE */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/50 backdrop-blur-md px-6 py-16 text-center sm:px-12 sm:py-24 shadow-md dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] dark:border-white/10 dark:bg-white/[0.01] transform-gpu transition-all duration-300"
        >
          {/* Malla sutil decorativa interna */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#6096ba]/[0.03] to-[#274c77]/[0.02] dark:from-primary/[0.03] dark:to-accent/[0.02]" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            {/* Badge Centrado Coherente */}
            <motion.div
              variants={fadeScale}
              transition={springTransition}
              className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/[0.03] dark:text-[#a3cef1] backdrop-blur-xl transform-gpu shadow-inner"
            >
              ERP POS Multiempresa
            </motion.div>

            {/* Título Estilizado con Gradiente Premium */}
            <motion.h2
              variants={fadeUp}
              transition={smoothTransition}
              className="text-balance text-3xl font-black leading-[1.15] tracking-tight text-[#0f172a] dark:text-white sm:text-4xl lg:text-5xl transform-gpu"
            >
              Empresas que ya{" "}
              <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                optimizan su negocio
              </span>
            </motion.h2>

            {/* Descripción Limpia */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="text-pretty text-base max-w-2xl leading-relaxed text-slate-600 dark:text-dark-foreground/70 sm:text-lg transform-gpu"
            >
              Centraliza ventas, inventario, reportes y administración multiempresa en una sola plataforma moderna y
              segura.
            </motion.p>

            {/* Grupo de Botones de Acción Simétricos y Responsivos */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="mt-6 flex flex-col gap-4 sm:flex-row w-full sm:w-auto justify-center transform-gpu"
            >
              {/* Botón Primario Dinámico */}
              <motion.div whileHover={hoverScale} whileTap={{ scale: 0.97 }} className="transform-gpu w-full sm:w-auto">
                {!isAuthenticated ? (
                  <ModernButton
                    text="Crear Cuenta"
                    variant="primary"
                    icon={ArrowRight}
                    className="w-full sm:w-auto px-8 shadow-sm"
                    onClick={() => {
                      setOpenLogin?.(false);
                      setOpenRegister?.(true);
                    }}
                  />
                ) : (
                  <ModernButton
                    text="Ir al Dashboard"
                    variant="primary"
                    icon={ArrowRight}
                    className="w-full sm:w-auto px-8 shadow-sm"
                    onClick={() => navigate(`/${companySlug}/dashboard`)}
                  />
                )}
              </motion.div>

              {/* Botón Secundario Homogeneizado */}
              <motion.div whileHover={hoverLift} whileTap={{ scale: 0.97 }} className="transform-gpu w-full sm:w-auto">
                <ModernButton
                  text="Ver demostración"
                  icon={Play}
                  variant="secondary"
                  className="w-full sm:w-auto border border-slate-200 bg-slate-100 text-[#0f172a] hover:bg-slate-200 px-8 transition-all duration-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  onClick={() => navigate("/contacto")}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
