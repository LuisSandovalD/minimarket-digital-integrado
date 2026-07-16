import { useEffect, useState } from "react";

// Diccionario estandarizado para reportar el 'method' string que exige el Backend
const METHOD_MAPPER = {
  1: "CASH", // Efectivo Caja General
  2: "CARD", // Tarjeta de Crédito/Débito
  3: "YAPE", // Yape
  4: "PLIN", // Plin
  5: "TRANSFER", // Transferencia Bancaria
  6: "CREDIT", // Al Crédito
};

export function useSalePayment({ sale, onSubmit, onClose }) {
  const [form, setForm] = useState({
    payments: [],
  });

  // Determinar la deuda inicial de la venta de forma segura
  const currentDebtAmount = Number(sale?.pendingDebt !== undefined ? sale.pendingDebt : sale?.total || 0);

  useEffect(() => {
    if (sale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        payments: [
          {
            id: crypto.randomUUID(),
            paymentMethodId: 1, // Efectivo por defecto
            amount: currentDebtAmount > 0 ? currentDebtAmount : "",
            reference: "",
          },
        ],
      });
    }
  }, [sale, currentDebtAmount]);

  // Sumatoria en tiempo real de lo digitado en el modal
  const totalPaidInModal = Number(
    (form.payments || []).reduce((acc, p) => acc + (Number(p.amount) || 0), 0).toFixed(2),
  );

  // Cálculo del vuelto (si aplica)
  const changeDue = totalPaidInModal > currentDebtAmount ? (totalPaidInModal - currentDebtAmount).toFixed(2) : "0.00";

  // Cálculo de la deuda remanente que se inyectará al payload raíz del backend
  const calculatedPendingDebt =
    currentDebtAmount - totalPaidInModal > 0 ? Number((currentDebtAmount - totalPaidInModal).toFixed(2)) : 0.0;

  // Formato string para pintar en la interfaz UI
  const pendingDebtStr = calculatedPendingDebt.toFixed(2);

  const addPaymentRow = () => {
    setForm((prev) => ({
      ...prev,
      payments: [
        ...prev.payments,
        {
          id: crypto.randomUUID(),
          paymentMethodId: 1,
          amount: "",
          reference: "",
        },
      ],
    }));
  };

  const removePaymentRow = (id) => {
    setForm((prev) => ({
      ...prev,
      payments: prev.payments.filter((p) => p.id !== id),
    }));
  };

  const updatePaymentRow = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      payments: prev.payments.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!sale?.id) return;

    // 1. Validar y estructurar las filas del desglose interno de cobros
    //    🎯 Estructura idéntica a la validada en Postman:
    //    solo { paymentMethodId, method, amount } — sin "reference" cuando está vacío
    const validPaymentsInModal = (form.payments || [])
      .filter((p) => p.amount && Number(p.amount) > 0)
      .map((p) => {
        const idNum = Number(p.paymentMethodId || 1);
        const cleanRef = p.reference?.trim();

        const paymentItem = {
          paymentMethodId: idNum,
          method: METHOD_MAPPER[idNum] || "CASH", // 🎯 Mapea dinámicamente "CASH", "YAPE", etc.
          amount: Number(Number(p.amount).toFixed(2)),
        };

        // Solo agrega "reference" si el usuario realmente escribió algo
        if (cleanRef) {
          paymentItem.reference = cleanRef;
        }

        return paymentItem;
      });

    if (validPaymentsInModal.length === 0) {
      alert("Por favor, ingrese un monto válido para procesar el abono.");
      return;
    }

    // 2. Determinar dinámicamente el tipo de cobro principal
    // Si incluye un método crédito o la deuda remanente es mayor a cero, es venta crédito, sino venta al contado.
    const hasCreditRow = validPaymentsInModal.some((p) => p.method === "CREDIT");
    const saleTypePayload = calculatedPendingDebt > 0.05 || hasCreditRow ? "CREDIT_SALE" : "CASH_SALE";

    // 3. Construir payload unificado idéntico al validado en Postman:
    //    { saleType, pendingDebt, isAbonoFlow, payments: [...] }
    const payload = {
      saleType: saleTypePayload,
      pendingDebt: calculatedPendingDebt, // 🎯 Fuerza el cambio de estado a COMPLETED en el backend si llega a 0
      isAbonoFlow: true, // 🎯 Protege el historial acumulativo de abonos en caja
      payments: validPaymentsInModal,
    };

    // Envío seguro hacia el hook mutador de Axios o función contenedora
    onSubmit?.(sale.id, payload);
    if (onClose) onClose();
  };

  return {
    form,
    setForm,
    changeDue,
    pendingDebt: pendingDebtStr, // Retorna la versión string formateada para el Front (0.00)
    totalPaidInModal,
    addPaymentRow,
    removePaymentRow,
    updatePaymentRow,
    handleSubmit,
  };
}
