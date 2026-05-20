// ========================================
// features/supplier/components/SupplierHeader.jsx
// ========================================

import { Truck, Plus, Users, Activity, AlertCircle } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

export default function SupplierHeader({
  total = 0,
  active = 0,
  inactive = 0,
  onCreate,
}) {
  return (
    <PageHeader
      // ========================================
      // ICON
      // ========================================

      icon={Truck}
      // ========================================
      // BADGE
      // ========================================

      badge="Proveedores"
      // ========================================
      // TITLE
      // ========================================

      title="Gestión de Proveedores"
      // ========================================
      // DESCRIPTION
      // ========================================

      description="
        Administra proveedores,
        contactos, información
        comercial y compras.
      "
      // ========================================
      // MAIN ACTION
      // ========================================

      action={{
        label: "Nuevo Proveedor",

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
          {/* EXTRA BUTTONS */}
        </div>
      }
      // ========================================
      // STATS
      // ========================================

      stats={[
        {
          icon: Users,
          label: "Total",
          value: total,
        },

        {
          icon: Activity,
          label: "Activos",
          value: active,
        },

        {
          icon: AlertCircle,
          label: "Inactivos",
          value: inactive,
        },
      ]}
    />
  );
}
