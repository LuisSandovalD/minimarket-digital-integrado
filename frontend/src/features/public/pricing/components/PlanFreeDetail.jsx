import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShieldAlert,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "1 Sucursal Única",
    description:
      "Ideal para negocios que operan desde un único local físico o almacén centralizado.",
  },
  {
    icon: ShoppingCart,
    title: "Venta POS Esencial",
    description:
      "Registra ventas rápidamente mediante efectivo, tarjetas y otros métodos electrónicos.",
  },
  {
    icon: Warehouse,
    title: "Stock y Catálogos",
    description:
      "Administra productos, categorías y recibe alertas automáticas de stock mínimo.",
  },
];

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

export default function PlanFreeDetail() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="relative w-full max-w-7xl mx-auto mt-10 bg-transparent"
    >
      <div className="relative p-8 bg-transparent">
        {/* Header */}
        <div className="flex flex-col gap-5 pb-6 md:flex-row md:items-center md:justify-between bg-transparent">
          <div>
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Plan Base Perpetuo
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              Plan FREE
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Diseñado para pequeños negocios que desean digitalizar sus ventas,
              inventario y productos sin ningún costo mensual.
            </p>
          </div>

          <div className="text-left md:text-right bg-transparent">
            <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              GRATIS
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Para siempre • Sin tarjeta
            </p>
          </div>
        </div>

        <div className="mt-8 mb-5 bg-transparent">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Incluye
          </h4>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-3 bg-transparent"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/40 p-5 transition-all duration-300 backdrop-blur-md"
              >
                {/* Glow interno en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-slate-400/5 dark:bg-slate-100/5 blur-2xl" />
                </div>

                <div className="relative bg-transparent">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200/60 text-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors duration-300"
                  >
                    <Icon size={22} />
                  </motion.div>

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          whileHover={{ scale: 1.005 }}
          className="mt-8 flex items-start gap-4 rounded-2xl border border-amber-300/30 dark:border-amber-500/10 bg-amber-50/60 dark:bg-amber-500/5 backdrop-blur-md p-5 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.8 }}
            className="shrink-0"
          >
            <ShieldAlert
              size={22}
              className="text-amber-600 dark:text-amber-500"
            />
          </motion.div>

          <div>
            <h4 className="font-semibold text-amber-800 dark:text-amber-400">
              Límites del Plan Free
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-amber-700/90 dark:text-amber-300/80">
              Incluye únicamente un administrador principal, una sucursal y las
              funciones esenciales de ventas e inventario. No incorpora
              historial Kárdex avanzado, exportaciones a Excel, reportes
              ejecutivos ni soporte multisucursal.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
