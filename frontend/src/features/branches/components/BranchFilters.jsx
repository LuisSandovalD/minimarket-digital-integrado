// ========================================
// features/branches/components/BranchFilters.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { Input, SearchInput, Select } from "@/components/forms";

import { Globe, MapPin, RefreshCw, Search } from "lucide-react";

import { useState } from "react";

export default function BranchFilters({ onSearch, onClear, loading }) {
  const [localSearch, setLocalSearch] = useState("");
  const [localStatus, setLocalStatus] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localCountry, setLocalCountry] = useState("");

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

    let isActiveValue;

    if (localStatus === "true") {
      isActiveValue = true;
    } else if (localStatus === "false") {
      isActiveValue = false;
    }

    onSearch({
      search: localSearch.trim() || undefined,
      city: localCity.trim() || undefined,
      country: localCountry.trim() || undefined,
      isActive: isActiveValue,
    });
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalCity("");
    setLocalCountry("");
    setLocalStatus("");

    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SearchInput
          label="Buscar Sucursal"
          placeholder="Nombre, código o dirección..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        <Input
          label="Ciudad"
          placeholder="Ej: Madrid..."
          icon={MapPin}
          value={localCity}
          onChange={(e) => setLocalCity(e.target.value)}
        />

        <Input
          label="País"
          placeholder="Ej: España..."
          icon={Globe}
          value={localCountry}
          onChange={(e) => setLocalCountry(e.target.value)}
        />

        <Select
          label="Estado"
          placeholder="Todas"
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          options={statusOptions}
        />
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <ModernButton
          type="button"
          variant="outline"
          icon={RefreshCw}
          text="Limpiar"
          disabled={loading}
          onClick={handleClear}
        />

        <ModernButton
          type="submit"
          variant="primary"
          icon={Search}
          text={loading ? "Buscando..." : "Buscar"}
          disabled={loading}
        />
      </div>
    </form>
  );
}
