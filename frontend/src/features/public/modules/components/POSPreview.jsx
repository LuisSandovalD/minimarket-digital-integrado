import { motion } from "framer-motion";
import { Receipt, ShoppingCart } from "lucide-react";

// 1. Importas las constantes
import {
  fadeUp,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { posFeatures } from "../constants/pos";

export default function POSPreview() {
  return (
    <section
      id="pos-preview"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-24 z-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LADO IZQUIERDO: CONTENIDO Y CARACTERÍSTICAS */}
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
                <ShoppingCart size={14} />
                Punto de Venta Inteligente
              </motion.div>

              {/* TITLE */}
              <motion.h2
                variants={fadeUp}
                transition={smoothTransition}
                className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl dark:text-white"
              >
                Ventas rápidas
                <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
                  modernas y seguras
                </span>
              </motion.h2>

              {/* DESCRIPTION */}
              <motion.p
                variants={fadeUp}
                transition={smoothTransition}
                className="mt-4 text-base leading-relaxed text-[#5b6472] dark:text-[#cbd5e1] max-w-2xl"
              >
                Procesa ventas en segundos con soporte para tickets, pagos
                digitales, códigos QR, múltiples cajas y control total de
                transacciones.
              </motion.p>
            </div>

            {/* FEATURES GRID (Refactorizado con .map) */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {posFeatures.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    transition={smoothTransition}
                    className="flex items-center gap-4 rounded-2xl border border-[#274c77]/10 bg-white/50 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${item.color}`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0f172a] dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#5b6472] dark:text-[#94a3b8]">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* LADO DERECHO: IMAGEN Y TARJETA FLOTANTE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="relative transform-gpu"
          >
            {/* IMAGE CONTAINER */}
            <div className="overflow-hidden rounded-[32px] border border-[#274c77]/10 bg-white/50 backdrop-blur-md shadow-md dark:border-white/5 dark:bg-white/[0.02]">
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
                alt="POS Preview Dashboard"
                className="h-[480px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* FLOAT CARD */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-[#274c77]/10 bg-white/80 p-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#0f172a]/80"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#274c77] to-[#6096ba] text-white shadow-sm">
                <Receipt size={18} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#0f172a] dark:text-white">
                  Ventas en tiempo real
                </h4>
                <p className="text-xs text-[#5b6472] dark:text-[#94a3b8]">
                  Transacciones instantáneas.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
