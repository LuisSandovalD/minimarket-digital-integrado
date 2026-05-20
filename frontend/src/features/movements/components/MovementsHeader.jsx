// ========================================
// features/movements/components/MovementsHeader.jsx
// ========================================

import {
  ArrowDown,
  ArrowUp,
  PackageX,
  RefreshCcw,
  History,
  Plus,
  Warehouse,
} from "lucide-react";

import { PageHeader } from "@/components/ui";

export default function MovementsHeader({
  movements = [],

  onRefresh,
}) {
  // ========================================
  // STATS
  // ========================================

  const entries = movements.filter(
    (movement) => movement.type === "ADD" || movement.type === "PURCHASE",
  ).length;

  const outputs = movements.filter(
    (movement) => movement.type === "REMOVE" || movement.type === "SALE",
  ).length;

  const damaged = movements.filter(
    (movement) => movement.type === "DAMAGED",
  ).length;

  const transfers = movements.filter(
    (movement) => movement.type === "TRANSFER",
  ).length;

  // ========================================
  // UNIQUE BRANCHES
  // ========================================

  const branches = new Set(movements.map((movement) => movement.branch?.id))
    .size;

  return (
    <PageHeader
      icon={History}
      badge="Inventario"
      title="Historial de Movimientos"
      description="
        Visualiza todos los movimientos
        de inventario realizados dentro
        del sistema incluyendo entradas,
        salidas, transferencias y pérdidas.
      "
      action={{
        label: "Actualizar",

        icon: Plus,

        onClick: onRefresh,

        variant: "primary",
      }}
      stats={[
        {
          icon: History,
          label: "Movimientos",
          value: movements.length,
        },

        {
          icon: ArrowUp,
          label: "Entradas",
          value: entries,
        },

        {
          icon: ArrowDown,
          label: "Salidas",
          value: outputs,
        },

        {
          icon: PackageX,
          label: "Dañados",
          value: damaged,
        },

        {
          icon: RefreshCcw,
          label: "Transferencias",
          value: transfers,
        },

        {
          icon: Warehouse,
          label: "Sucursales",
          value: branches,
        },
      ]}
    />
  );
}
