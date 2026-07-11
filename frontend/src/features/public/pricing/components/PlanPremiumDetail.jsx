import { motion } from "framer-motion";
import { BarChart3, Cpu, Database, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Cpu,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15",
    border: "hover:border-cyan-400/60",
    title: "Asistente IA (Gemini)",
    description:
      "Conectado directamente a tu base de datos para predecir faltantes de inventario, sugerir compras inteligentes y responder consultas mediante IA.",
  },
  {
    icon: BarChart3,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
    border: "hover:border-violet-400/60",
    title: "Analítica Predictiva",
    description:
      "Modelos de análisis que proyectan ventas, rentabilidad y tendencias para facilitar la toma de decisiones estratégicas.",
  },
  {
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "hover:border-emerald-400/60",
    title: "Backups Inteligentes",
    description:
      "Respaldos automáticos en la nube y restauración completa de la base de datos cuando sea necesario.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
    },
  },
};

export default function PlanPremiumDetail() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative w-full  mx-auto mt-10 bg-transparent"
    >
      <div className="relative p-8 bg-transparent">
        {/* Header */}
        <div className="flex flex-col gap-5 pb-6 md:flex-row md:items-center md:justify-between bg-transparent">
          <div>
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Máximo Rendimiento
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Plan PREMIUM
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Automatización avanzada, inteligencia artificial, analítica
              predictiva y seguridad empresarial para organizaciones que buscan
              el máximo rendimiento.
            </p>
          </div>

          <div className="text-left md:text-right bg-transparent">
            {/* Corregido: Eliminado el degradado de color text-transparent del precio */}
            <h3 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              S/ 99
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Todo incluido
            </p>
          </div>
        </div>

        <div className="mt-8 mb-5 bg-transparent">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Funciones Exclusivas
          </h4>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3 bg-transparent"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/90 p-6 transition-all duration-300 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/40 ${feature.border}`}
              >
                {/* Glow interno en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-slate-400/5 dark:bg-slate-100/5 blur-3xl" />
                </div>

                <div className="relative bg-transparent">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${feature.bg} ${feature.color}`}
                  >
                    <Icon size={22} />
                  </motion.div>

                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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
          transition={{ delay: 0.45 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.005 }}
          className="mt-8 flex gap-4 rounded-2xl border border-emerald-300/30 bg-emerald-50/60 backdrop-blur-md p-5 transition-all duration-300 dark:border-emerald-500/10 dark:bg-emerald-500/5"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="shrink-0"
          >
            <ShieldCheck
              className="text-emerald-600 dark:text-emerald-400"
              size={24}
            />
          </motion.div>

          <div>
            <h4 className="font-semibold text-emerald-800 dark:text-emerald-400">
              Acceso Corporativo Completo
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300/90">
              Crea usuarios ilimitados y administra permisos para
              administradores, gerentes, supervisores, empleados, auditores y
              futuros roles personalizados mediante un systema avanzado de
              control de acceso.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
