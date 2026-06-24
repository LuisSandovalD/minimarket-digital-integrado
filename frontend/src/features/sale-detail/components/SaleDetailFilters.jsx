// ========================================
// features/sales-detail/components/SaleDetailFilters.jsx
// ========================================
import { ModernButton } from "@/components/buttons";
import { SearchInput, Select } from "@/components/forms/";
import { Activity, RefreshCw, Search } from "lucide-react";
import { useState } from "react";

export default function SaleDetailFilters({ onSearch, onClear, loading }) {
  // Estados locales controlados para el borrador de filtros
  const [localSearch, setLocalSearch] = useState("");
  const [localStatus, setLocalStatus] = useState("");

  // Opciones estructuradas uno a uno con el enum SaleStatus
  const statusOptions = [
    { value: "DRAFT", label: "Borrador" },
    { value: "PENDING", label: "Pendiente" },
    { value: "COMPLETED", label: "Completado" },
    { value: "CANCELLED", label: "Cancelado" },
    { value: "RETURNED", label: "Devuelto" },
    { value: "ARCHIVED", label: "Archivado" },
    { value: "CREDIT_PENDING", label: "Crédito Pendiente" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envía strings limpios o undefined para evitar ruido en las queries REST/GraphQL
    onSearch({
      search: localSearch.trim() || undefined,
      status: localStatus || undefined,
    });
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalStatus("");
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-4
        bg-slate-50
        dark:bg-slate-900/40
        p-4
        rounded-xl
        border
        border-slate-100
        dark:border-slate-800/60
        w-full
        lg:flex-row
        lg:items-end
      "
    >
      {/* 1. BÚSQUEDA TEXTUAL DE PARTIDAS */}
      <div className="flex-1">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mb-2">
          Filtrar Partidas / Ítems
        </label>
        <SearchInput
          placeholder="Buscar por SKU, código de barras o nombre..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      {/* 2. FILTRO: ESTADO DE LA VENTA (SaleStatus) */}
      <div className="w-full lg:w-72">
        <Select
          label="Estado de la Venta"
          placeholder="Todos los estados"
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          options={statusOptions}
          icon={Activity}
        />
      </div>

      {/* 3. BOTONES DE ACCIÓN CORPORATIVOS */}
      <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
        <ModernButton
          type="button"
          disabled={loading}
          icon={RefreshCw}
          text="Limpiar"
          onClick={handleClear}
          variant="outline"
          className="flex-1 lg:flex-none"
        />

        <ModernButton
          type="submit"
          disabled={loading}
          icon={Search}
          text={loading ? "Filtrando..." : "Filtrar"}
          variant="primary"
          className="flex-1 lg:flex-none"
        />
      </div>
    </form>
  );
}
