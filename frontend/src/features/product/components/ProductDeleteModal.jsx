// ========================================
// features/products/components/ProductDeleteModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { AlertModal } from "@/components/overlays";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import productService from "../services/product.service";

export default function ProductDeleteModal({ open, onClose, reload, selectedProduct }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!open || !selectedProduct) {
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await productService.remove(selectedProduct.id);

      await reload();

      onClose();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={() => !isDeleting && onClose()}
      type="error"
      title="Eliminar Producto"
      message={`¿Estás seguro de que deseas eliminar el producto "${selectedProduct.name}"? Esta acción no se puede deshacer.`}
    >
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
