// ========================================
// features/sales/hooks/useSaleForm.js
// ========================================
import { useMemo, useState } from "react";

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export function useSaleForm({ onSubmit, onClose }) {
  const [step, setStep] = useState(1);

  const initialFormState = {
    customerId: null,
    customer: null,
    details: [],
    saleType: "CASH_SALE",
    invoiceType: "BOLETA",
    payments: [
      {
        id: "initial-cash-pay",
        method: "CASH",
        amount: "",
        reference: "EFECTIVO-CAJA-01",
      },
    ],
    creditDueDate: "",
    notes: "",
    discount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
  };

  const [form, setForm] = useState(initialFormState);

  const handleNext = () => {
    if (step === 1 && !form.customerId) {
      alert("Seleccione un cliente");
      return;
    }
    if (step === 2 && form.details.length === 0) {
      alert("Agregue al menos un producto al carrito");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // 📊 Cómputo matemático dinámico en tiempo real para las vistas del formulario POS
  const { subtotal, tax, total } = useMemo(() => {
    const details = form.details || [];
    const rawSubtotal = details.reduce(
      (acc, item) =>
        acc +
        Number(item.quantity || 0) * Number(item.price || item.salePrice || 0),
      0,
    );
    const subtotalRedondeado = Math.round(rawSubtotal * 100) / 100;
    const descuentoRedondeado = Number(form.discount || 0);

    const netoConDescuento = Math.max(
      0,
      subtotalRedondeado - descuentoRedondeado,
    );
    const impuestoCalculado = Math.round(netoConDescuento * 0.18 * 100) / 100;
    const totalCalculado =
      Math.round((netoConDescuento + impuestoCalculado) * 100) / 100;

    return {
      subtotal: subtotalRedondeado,
      tax: impuestoCalculado,
      total: totalCalculado,
    };
  }, [form.details, form.discount]);

  const handleSubmit = async () => {
    const paymentMethodMap = {
      CASH: 1,
      CARD: 2,
      YAPE: 3,
      PLIN: 4,
      TRANSFER: 5,
    };
    let finalPayments = [];

    if (form.saleType === "CREDIT_SALE") {
      finalPayments = [
        {
          paymentMethodId: 1,
          amount: Number(total.toFixed(2)),
          status: "PENDING",
          dueDate: form.creditDueDate || getTodayDateString(),
          reference: "CRÉDITO-DIRECTO",
        },
      ];
    } else {
      finalPayments = (form.payments || [])
        .filter((p) => p.amount && Number(p.amount) > 0)
        .map((p) => ({
          amount: Number(Number(p.amount).toFixed(2)),
          status: "COMPLETED",
          paymentMethodId: paymentMethodMap[p.method] || 1,
          reference: p.reference?.trim() || "EFECTIVO-CAJA-01",
        }));
    }

    const payload = {
      customerId: form.customerId ? Number(form.customerId) : 1,
      invoiceType: form.invoiceType || "BOLETA",
      discount: Number(form.discount || 0),
      notes:
        form.notes?.trim() || "Venta presencial en tienda - Pago en efectivo",
      status: form.saleType === "CREDIT_SALE" ? "CREDIT_PENDING" : "COMPLETED",
      details: form.details.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        price: Number(item.price || item.salePrice || 0),
      })),
      payments: finalPayments,
    };

    try {
      await onSubmit(payload);
      setStep(1);
      setForm(initialFormState);
      onClose();
    } catch (error) {
      console.error(
        "❌ Error al procesar el envío del formulario de ventas:",
        error,
      );
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
