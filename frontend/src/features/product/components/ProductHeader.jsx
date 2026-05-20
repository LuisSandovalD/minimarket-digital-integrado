// ========================================
// features/product/components/ProductHeader.jsx
// ========================================

import { Package, Plus, Boxes, AlertTriangle, Activity } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

import { NotificationsModal } from "@/features/notifications-product";

export default function ProductHeader({ total = 0, lowStock = 0, onCreate }) {
  return (
    <PageHeader
      icon={Package}
      badge="Inventario"
      title="Gestión de Productos"
      description="
        Administra productos,
        stock, precios y
        vencimientos del sistema.
      "
      // ========================================
      // MAIN ACTION
      // ========================================

      action={{
        label: "Nuevo Producto",
        icon: Plus,
        onClick: onCreate,
      }}
      // ========================================
      // STATS
      // ========================================

      stats={[
        {
          icon: Boxes,
          label: "Productos",
          value: total,
        },

        {
          icon: AlertTriangle,
          label: "Stock Bajo",
          value: lowStock,
        },

        {
          icon: Package,
          label: "Activos",
          value: total - lowStock,
        },
      ]}
    />
  );
}
