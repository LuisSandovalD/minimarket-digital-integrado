// ========================================
// components/units/UnitHeader.jsx
// ========================================

import {
  Plus,
  Scale,
  Activity,
  Calculator,
} from "lucide-react";

import PageHeader
  from "@/components/ui/PageHeader";

export default function UnitHeader({

  units = [],

  onCreate,

}) {

  const stats = [

    {
      icon: Scale,
      label: "TOTAL",
      value: units.length,
    },

    {
      icon: Activity,
      label: "ACTIVAS",
      value:
        units.filter(
          (unit) => unit.isActive
        ).length,
    },

    {
      icon: Calculator,
      label: "CONVERSIÓN",
      value: "Automática",
    },

  ];

  return (

    <PageHeader
      icon={Scale}
      badge="Inventario"
      title="Gestión de Unidades"
      description="
        Administra las unidades de medida
        utilizadas para productos,
        conversiones y control de inventario.
      "
      stats={stats}
      action={{
        label: "Nueva Unidad",
        icon: Plus,
        onClick: onCreate,
      }}
    />

  );

}