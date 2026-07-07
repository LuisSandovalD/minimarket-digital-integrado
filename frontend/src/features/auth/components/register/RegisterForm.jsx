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
  const StepComponents = { 1: UserStep, 2: CompanyStep, 3: BranchStep };

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
  const currentHeader = StepHeaders[step] || StepHeaders[1];

  return (
    <form
      id="register-form"
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col gap-6"
    >
      {/* SECCIÓN DE ERROR CON ANIMACIÓN INTEGRADA OPTIMIZADA */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
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

      {/* CONTENIDO DE PASOS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* ENCABEZADO */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {currentHeader.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {currentHeader.description}
            </p>
          </div>

          {/* RENDERIZADO DEL PASO */}
          <div className="w-full">
            <CurrentStep form={form} handleChange={handleChange} />
          </div>
        </motion.div>
      </AnimatePresence>
    </form>
  );
}
