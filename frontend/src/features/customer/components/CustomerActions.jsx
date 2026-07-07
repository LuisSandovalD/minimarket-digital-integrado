// ========================================
// features/customers/components/CustomerActions.jsx
// ========================================

import { ModernButton } from "@/components/buttons/";
import { Pencil, Trash2 } from "lucide-react";

export default function CustomerActions({ customer, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <ModernButton
        size="sm"
        variant="warning"
        icon={Pencil}
        text="Editar"
        onClick={() => onEdit(customer)}
      />

      <ModernButton
        size="sm"
        variant="danger"
        icon={Trash2}
        text="Eliminar"
        onClick={() => onDelete(customer)}
      />
    </div>
  );
}
