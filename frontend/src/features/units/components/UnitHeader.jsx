// ========================================
// FEATURES / UNITS / COMPONENTS
// UnitHeader.jsx
// ========================================

import { CheckCircle2, Layers, Plus, Scale, XCircle } from "lucide-react";

import { PageHeader } from "@/components/data-display";

// ========================================
// COMPONENT
// ========================================

export default function UnitHeader({ units = [], onCreate }) {
  // ========================================
  // CALCULO DE MÉTRICAS (Datos en tiempo real)
  // ========================================
  const totalUnits = units.length;
  const activeUnits = units.filter((unit) => unit.isActive).length;
  const inactiveUnits = totalUnits - activeUnits;

  return (
    <PageHeader
      // ====================================
      // MAIN
      // ====================================
      icon={Scale}
      badge="Configuración de Inventario"
      title="Unidades de Medida"
      description="
        Administra las magnitudes,
        abreviaciones y factores
        de conversión utilizados para
        el control de stock.
      "
      // ====================================
      // ACTION
      // ====================================
      action={{
        label: "Nueva Unidad",
        icon: Plus,
        onClick: onCreate,
      }}
      // ====================================
      // STATS (Igual al formato de Ventas)
      // ====================================
      stats={[
        {
          icon: Layers,
          label: "Total Registradas",
          value: totalUnits,
        },
        {
          icon: CheckCircle2,
          label: "Activas",
          value: activeUnits,
          className: "text-emerald-500 dark:text-emerald-400", // Por si tu PageHeader acepta estilos por celda
        },
        {
          icon: XCircle,
          label: "Inactivas",
          value: inactiveUnits,
          className: "text-rose-500 dark:text-rose-400",
        },
      ]}
    />
  );
}
