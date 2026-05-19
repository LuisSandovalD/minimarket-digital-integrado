// ========================================
// components/BranchHeader.jsx
// ========================================

import {
  Building2,
  Database,
  Layers3,
  Plus,
} from "lucide-react";

import {PageHeader} from "@/components/ui/";

export default function BranchHeader({
  onCreate,
}) {

  return (

    <PageHeader
      icon={Building2}

      badge="Administración empresarial"

      title="Gestión de sucursales"

      description="
        Centraliza la administración,
        operación y control de todas
        las sedes de tu organización
        desde un único panel.
      "

      action={{
        label: "Crear sucursal",
        icon: Plus,
        onClick: onCreate,
      }}

      stats={[

        {
          icon: Layers3,

          label: "Operación",

          value:
            "Gestión centralizada",
        },

        {
          icon: Database,

          label: "Infraestructura",

          value:
            "Datos sincronizados",
        },

        {
          icon: Building2,

          label: "Rendimiento",

          value:
            "Administración eficiente",
        },

      ]}
    />

  );

}