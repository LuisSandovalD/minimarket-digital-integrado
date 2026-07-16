// ========================================
// features/configuration/components/ConfigurationHeader.jsx
// ========================================

import { PageHeader } from "@/components/data-display/";
import { Clock, Coins, DatabaseZap, Save, Settings } from "lucide-react";

export default function ConfigurationHeader({
  currency = "PEN",
  sessionTimeout = 3600,
  isBackupEnabled = true,
  onSave,
  isSubmitting = false,
}) {
  // Formateador rápido para mostrar el tiempo de sesión en minutos
  const timeoutMinutes = `${Math.round(sessionTimeout / 60)} min`;

  return (
    <PageHeader
      icon={Settings}
      badge="Sistema"
      title="Configuración General"
      description="Administra los parámetros globales de tu empresa, preferencias del sistema, seguridad, impuestos y políticas de respaldo."
      // ========================================
      // MAIN ACTION (Guardar cambios del formulario)
      // ========================================
      action={{
        label: isSubmitting ? "Guardando..." : "Guardar Cambios",
        icon: Save,
        onClick: onSave,
        disabled: isSubmitting,
      }}
      // ========================================
      // EXTRA ACTIONS (Por si necesitas meter algo en el futuro)
      // ========================================
      headerActions={<div className="flex items-center gap-3">{/* Opciones extra si fueran necesarias */}</div>}
      // ========================================
      // STATS (Indicadores de la configuración actual)
      // ========================================
      stats={[
        {
          icon: Coins,
          label: "Moneda Base",
          value: currency,
        },
        {
          icon: Clock,
          label: "Expiración Sesión",
          value: timeoutMinutes,
        },
        {
          icon: DatabaseZap,
          label: "Copia de Seguridad",
          value: isBackupEnabled ? "Activo" : "Inactivo",
          className: isBackupEnabled ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400",
        },
      ]}
    />
  );
}
