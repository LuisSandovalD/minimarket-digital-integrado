// ========================================
// components/users/UserDeleteModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons/";
import { AlertModal } from "@/components/overlays";
import { Trash2, X } from "lucide-react";
import { useState } from "react";

export default function UserDeleteModal({ open, onClose, user, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      await onDelete?.(user.id);
      onClose();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      type="error"
      title="¿Eliminar usuario permanentemente?"
      message={`Esta acción es completamente irreversible. Se destruirá el registro de "${user?.name || ""}" junto con sus accesos y credenciales en el sistema.`}
    >
      {/* Botones de acción premium y lineales */}
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

        <ModernButton
          type="button"
          text={loading ? "Eliminando..." : "Confirmar Eliminación"}
          variant="danger"
          icon={Trash2}
          onClick={handleDelete}
          disabled={loading}
          className="h-9 rounded-xl text-xs font-medium px-4"
        />
      </div>
    </AlertModal>
  );
}
