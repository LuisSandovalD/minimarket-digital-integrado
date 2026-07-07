// ========================================
// features/categories/components/CategoryDeleteModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { AlertModal } from "@/components/overlays/";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteCategory } from "../services/category.service";

export default function CategoryDeleteModal({
  open,
  onClose,
  reload,
  selectedCategory,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!open || !selectedCategory) {
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCategory(selectedCategory.id);
      reload();
      onClose();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={() => !isDeleting && onClose()}
      type="error"
      title="Eliminar Categoría"
      message={`¿Estás seguro de que deseas eliminar la categoría "${selectedCategory.name}"? Esta acción no se puede deshacer.`}
    >
      {/* Botonera elegante inyectada directamente como children */}
      <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-2">
        <ModernButton
          type="button"
          variant="outline"
          text="Cancelar"
          disabled={isDeleting}
          onClick={onClose}
        />

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
