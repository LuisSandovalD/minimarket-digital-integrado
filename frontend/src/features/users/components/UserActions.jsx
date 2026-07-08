// ========================================
// components/users/UserActions.jsx
// ========================================

import ModernButton from "@/components/buttons/ModernButton";
import { Edit2, Power, Trash2 } from "lucide-react";

export default function UserActions({
  user,
  onEdit,
  onToggleStatusTrigger, // 🌟 Disparador para abrir el AlertModal de cambio de estado
  onDeleteTrigger, // 🌟 Disparador para abrir el AlertModal de eliminación permanente
}) {
  return (
    <div className="flex items-center gap-2">
      {/* 1. EDITAR USUARIO (PUT) */}
      <ModernButton
        text=""
        icon={Edit2}
        variant="warning"
        size="sm"
        title="Editar Usuario"
        onClick={() => onEdit?.(user)}
      />

      {/* 2. CAMBIAR ESTADO (PATCH STATUS) -> Abre confirmación */}
      <ModernButton
        text=""
        icon={Power}
        variant={user.isActive ? "danger" : "success"}
        size="sm"
        title={user.isActive ? "Desactivar Usuario" : "Activar Usuario"}
        onClick={() => onToggleStatusTrigger?.(user)}
      />

      {/* 3. ELIMINAR DEFINITIVAMENTE (DELETE) -> Abre confirmación restrictiva */}
      <ModernButton
        text=""
        icon={Trash2}
        variant="outline"
        size="sm"
        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
        title="Eliminar permanentemente"
        onClick={() => onDeleteTrigger?.(user)}
      />
    </div>
  );
}
