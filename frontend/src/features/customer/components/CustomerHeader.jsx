// ========================================
// features/customer/components/CustomerHeader.jsx
// ========================================

import { Plus, UserCheck, UserPlus, Users } from "lucide-react";

import { PageHeader } from "@/components/data-display/";

export default function CustomerHeader({
  total = 0,
  active = 0,
  newCustomers = 0,
  onCreate,
}) {
  return (
    <PageHeader
      icon={Users}
      badge="Clientes"
      title="Gestión de Clientes"
      description="
        Administra clientes,
        información de contacto
        e historial comercial.
      "
      // ========================================
      // MAIN ACTION
      // ========================================
      action={{
        label: "Nuevo Cliente",
        icon: Plus,
        onClick: onCreate,
      }}
      // ========================================
      // STATS
      // ========================================
      stats={[
        {
          icon: Users,
          label: "Total Clientes",
          value: total,
        },

        {
          icon: UserCheck,
          label: "Activos",
          value: active,
        },

        {
          icon: UserPlus,
          label: "Nuevos",
          value: newCustomers,
        },
      ]}
    />
  );
}
