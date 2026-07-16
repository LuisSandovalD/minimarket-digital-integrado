import { MetricCard } from "@/components/card";
import { defaultViewport } from "@/components/effects";
import { motion } from "framer-motion";
import { INVENTORY_FEATURES } from "../constants/featuresData.js";

const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const fastFadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function InventoryFeatures() {
  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 py-24 sm:px-6 md:px-8 lg:px-10 z-10">
      {/* Luz ambiental sutil centrada simétrica */}
      <div className="pointer-events-none absolute inset-0 -z-10 transform-gpu opacity-30 dark:opacity-25">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#6096ba]/10 dark:bg-primary/10 blur-[140px]" />
      </div>

      <div className="mx-auto  w-full flex flex-col items-center">
        {/* ================= ENCABEZADO DE SECCIÓN PRINCIPAL (PATRÓN CENTRADO) ================= */}
        <motion.div
          variants={fastStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center transform-gpu gap-4 mb-20"
        >
          <motion.div
            variants={fastFadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1] shadow-inner backdrop-blur-xl"
          >
            Administración Avanzada
          </motion.div>

          <motion.h2
            variants={fastFadeUp}
            className="text-balance text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl lg:text-5xl"
          >
            Infraestructura robusta para{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              tus existencias
            </span>
          </motion.h2>

          <motion.p
            variants={fastFadeUp}
            className="text-pretty text-base leading-relaxed text-slate-600 dark:text-[#cbd5e1] max-w-2xl"
          >
            Mantén un rastreo impecable de tus productos. Reduce pérdidas por mermas y optimiza tus almacenes mediante
            herramientas diseñadas para un control quirúrgico de stock.
          </motion.p>
        </motion.div>

        {/* ================= REJILLA SIMÉTRICA AJUSTADA A 2 COLUMNAS MAX ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full relative z-20">
          {INVENTORY_FEATURES.map((group, groupIdx) => (
            <motion.div
              key={group.id || groupIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: Math.min(groupIdx * 0.05, 0.3),
              }}
              className="group h-full transform-gpu"
            >
              <MetricCard
                variant="transparent"
                icon={group.icon}
                label={group.eyebrow}
                className="h-full border border-slate-200/70 bg-slate-50/40 backdrop-blur-md !p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50/80 hover:border-[#6096ba]/30 shadow-sm hover:shadow-md dark:!border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03] dark:hover:border-white/10"
              >
                {/* Contenido estructural interno */}
                <div className="-mt-4 flex flex-col h-full text-left">
                  {/* Ilustración / Imagen Conceptual */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100 dark:border-white/5 dark:bg-white/5 mb-5">
                    <img
                      src={group.image}
                      alt={group.title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Textos descriptivos */}
                  <div className="space-y-2 mb-6 flex-1">
                    <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">{group.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-[#cbd5e1]/70">{group.description}</p>
                  </div>

                  {/* Listado de sub-ítems inferiores */}
                  <div className="border-t border-slate-100 dark:border-white/5 pt-4 space-y-3">
                    {group.items?.map((item, itemIdx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={itemIdx} className="flex gap-3 items-start">
                          {ItemIcon && (
                            <div className="mt-0.5 text-[#6096ba] dark:text-[#a3cef1] shrink-0">
                              <ItemIcon size={14} />
                            </div>
                          )}
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                            <p className="text-[11px] leading-normal text-slate-400 dark:text-slate-400">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </MetricCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
