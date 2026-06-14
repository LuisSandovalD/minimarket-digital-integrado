// ========================================
// features/purchase/components/PurchaseFormModal.jsx
// ========================================

import { useEffect, useState } from "react";

import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

import { ModernButton, SubmitButton } from "@/components/buttons";

import PurchaseStepper from "./PurchaseStepper";

import PurchaseProductsStep from "./steps/ProductStep";
import SummaryStep from "./steps/SummaryStep";
import SupplierStep from "./steps/SupplierStep";

export default function PurchaseFormModal({
  open,
  onClose,

  loading = false,

  suppliers = [],
  products = [],

  initialData = null,

  onSubmit,
}) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    supplierId: "",
    supplier: null,

    notes: "",

    details: [],
  });

  // ========================================
  // INITIALIZE
  // ========================================

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(initialData);
    } else {
      setForm({
        supplierId: "",
        supplier: null,

        notes: "",

        details: [],
      });
    }

    setStep(1);
  }, [open, initialData]);

  // ========================================
  // VALIDATIONS
  // ========================================

  const nextStep = () => {
    // STEP 1
    if (step === 1) {
      if (!form.supplierId) {
        return alert("Seleccione un proveedor");
      }
    }

    // STEP 2
    if (step === 2) {
      if (!Array.isArray(form.details) || form.details.length === 0) {
        return alert("Agregue al menos un producto");
      }
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.supplierId) {
      return alert("Seleccione un proveedor");
    }

    if (!Array.isArray(form.details) || form.details.length === 0) {
      return alert("Agregue al menos un producto");
    }

    const payload = {
      supplierId: Number(form.supplierId),

      notes: form.notes || "",

      details: form.details.map((item) => ({
        productId: Number(item.productId),

        quantity: Number(item.quantity),

        // cambiar a costPrice
        // si tu backend lo requiere
        price: Number(item.costPrice),
      })),
    };

    onSubmit(payload);
  };

  // ========================================
  // RENDER STEP
  // ========================================

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SupplierStep suppliers={suppliers} form={form} setForm={setForm} />
        );

      case 2:
        return (
          <PurchaseProductsStep
            products={products}
            form={form}
            setForm={setForm}
          />
        );

      case 3:
        return <SummaryStep form={form} suppliers={suppliers} />;

      case 4:
        return <SummaryStep form={form} suppliers={suppliers} confirmation />;

      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <form
        onSubmit={handleSubmit}
        className="
          flex
          flex-col
          h-full
        "
      >
        {/* ========================================
         * HEADER
         * ====================================== */}

        <HeaderModal
          title="Nueva Compra"
          subtitle="Registrar compra de productos"
          onClose={onClose}
        />

        {/* ========================================
         * STEPPER
         * ====================================== */}

        <PurchaseStepper currentStep={step} />

        {/* ========================================
         * CONTENT
         * ====================================== */}

        <div
          className="
            flex-1
            overflow-hidden
          "
        >
          {renderStep()}
        </div>

        {/* ========================================
         * FOOTER
         * ====================================== */}

        <FooterModal>
          <div
            className="
              flex
              items-center
              justify-between
              w-full
            "
          >
            <div>
              {step > 1 && (
                <ModernButton type="button" text="Atrás" onClick={prevStep} />
              )}
            </div>

            <div className="flex gap-3">
              <ModernButton type="button" text="Cancelar" onClick={onClose} />

              {step < 4 ? (
                <ModernButton
                  type="button"
                  text="Siguiente"
                  onClick={nextStep}
                />
              ) : (
                <SubmitButton
                  text={loading ? "Guardando..." : "Confirmar Compra"}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
