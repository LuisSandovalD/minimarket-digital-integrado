// ========================================
// FEATURES / SALES / COMPONENTS
// SaleHeader.jsx
// ========================================

import {
  ShoppingCart,
  DollarSign,
  Receipt,
  TrendingUp,
  Plus,
} from "lucide-react";

import PageHeader
  from "@/components/ui/PageHeader";

// ========================================
// COMPONENT
// ========================================

export default function SaleHeader({
  totalSales = 0,
  totalRevenue = 0,
  totalOrders = 0,
  averageTicket = 0,
  onCreate,
}) {

  return (

    <PageHeader

      // ====================================
      // MAIN
      // ====================================

      icon={ShoppingCart}

      badge="Gestión Comercial"

      title="Ventas"

      description="
        Administra las ventas,
        pagos, devoluciones
        y movimientos comerciales
        de la empresa.
      "

      // ====================================
      // ACTION
      // ====================================

      action={{
        label: "Nueva Venta",
        icon: Plus,
        onClick: onCreate,
      }}

      // ====================================
      // STATS
      // ====================================

      stats={[

        {
          icon: DollarSign,
          label: "Ingresos",
          value: `S/ ${Number(
            totalRevenue
          ).toFixed(2)}`,
        },

        {
          icon: Receipt,
          label: "Ventas",
          value: totalOrders,
        },

        {
          icon: TrendingUp,
          label: "Ticket Promedio",
          value: `S/ ${Number(
            averageTicket
          ).toFixed(2)}`,
        },

      ]}

    />

  );

}