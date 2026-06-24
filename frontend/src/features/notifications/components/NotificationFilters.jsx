// ========================================
// features/notifications/components/NotificationFilters.jsx
// ========================================

import { SearchInput } from "@/components/forms/";
// Nota: Ajusta la ruta de importación de tu componente Select si es necesario
import { Select } from "@/components/forms/";
import { Filter } from "lucide-react";

export default function NotificationFilters({
  search,
  setSearch,
  priority, // Mantiene el nombre de la prop vinculada a tu hook useNotifications
  setPriority,
}) {
  // Mapeo estructurado para las opciones compatibles con tu componente Select
  const alertOptions = [
    { value: "LOW_STOCK", label: "Stock Bajo" },
    { value: "EXPIRING_PRODUCT", label: "Productos por Vencer" },
    { value: "INVENTORY_MISMATCH", label: "Descuadres de Inventario" },
    { value: "PURCHASE_READY", label: "Listos para Compra" },
    { value: "PAYMENT_OVERDUE", label: "Pagos Vencidos" },
    { value: "SYSTEM_ALERT", label: "Alertas del Sistema" },
    { value: "USER_ALERT", label: "Alertas de Usuario" },
  ];

  return (
    <div
      className="
        flex
        flex-col
        gap-4

        lg:flex-row
        lg:items-center
      "
    >
      {/* Buscador por SKU, Nombre o Almacén */}
      <div className="flex-1">
        <SearchInput
          placeholder="Buscar por SKU, nombre de producto o almacén..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtro utilizando tu componente reutilizable Select */}
      <div className="w-full lg:w-64">
        <Select
          name="notificationType"
          value={priority === "all" ? "" : priority} // Sincroniza tu estado "all" con el valor vacío del placeholder
          onChange={(e) => setPriority(e.target.value || "all")} // Si limpia el select, vuelve a "all"
          options={alertOptions}
          placeholder="Todos los tipos de alerta"
          icon={Filter} // Agregamos un ícono estético de Lucide-react
        />
      </div>
    </div>
  );
}
