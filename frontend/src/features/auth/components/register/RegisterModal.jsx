import { Modal } from "@/components/overlays";
import { motion } from "framer-motion";

import RegisterFooter from "./RegisterFooter";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterStepper from "./RegisterStepper";

import useRegisterForm from "../../hooks/useRegisterForm";
import useRegisterSubmit from "../../hooks/useRegisterSubmit";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

export default function RegisterModal({ open, onClose }) {
  const {
    step,
    form,
    loading,
    setLoading,
    error,
    setError,
    handleChange,
    nextStep,
    prevStep,
    resetForm,
  } = useRegisterForm();

  const { handleSubmit } = useRegisterSubmit({
    form,
    setLoading,
    setError,
    resetForm,
    onClose,
  });

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="flex h-[850px] max-h-[95vh] overflow-hidden rounded-[36px] border border-black/10 dark:border-white/10">
        {/* Left panel — imagen */}
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
          <div className="absolute inset-0bg-gradient-to-brfrom-white/20via-white/5to-blue-500/10dark:from-slate-950/85dark:via-slate-900/60dark:to-blue-950/40" />

          <div className="absolute inset-0bg-[radial-gradient(circle_at_center,transparent_45%,rgba(255,255,255,0.12)_100%)]dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.65)_100%)]" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 backdrop-blur-xl">
                <div className="h-2 w-2 rounded-full bg-[#a3cef1]" />
                <span className="text-sm font-semibold text-white">
                  ERP Empresarial
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-1 flex-col overflow-hidden border-l border-black/10 bg-white dark:border-white/10 dark:bg-[#0f172a]"
        >
          {/* Header */}
          <div className="flex-none border-b border-black/10 dark:border-white/10">
            <RegisterHeader onClose={onClose} />
          </div>

          {/* Stepper */}
          <div className="flex-none">
            <RegisterStepper step={step} />
          </div>

          {/* Form — único con scroll */}
          <div className="flex-1 overflow-y-auto p-8">
            <RegisterForm
              step={step}
              form={form}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>

          {/* Footer */}
          <div className="flex-none border-t border-black/10 dark:border-white/10">
            <RegisterFooter
              step={step}
              loading={loading}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}
