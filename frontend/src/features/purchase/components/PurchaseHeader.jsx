// ========================================
// features/purchase/components/PurchaseHeader.jsx
// ========================================

import {
  Activity,
  ClipboardList,
  DollarSign,
  Plus,
  Receipt,
} from "lucide-react";

import { PageHeader } from "@/components/data-display/";

export default function PurchaseHeader({
  total = 0,

  pending = 0,

  completed = 0,

  onCreate,
}) {
  return (
    <PageHeader
      icon={Receipt}
      badge="Compras"
      title="Gestión de Compras"
      description="
        Administra órdenes,
        proveedores, pagos y
        registros de compras
        del sistema.
      "
      // ========================================
      // MAIN ACTION
      // ========================================

      action={{
        label: "Nueva Compra",
        icon: Plus,
        onClick: onCreate,
      }}
      // ========================================
      // EXTRA ACTIONS
      // ========================================

      headerActions={
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* EXTRA ACTIONS */}
        </div>
      }
      // ========================================
      // STATS
      // ========================================

      stats={[
        {
          icon: ClipboardList,
          label: "Compras",
          value: total,
        },

        {
          icon: Activity,
          label: "Pendientes",
          value: pending,
        },

        {
          icon: DollarSign,
          label: "Completadas",
          value: completed,
        },
      ]}
    />
  );
}
