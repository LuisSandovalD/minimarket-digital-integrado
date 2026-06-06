import { useState } from "react";

export function useSaleForm({ onSubmit, onClose }) {
  const [step, setStep] = useState(1);

  const initialFormState = {
    customerId: null,
    customer: null,
    details: [],
    saleType: "CASH_SALE",
    payments: [{ id: "pay-1", method: "CASH", amount: "", reference: "" }],
    creditDueDate: "",
    notes: "",
  };

  const [form, setForm] = useState(initialFormState);

  const handleNext = () => {
    if (step === 1 && !form.customerId) {
      alert("Seleccione un cliente");
      return;
    }
    if (step === 2 && form.details.length === 0) {
      alert("Agregue al menos un producto");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const subtotal = form.details.reduce(
    (acc, item) => acc + Number(item.subtotal || 0),
    0,
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleSubmit = async () => {
    const paymentMethodMap = {
      CASH: 1,
      CARD: 2,
      YAPE: 3,
      PLIN: 4,
      TRANSFER: 5,
    };

    const payload = {
      customerId: Number(form.customerId),
      notes: form.notes || "",
      details: form.details.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        price: Number(item.unitPrice),
      })),
      payments: form.payments
        .filter((p) => Number(p.amount) > 0)
        .map((p) => ({
          paymentMethodId: paymentMethodMap[p.method],
          amount: Number(p.amount),
          reference: p.reference || null,
        })),
    };

    try {
      await onSubmit(payload);
      setStep(1);
      setForm(initialFormState);
      onClose();
    } catch (error) {
      console.error("SALE ERROR =>", error?.response?.data || error);
    }
  };

  return {
    step,
    setStep,
    form,
    setForm,
    initialFormState,
    subtotal,
    tax,
    total,
    handleNext,
    handlePrevious,
    handleSubmit,
  };
}
