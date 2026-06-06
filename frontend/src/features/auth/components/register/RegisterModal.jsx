import { Modal } from "@/components/overlays";

import RegisterFooter from "./RegisterFooter";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterSidebar from "./RegisterSidebar";
import RegisterStepper from "./RegisterStepper";

import useRegisterForm from "../../hooks/useRegisterForm";
import useRegisterSubmit from "../../hooks/useRegisterSubmit";

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
      {/* CONTENEDOR PRINCIPAL: flex-col 
        Esto apila el Header, el Contenido y el Footer de forma natural.
        max-h-[95vh] asegura que no se rompa en pantallas pequeñas.
      */}
      <div className="flex flex-col w-full h-[850px] max-h-[95vh] overflow-hidden bg-white dark:bg-[#0f172a]">
        {/* 1. HEADER (Fijo en la parte superior) */}
        <div className="flex-none">
          <RegisterHeader onClose={onClose} />
        </div>

        {/* 2. CONTENIDO CENTRAL (flex-1 para que ocupe todo el espacio sobrante) */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (Izquierda) */}
          <RegisterSidebar />

          {/* Área Principal (Derecha) */}
          <div className="flex flex-col flex-1 overflow-hidden border-l border-white/10 bg-white/70 backdrop-blur-2xl dark:bg-transparent">
            {/* Stepper (Fijo sobre el formulario) */}
            <div className="flex-none">
              <RegisterStepper step={step} />
            </div>

            {/* Contenedor del Formulario (El único con Scroll) */}
            <div className="flex-1 overflow-y-auto p-8">
              <RegisterForm
                step={step}
                form={form}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>

        {/* 3. FOOTER (Fijo en la parte inferior) */}
        <div className="flex-none border-t border-white/10">
          <RegisterFooter
            step={step}
            loading={loading}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}
