// ============================================================================
// features/purchase/hooks/usePurchaseFormModal.js
// HOOK DE CONTROL: Gestiona el estado de los pasos, datos y envío de compras
// ============================================================================

import { useEffect, useState } from "react";

export function usePurchaseFormModal({
  open,
  initialData,
  onSubmit,
  totalSteps = 3,
}) {
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    supplierId: "",
    supplier: null,
    notes: "",
    details: [],
  });

  // Inicializar o limpiar el formulario al abrir/cambiar datos iniciales
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
    setErrorMessage("");
  }, [open, initialData]);

  // Limpiar mensajes de error cuando el usuario interactúa
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrorMessage("");
  }, [step, form.supplierId, form.details.length]);

  const validateCurrentStep = () => {
    if (step === 1 && !form.supplierId) {
      setErrorMessage(
        "Por favor, seleccione un proveedor calificado para continuar.",
      );
      return false;
    }

    if (
      step === 2 &&
      (!Array.isArray(form.details) || form.details.length === 0)
    ) {
      setErrorMessage(
        "El carrito está vacío. Agregue al menos un artículo a la orden.",
      );
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!validateCurrentStep()) return;

    // payload unificado usando la convención del controlador: costPrice
    const payload = {
      supplierId: Number(form.supplierId),
      notes: form.notes || "",
      details: form.details.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        costPrice: Number(item.costPrice), // Estandarizado a costPrice
      })),
    };

    onSubmit(payload);
  };

  return {
    step,
    setStep,
    form,
    setForm,
    errorMessage,
    setErrorMessage,
    handleNext,
    handlePrevious,
    handleSubmit,
  };
}
