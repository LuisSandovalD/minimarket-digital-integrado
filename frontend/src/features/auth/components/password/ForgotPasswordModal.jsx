// ========================================
// components/auth/ForgotPassword/ForgotPasswordModal.jsx
// ========================================

import { HeaderModal, Modal } from "@/components/overlays/";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import ForgotPasswordStepCode from "./ForgotPasswordStepCode";
import ForgotPasswordStepEmail from "./ForgotPasswordStepEmail";
import ForgotPasswordStepReset from "./ForgotPasswordStepReset";

const STEP_LABELS = ["Correo", "Código", "Nueva contraseña"];

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <HeaderModal title="Recuperar Contraseña" subtitle={STEP_LABELS[step - 1]} icon={KeyRound} onClose={onClose} />

      {/* ─── INDICADOR DE PASOS ─── */}
      <div className="flex items-center gap-2 px-6 pt-6">
        {STEP_LABELS.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              index < step ? "bg-gradient-to-r from-[#274c77] to-[#6096ba]" : "bg-[#d7e0e7] dark:bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* ─── CONTENIDO DINÁMICO DEL PASO ACTUAL ─── */}
      <div className="px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 && <ForgotPasswordStepEmail email={email} setEmail={setEmail} onNext={() => setStep(2)} />}

            {step === 2 && (
              <ForgotPasswordStepCode email={email} code={code} setCode={setCode} onNext={() => setStep(3)} />
            )}

            {step === 3 && <ForgotPasswordStepReset code={code} onSuccess={onClose} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
}
