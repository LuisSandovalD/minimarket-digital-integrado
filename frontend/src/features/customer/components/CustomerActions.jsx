import { Pencil, Trash2 } from "lucide-react";

import { ModernButton } from "@/components/buttons/";

export default function CustomerActions({ customer, onEdit, onDelete }) {
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
        onClick={() => onEdit(customer)}
      />

      <ModernButton
        size="sm"
        variant="danger"
        icon={Trash2}
        text="Eliminar"
        onClick={() => onDelete(customer.id)}
      />
    </div>
  );
}
