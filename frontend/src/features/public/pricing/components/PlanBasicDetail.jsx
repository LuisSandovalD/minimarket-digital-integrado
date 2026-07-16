import { motion } from "framer-motion";

import { modules } from "../constants/plans";
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
    },
  },
};

export default function PlanBasicDetail() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true }}
      className="relative w-full  mx-auto mt-10 overflow-hidden bg-transparent"
    >
      <div className="relative p-8 bg-transparent">
        {/* Header */}
        <div className="flex flex-col gap-5 pb-6 md:flex-row md:items-center md:justify-between bg-transparent">
          <div>
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Negocios en Expansión
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Plan BASIC</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              El equilibrio perfecto para comercios que manejan múltiples sucursales y necesitan control total sobre
              inventario, ventas y reportes.
            </p>
          </div>

          <div className="text-left md:text-right bg-transparent">
            <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">S/ 49</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Facturación mensual</p>
          </div>
        </div>

        <div className="mt-8 mb-5 bg-transparent">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Módulos incluidos
          </h4>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 bg-transparent"
        >
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/40 p-5 transition-all duration-300 backdrop-blur-md"
              >
                {/* Glow sutil en hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
                  <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-slate-400/5 dark:bg-slate-100/5 blur-3xl" />
                </div>

                <div className="relative flex gap-4 bg-transparent">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-200/60 text-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors duration-300"
                  >
                    <Icon size={22} />
                  </motion.div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{module.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {module.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
