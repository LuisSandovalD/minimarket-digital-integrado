// ========================================
// CANCEL SALE MODAL
// ========================================

import React from "react";

export const SaleCancelModal = ({
  open,
  onClose,
  sale,
  onCancel,
}) => {
  if (!open || !sale) return null;

  return (
    <div>

      <h2>Cancelar venta</h2>

      <p>
        ¿Seguro que deseas cancelar la venta #{sale.id}?
      </p>

      <button onClick={() => onCancel(sale.id)}>
        Sí, cancelar
      </button>

      <button onClick={onClose}>
        No
      </button>

    </div>
  );
};