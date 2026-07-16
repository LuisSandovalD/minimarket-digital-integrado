// ========================================
// features/customers/components/CustomerDeleteModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { AlertModal } from "@/components/overlays/";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import customerService from "../services/customer.service"; // Corregida la importación sin llaves ({})

export default function CustomerDeleteModal({ open, onClose, reload, selectedCustomer }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!open || !selectedCustomer) {
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await customerService.remove(selectedCustomer.id);
      await reload(); // Ejecuta la limpieza o recarga desde la página
      onClose();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={() => !isDeleting && onClose()}
      type="error"
      title="Eliminar Cliente"
      message={`¿Estás seguro de que deseas eliminar al cliente "${selectedCustomer.name}"? Esta acción no se puede deshacer.`}
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
