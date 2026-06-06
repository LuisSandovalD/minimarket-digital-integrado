import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { BranchStep, CompanyStep, UserStep } from "../../components/register";

export default function RegisterForm({
  step,
  form,
  error,
  handleChange,
  handleSubmit,
}) {
  // 1. Diccionario de componentes
  const StepComponents = {
    1: UserStep,
    2: CompanyStep,
    3: BranchStep,
  };

  // 2. Diccionario de encabezados (Títulos y Subtítulos dinámicos)
  const StepHeaders = {
    1: {
      title: "Información Personal",
      description: "Ingresa tus datos personales y credenciales de acceso.",
    },
    2: {
      title: "Información de la Empresa",
      description: "Registra los datos legales y comerciales de tu negocio.",
    },
    3: {
      title: "Información de la Sucursal",
      description: "Configura la ubicación y contacto de tu primera sede.",
    },
  };

  const CurrentStep = StepComponents[step] || UserStep;
  const currentHeader = StepHeaders[step] || StepHeaders[1]; // Fallback al paso 1

  return (
    <form
      id="register-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      {/* ERROR */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO DEL PASO */}
      <div className="rounded-3xl border border-[#e2e8f0] bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-6" // Añade separación interna entre el Header y los Inputs
          >
            {/* ENCABEZADO DINÁMICO */}
            <div className="border-b border-slate-100 pb-4 dark:border-white/5">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {currentHeader.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {currentHeader.description}
              </p>
            </div>

            {/* Renderizado dinámico del paso actual */}
            <CurrentStep form={form} handleChange={handleChange} />
          </motion.div>
        </AnimatePresence>
      </div>
    </form>
  );
}
