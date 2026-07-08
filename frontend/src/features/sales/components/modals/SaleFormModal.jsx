// ========================================
// features/sales/components/modals/SaleFormModal.jsx
// ========================================

import { ModernButton, SubmitButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Sheet,
  X
} from "lucide-react";
import SaleStepper from "../SaleStepper";

import CustomerStep from "../steps/CustomerStep";
import PaymentStep from "../steps/PaymentStep";
import ProductsStep from "../steps/ProductsStep";
import SummaryStep from "../steps/SummaryStep";

export default function SaleFormModal({
  open,
  onClose,
  customers = [],
  products = [],
  loading = false,

  // Props provenientes del custom hook de control de flujo
  step,
  form,
  setForm,
  setStep,
  initialFormState,
  subtotal,
  tax,
  total,
  handleNext,
  handlePrevious,
  handleSubmit,
}) {
  return (
    <Modal open={open} onClose={onClose} size="full">
      {/* ========================================
       * HEADER
       * ====================================== */}
      <HeaderModal
        icon={Sheet}
        title="Nueva Venta"
        subtitle="Proceso de venta paso a paso"
        onClose={onClose}
      />

      {/* ========================================
       * STEPPER
       * ====================================== */}
      <div className="px-6 pt-5">
        <SaleStepper currentStep={step} />
      </div>

      {/* ========================================
       * CONTENT (Renderizado condicional optimizado)
       * ====================================== */}
      <div className="flex-1 overflow-hidden">
        {step === 1 && (
          <CustomerStep customers={customers} form={form} setForm={setForm} />
        )}

        {step === 2 && (
          <ProductsStep products={products} form={form} setForm={setForm} />
        )}

        {step === 3 && (
          <PaymentStep
            form={form}
            setForm={setForm}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        )}

        {step === 4 && (
          <SummaryStep
            form={form}
            subtotal={subtotal}
            tax={tax}
            total={total}
            setForm={setForm}
            setStep={setStep}
            initialFormState={initialFormState}
            onClose={onClose}
          />
        )}
      </div>

      {/* ========================================
       * FOOTER (Estrategia de navegación reactiva)
       * ====================================== */}
      <FooterModal>
        <div className="flex items-center justify-between w-full">
          {/* LEFT: Botón de escape */}
          <ModernButton
            type="button"
            variant="secondary"
            text="Cerrar"
            icon={X}
            disabled={loading}
            onClick={onClose}
          />

          {/* RIGHT: Botones de transición de estado */}
          <div className="flex gap-3">
            {step > 1 && (
              <ModernButton
                type="button"
                variant="secondary"
                text="Anterior"
                icon={ChevronLeft}
                disabled={loading}
                onClick={handlePrevious}
              />
            )}

            {step < 4 ? (
              <ModernButton
                type="button"
                variant="primary"
                text="Siguiente"
                icon={ChevronRight}
                onClick={handleNext}
              />
            ) : (
              <SubmitButton
                variant="primary"
                text={loading ? "Guardando..." : "Registrar Venta"}
                icon={Save}
                loading={loading}
                disabled={loading}
                onClick={(e) => {
                  if (loading) return;
                  handleSubmit(e);
                }}
              />
            )}
          </div>
        </div>
      </FooterModal>
    </Modal>
  );
}
