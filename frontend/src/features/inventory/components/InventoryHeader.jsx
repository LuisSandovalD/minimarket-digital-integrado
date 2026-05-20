import { Boxes, Building2, Package, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/data-display/";

import { NotificationsModal } from "@/features/notifications-product";

export default function InventoryHeader({ onCreate }) {
  return (
    <PageHeader
      icon={Building2}
      badge="Control de Almacenamiento"
      title="Inventario por Sucursales"
      description="
        Visualiza, monitorea y gestiona los niveles de stock, 
        productos disponibles y movimientos logísticos distribuidos 
        en cada una de las sedes de la empresa.
      "
      headerActions={
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* NOTIFICATIONS */}

          <NotificationsModal />
        </div>
      }
      stats={[
        {
          icon: Boxes,
          label: "Logística",
          value: "Stock unificado",
        },
        {
          icon: Package,
          label: "Distribución",
          value: "Sedes activas",
        },
        {
          icon: TrendingUp,
          label: "Monitoreo",
          value: "Flujo en tiempo real",
        },
      ]}
    />
  );
}
