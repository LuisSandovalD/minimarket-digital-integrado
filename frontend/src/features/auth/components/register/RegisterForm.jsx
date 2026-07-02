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

  // 2. Diccionario de encabezados (Títulos y Subtítulos dinámicos estilizados)
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
      className="w-full max-w-2xl mx-auto flex flex-col gap-6"
    >
      {/* SECCIÓN DE ERROR CON ANIMACIÓN FLUIDA DE ALTURA */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            role="alert"
            aria-live="assertive"
            className="overflow-hidden"
          >
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                {error}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO INTEGRADO NATIVAMENTE (SIN CARD) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex flex-col gap-6"
        >
          {/* ENCABEZADO MINIMALISTA SIN BORDES INNECESARIOS */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {currentHeader.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {currentHeader.description}
            </p>
          </div>

          {/* RENDERIZADO DINÁMICO DEL PASO ACTUAL */}
          <div className="w-full">
            <CurrentStep form={form} handleChange={handleChange} />
          </div>
        </motion.div>
      </AnimatePresence>
    </form>
  );
}
