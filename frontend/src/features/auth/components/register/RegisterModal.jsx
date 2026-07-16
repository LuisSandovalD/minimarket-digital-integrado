import { Modal } from "@/components/overlays";
import { motion } from "framer-motion";
import useRegisterForm from "../../hooks/useRegisterForm";
import RegisterFooter from "./RegisterFooter";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterStepper from "./RegisterStepper";

const OFFICE_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { step, form, loading, error, handleChange, nextStep, prevStep, handleRegisterSubmit } =
    useRegisterForm(onClose);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="flex h-[850px] max-h-[95vh] overflow-hidden">
        {/* PANEL IZQUIERDO — IMAGEN DE FONDO (Optimizado estático) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative hidden w-[52%] shrink-0 overflow-hidden lg:block"
        >
          <img
            src={OFFICE_IMAGE}
            alt="Oficina empresarial"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-10 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/15 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
              <span className="text-sm font-semibold text-white">ERP Empresarial</span>
            </div>
          </div>
        </motion.div>

        {/* PANEL DERECHO — FLUJO DEL FORMULARIO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex flex-1 flex-col overflow-hidden bg-white dark:bg-[#0f172a]"
        >
          {/* Header */}
          <div className="flex-none bg-white dark:bg-[#0f172a]">
            <RegisterHeader onClose={onClose} />
          </div>

          {/* Stepper */}
          <div className="flex-none">
            <RegisterStepper step={step} />
          </div>

          {/* Form con scroll independiente */}
          <div className="flex-1 overflow-y-auto p-8">
            <RegisterForm
              step={step}
              form={form}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleRegisterSubmit}
            />

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
          <div className="flex-none bg-white dark:bg-[#0f172a]">
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
