import { Modal } from "@/components/overlays";
import { motion } from "framer-motion";

import RegisterFooter from "./RegisterFooter";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterStepper from "./RegisterStepper";

// Importamos únicamente nuestro Custom Hook unificado y optimizado
import useRegisterForm from "../../hooks/useRegisterForm";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  // Extraemos todo el control del formulario del hook centralizado
  const {
    step,
    form,
    loading,
    error,
    handleChange,
    nextStep,
    prevStep,
    handleRegisterSubmit, // <-- Nuestra función unificada definitiva
  } = useRegisterForm(onClose); // Le pasamos el callback para cerrar el modal tras el éxito

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="flex h-[850px] max-h-[95vh] overflow-hidden rounded-[36px] border border-black/10 dark:border-white/10">
        {/* Panel Izquierdo — Imagen de Fondo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden w-[52%] shrink-0 overflow-hidden lg:block"
        >
          <motion.img
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            src={OFFICE_IMAGE}
            alt="Oficina empresarial"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative flex h-full flex-col justify-between p-10">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 backdrop-blur-xl">
                <div className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                <span className="text-sm font-semibold text-white">
                  ERP Empresarial
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Panel Derecho — Flujo del Formulario */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-1 flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex-none border-b border-black/10 dark:border-white/10">
            <RegisterHeader onClose={onClose} />
          </div>

          {/* Stepper */}
          <div className="flex-none">
            <RegisterStepper step={step} />
          </div>

          {/* Form — Contenido integrado directo con scroll independiente */}
          <div className="flex-1 overflow-y-auto p-8">
            <RegisterForm
              step={step}
              form={form}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleRegisterSubmit}
            />

            {/* ENLACE HACIA EL LOGIN (Aparece en el primer paso para no estorbar el flujo final) */}
            {step === 1 && (
              <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-semibold text-[#274c77] hover:underline dark:text-[#a3cef1]"
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex-none border-t border-black/10 dark:border-white/10">
            <RegisterFooter
              step={step}
              loading={loading}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleRegisterSubmit}
            />
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}
