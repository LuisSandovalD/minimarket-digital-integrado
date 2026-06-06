import { useEffect, useState } from "react";

export function useSalePayment({ sale, onSubmit, onClose }) {
  const [form, setForm] = useState({
    method: "CASH",
    amount: 0,
    reference: "",
  });

  // Sincronizar el monto inicial cuando cambie o cargue la venta
  useEffect(() => {
    if (sale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({
        ...prev,
        amount: sale.total || 0,
      }));
    }
  }, [sale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();

    onSubmit?.(sale?.id, {
      method: form.method,
      amount: Number(form.amount),
      reference: form.reference,
    });
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
}
