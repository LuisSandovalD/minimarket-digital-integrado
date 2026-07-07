import { motion } from "framer-motion";
import { Laptop, Monitor, Smartphone, Tablet } from "lucide-react";

// Importación de constantes y utilidades de animación
import {
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { devices } from "../constants/devices";

// Mapa de iconos para renderizar dinámicamente según el índice o propiedad
const deviceIcons = [Monitor, Tablet, Smartphone];

export default function DevicePreview() {
  return (
    <section
      id="device-preview"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-24 z-10"
    >
      {/* 🌌 Capa Ambiental Lumínica de Fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden transform-gpu">
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6096ba]/10 blur-3xl dark:bg-[#274c77]/10"
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LADO IZQUIERDO: TEXTOS Y CARACTERÍSTICAS */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col transform-gpu"
          >
            {/* BADGE */}
            <div className="max-w-3xl text-left">
              <motion.div
                variants={fadeUp}
                transition={smoothTransition}
                className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#274c77] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1]"
              >
                <Monitor size={14} />
                Compatibilidad Total
              </motion.div>

              {/* TITLE */}
              <motion.h2
                variants={fadeUp}
                transition={smoothTransition}
                className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl dark:text-white"
              >
                Trabaja desde
                <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                  cualquier dispositivo
                </span>
              </motion.h2>

              {/* DESCRIPTION */}
              <motion.p
                variants={fadeUp}
                transition={smoothTransition}
                className="mt-4 text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1] max-w-2xl"
              >
                Accede al ERP POS desde computadoras, laptops, tablets o
                smartphones con una experiencia fluida, moderna y completamente
                responsive.
              </motion.p>
            </div>

            {/* QUICK FEATURES */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <motion.div
                variants={fadeUp}
                transition={smoothTransition}
                className="flex items-center gap-4 rounded-2xl border border-[#274c77]/10 bg-white/50 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#274c77] text-white">
                  <Laptop size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a] dark:text-white">
                    Responsive Design
                  </h4>
                  <p className="text-xs text-[#5b6472] dark:text-[#94a3b8]">
                    Adaptado a cualquier pantalla.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={smoothTransition}
                className="flex items-center gap-4 rounded-2xl border border-[#274c77]/10 bg-white/50 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6096ba] text-white">
                  <Smartphone size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a] dark:text-white">
                    Acceso móvil
                  </h4>
                  <p className="text-xs text-[#5b6472] dark:text-[#94a3b8]">
                    Gestiona tu negocio en ruta.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* LADO DERECHO: GRID DE DISPOSITIVOS DINÁMICOS */}
          <div className="grid gap-4 sm:grid-cols-3">
            {devices.map((item, index) => {
              // Asignación dinámica del icono correspondiente
              const IconComponent = deviceIcons[index % deviceIcons.length];

              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.08, 0.25),
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-[24px] border border-[#274c77]/10 bg-white/50 backdrop-blur-md shadow-sm transition-all duration-300 dark:border-white/5 dark:bg-white/[0.02]"
                >
                  {/* CONTAINER DE IMAGEN */}
                  <div className="overflow-hidden aspect-video sm:h-40 w-full relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* CONTENIDO INTERNO */}
                  <div className="p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#274c77] to-[#6096ba] text-white shadow-sm">
                      <IconComponent size={16} />
                    </div>

                    <h3 className="mt-3 text-base font-black tracking-tight text-[#0f172a] dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-[#5b6472] dark:text-[#cbd5e1] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
