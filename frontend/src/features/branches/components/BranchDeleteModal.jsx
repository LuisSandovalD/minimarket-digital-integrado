// ========================================
// components/BranchDeleteModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons/"; // Ajusta la ruta según tu estructura
import { AlertModal } from "@/components/overlays"; // Ajusta la ruta según tu estructura
import { Trash2, X } from "lucide-react";
import { useState } from "react";

export default function BranchDeleteModal({ open, onClose, branch, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!branch?.id) return;
    try {
      setLoading(true);
      await onDelete?.(branch.id);
      onClose();
    } catch (error) {
      console.error("Error al eliminar la sucursal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      type="error"
      title="¿Eliminar sucursal?"
      message={`Esta acción no se puede deshacer. Se eliminará permanentemente la sucursal "${branch?.name || ""}" de todos los registros del sistema.`}
    >
      {/* Botones de acción alineados de forma lineal y con diseño premium */}
      <div className="mt-5 flex items-center justify-end gap-3 w-full">
        <ModernButton
          type="button"
          text="Cancelar"
          variant="outline"
          icon={X}
          onClick={onClose}
          disabled={loading}
          className="h-9 rounded-xl text-xs font-medium"
        />

        <button
          type="button"
          disabled={loading}
          onClick={handleDelete}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50 dark:bg-rose-500 dark:hover:bg-rose-600"
        >
          <Trash2 size={14} />
          {loading ? "Eliminando..." : "Confirmar Eliminación"}
        </button>
      </div>
    </AlertModal>
  );
}
