// ========================================
// SALE DETAIL MODAL
// ========================================

import React from "react";

export const SaleDetailModal = ({ open, onClose, sale }) => {
  if (!open || !sale) return null;

  return (
    <div>
      <h2>Detalle de venta</h2>

      <p>Cliente: {sale.customerName}</p>
      <p>Total: {sale.total}</p>
      <p>Estado: {sale.status}</p>

      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
