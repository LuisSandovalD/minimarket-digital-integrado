// ========================================
// features/sale-detail/components/SaleDetailHeader.jsx
// ========================================

import { DollarSign, Package, Receipt, ShoppingCart } from "lucide-react";

import { PageHeader } from "@/components/data-display";

export default function SaleDetailHeader({
  total = 0,

  totalQuantity = 0,

  totalRevenue = 0,
}) {
  return (
    <PageHeader
      icon={Receipt}
      badge="Detalles"
      title="Detalles de Ventas"
      description="
        Consulta los productos
        vendidos, cantidades,
        precios y subtotales
        registrados en cada venta.
      "
      // ========================================
      // HEADER ACTIONS
      // ========================================

      headerActions={
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* FUTUROS FILTROS */}
        </div>
      }
      // ========================================
      // STATS
      // ========================================

      stats={[
        {
          icon: ShoppingCart,
          label: "Registros",
          value: total,
        },

        {
          icon: Package,
          label: "Unidades Vendidas",
          value: totalQuantity,
        },

        {
          icon: DollarSign,
          label: "Ingresos",
          value: `S/ ${Number(totalRevenue).toFixed(2)}`,
        },
      ]}
    />
  );
}
