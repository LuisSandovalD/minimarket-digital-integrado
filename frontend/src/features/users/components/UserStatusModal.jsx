// ========================================
// components/users/UserStatusModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons/";
import { AlertModal } from "@/components/overlays";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { useState } from "react";

export default function UserStatusModal({ open, onClose, user, onToggleStatus }) {
  const [loading, setLoading] = useState(false);
  const isActive = user?.isActive;

  const handleToggle = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      await onToggleStatus?.(user.id);
      onClose();
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      type={isActive ? "error" : "success"} // Rojo si va a desactivar, Verde si va a activar
      title={isActive ? "¿Desactivar Cuenta de Usuario?" : "¿Reactivar Cuenta de Usuario?"}
      message={
        isActive
          ? `¿Estás seguro de suspender a "${user?.name || ""}"? Perderá de inmediato la capacidad de iniciar sesión y operar en la plataforma.`
          : `Se restaurarán los accesos del usuario "${user?.name || ""}" para que pueda ingresar al sistema con normalidad.`
      }
    >
      {/* Botones de acción adaptativos */}
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
          text={loading ? "Procesando..." : isActive ? "Desactivar Acceso" : "Activar Acceso"}
          variant={isActive ? "danger" : "success"}
          icon={isActive ? AlertTriangle : CheckCircle}
          onClick={handleToggle}
          disabled={loading}
          className="h-9 rounded-xl text-xs font-medium px-4"
        />
      </div>
    </AlertModal>
  );
}
