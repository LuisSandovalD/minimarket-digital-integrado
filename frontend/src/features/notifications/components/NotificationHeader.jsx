// ========================================
// FEATURES / NOTIFICATIONS / COMPONENTS
// NOTIFICATION HEADER
// ========================================

import { AlertCircle, AlertTriangle, Package, RefreshCw } from "lucide-react";

import { PageHeader } from "@/components/data-display";

export default function NotificationHeader({
  totalAlerts = 0,
  highPriorityCount = 0,
  mediumPriorityCount = 0,
  loading = false,
  onRefresh,
}) {
  return (
    <PageHeader
      icon={Package}
      badge="Alertas"
      title="Centro de Alertas de Stock"
      description="
        Monitoreo en tiempo real de rupturas de stock, 
        quiebres técnicos e inventarios críticos calculados 
        desde el inventario general.
      "
      headerActions={
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 text-gray-600 hover:text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
            title="Sincronizar inventario"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
          </button>
        </div>
      }
      stats={[
        {
          icon: Package,
          label: "Alertas Activas",
          value: totalAlerts,
        },
        {
          icon: AlertCircle,
          label: "Agotados (High)",
          value: highPriorityCount,
          className: "text-red-600", // Si tu PageHeader acepta estilos inline o clases custom
        },
        {
          icon: AlertTriangle,
          label: "Stock Bajo (Medium)",
          value: mediumPriorityCount,
          className: "text-amber-600",
        },
      ]}
    />
  );
}
