// ============================================================================
// features/purchase/components/PurchaseFormModal.jsx
// MODERNO Y TRANSPARENTE: Modal estructurada con scroll interno independiente
// ============================================================================

import { ModernButton, SubmitButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import PurchaseStepper from "./PurchaseStepper";

import ProductsStep from "./steps/ProductStep";
import SummaryStep from "./steps/SummaryStep";
import SupplierStep from "./steps/SupplierStep";

export default function PurchaseFormModal({
  open,
  onClose,
  suppliers = [],
  products = [],
  loading = false,
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
  const TOTAL_STEPS = 3;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <HeaderModal
        title={initialFormState ? "Editar Orden de Compra" : "Nueva Orden de Compra"}
        subtitle="Proceso guiado para el reabastecimiento y recepción de inventario"
        onClose={onClose}
      />
      <form
        id="purchase-form-bridge"
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col min-h-0 bg-transparent overflow-hidden px-10 py-5"
      >
        <PurchaseStepper currentStep={step} />

        <div className="w-full flex-1 flex flex-col">
          {step === 1 && <SupplierStep suppliers={suppliers} form={form} setForm={setForm} />}

          {step === 2 && <ProductsStep products={products} form={form} setForm={setForm} />}

          {step === 3 && (
            <SummaryStep
              form={form}
              suppliers={suppliers}
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
      </form>
      <FooterModal>
        <div className="flex items-center justify-between w-full">
          {/* ACCIÓN IZQUIERDA */}
          <ModernButton
            type="button"
            variant="secondary"
            text="Cerrar"
            icon={X}
            onClick={onClose}
            className="hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          />

          {/* ACCIONES DERECHAS */}
          <div className="flex gap-3">
            {step > 1 && (
              <ModernButton
                type="button"
                variant="secondary"
                text="Anterior"
                icon={ChevronLeft}
                onClick={handlePrevious}
                className="hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              />
            )}

            {step < TOTAL_STEPS ? (
              <ModernButton
                type="button"
                variant="primary"
                text="Siguiente"
                icon={ChevronRight}
                onClick={handleNext}
                className="shadow-sm hover:shadow transition-all"
              />
            ) : (
              <SubmitButton
                type="submit"
                form="purchase-form-bridge"
                variant="primary"
                text={loading ? "Guardando..." : "Confirmar Compra"}
                icon={Save}
                loading={loading}
                className="shadow-md bg-blue-600 hover:bg-blue-700 text-white transition-all"
              />
            )}
          </div>
        </div>
      </FooterModal>
    </Modal>
  );
}
