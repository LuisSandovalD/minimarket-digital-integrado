// ========================================
// features/purchase/components/PurchaseActions.jsx
// ========================================

import { Pencil, Trash2 } from "lucide-react";

import { ModernButton } from "@/components/buttons/";

export default function PurchaseActions({
  purchase,

  onEdit,

  onDelete,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-end
        gap-2
      "
    >
      <ModernButton
        size="sm"
        variant="warning"
        icon={Pencil}
        text="Editar"
        onClick={() => onEdit(purchase)}
      />

      <ModernButton
        size="sm"
        variant="danger"
        icon={Trash2}
        text="Eliminar"
        onClick={() => onDelete(purchase)}
      />
    </div>
  );
}
