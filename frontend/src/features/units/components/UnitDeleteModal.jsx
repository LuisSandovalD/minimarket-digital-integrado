// ========================================
// features/units/components/UnitDeleteModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { AlertModal } from "@/components/overlays/";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteUnit } from "../services/unit.service";

export default function UnitDeleteModal({ open, onClose, reload, selectedUnit }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!open || !selectedUnit) {
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUnit(selectedUnit.id);
      reload();
      onClose();
    } catch (error) {
      console.error("Error al eliminar la unidad:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={() => !isDeleting && onClose()}
      type="error"
      title="Eliminar Unidad de Medida"
      message={`¿Estás seguro de que deseas eliminar la unidad "${selectedUnit.name}"? Esta acción no se puede deshacer.`}
    >
      {/* Botonera elegante inyectada directamente como children */}
      <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-2">
        <ModernButton type="button" variant="outline" text="Cancelar" disabled={isDeleting} onClick={onClose} />

        <ModernButton
          type="button"
          variant="danger"
          icon={Trash2}
          text={isDeleting ? "Eliminando..." : "Eliminar permanentemente"}
          disabled={isDeleting}
          onClick={handleDelete}
        />
      </div>
    </AlertModal>
  );
}
