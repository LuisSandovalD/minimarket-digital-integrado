// ========================================
// features/units/components/UnitFilters.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { SearchInput, Select } from "@/components/forms";

import {
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

import { useState } from "react";

export default function UnitFilters({ onSearch, onClear, loading }) {
  const [localSearch, setLocalSearch] = useState("");
  const [localStatus, setLocalStatus] = useState("");

  const statusOptions = [
    {
      value: "true",
      label: "Activas",
    },
    {
      value: "false",
      label: "Inactivas",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // CORRECCIÓN: Convertir el string "true"/"false" a un booleano real o undefined
    let isActiveValue = undefined;
    if (localStatus === "true") isActiveValue = true;
    if (localStatus === "false") isActiveValue = false;

    onSearch({
      search: localSearch.trim() || undefined,
      isActive: isActiveValue,
    });
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalStatus("");
    onClear();
  };

  const getStatusIcon = () => {
    switch (localStatus) {
      case "true":
        return CheckCircle2;
      case "false":
        return XCircle;
      default:
        return HelpCircle;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 w-full lg:flex-row lg:items-end "
    >
      {/* Buscar */}
      <div className="flex-1">
        <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Buscar Unidad
        </label>

        <SearchInput
          placeholder="Buscar por nombre o abreviatura..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      {/* Estado */}
      <div className="w-full lg:w-56">
        <Select
          label="Estado"
          placeholder="Todas"
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          options={statusOptions}
          icon={getStatusIcon()}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
        <ModernButton
          type="button"
          variant="outline"
          icon={RefreshCw}
          text="Limpiar"
          disabled={loading}
          onClick={handleClear}
          className="flex-1 lg:flex-none"
        />

        <ModernButton
          type="submit"
          variant="primary"
          icon={Search}
          text={loading ? "Buscando..." : "Buscar"}
          disabled={loading}
          className="flex-1 lg:flex-none"
        />
      </div>
    </form>
  );
}
