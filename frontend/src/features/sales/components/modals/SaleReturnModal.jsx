// ========================================
// SALE RETURN MODAL
// ========================================

import React, { useState } from "react";

export const SaleReturnModal = ({ open, onClose, sale, onReturn }) => {
  const [items, setItems] = useState([]);

  if (!open || !sale) return null;

  const handleReturn = () => {
    onReturn?.(sale.id, items);
  };

  return (
    <div>
      <h2>Devolución</h2>

      <p>Venta #{sale.id}</p>

      <button onClick={handleReturn}>Confirmar devolución</button>

      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
