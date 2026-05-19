// ========================================
// SALE PAYMENT MODAL
// ========================================

import React, { useState } from "react";

export const SalePaymentModal = ({
  open,
  onClose,
  sale,
  onPay,
}) => {
  const [amount, setAmount] = useState(0);

  if (!open || !sale) return null;

  const handlePay = () => {
    onPay?.(sale.id, amount);
  };

  return (
    <div>

      <h2>Pago de venta</h2>

      <p>Total: {sale.total}</p>

      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) =>
          setAmount(Number(e.target.value))
        }
      />

      <button onClick={handlePay}>
        Registrar pago
      </button>

      <button onClick={onClose}>
        Cerrar
      </button>

    </div>
  );
};