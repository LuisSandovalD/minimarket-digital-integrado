// ========================================
// features/supplier/components/SupplierActions.jsx
// ========================================

import { Pencil, Trash2 } from "lucide-react";

import { ModernButton } from "@/components/buttons";

export default function SupplierActions({
  supplier,

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
      {/* EDIT */}

      <ModernButton
        size="sm"
        variant="warning"
        icon={Pencil}
        text="Editar"
        onClick={() => onEdit(supplier)}
      />

      {/* DELETE */}

      <ModernButton
        size="sm"
        variant="danger"
        icon={Trash2}
        text="Eliminar"
        onClick={() => onDelete(supplier.id)}
      />
    </div>
  );
}
