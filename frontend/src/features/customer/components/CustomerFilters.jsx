// ========================================
// features/customers/components/CustomerFilters.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { Input, SearchInput, Select } from "@/components/forms";

import { CheckCircle2, HelpCircle, MapPin, RefreshCw, Search, XCircle } from "lucide-react";

import { useState } from "react";

export default function CustomerFilters({ onSearch, onClear, loading }) {
  const [localSearch, setLocalSearch] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localStatus, setLocalStatus] = useState("");

  const statusOptions = [
    {
      value: "true",
      label: "Activos",
    },
    {
      value: "false",
      label: "Inactivos",
    },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let isActive = undefined; // Por defecto si está vacío

    if (localStatus === "true") {
      isActive = true;
    } else if (localStatus === "false") {
      isActive = false;
    }

    // CORREGIDO: Enviamos "" en lugar de undefined para que pise el filtro previo en el hook
    onSearch({
      search: localSearch.trim(),
      city: localCity.trim(),
      isActive,
    });
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalCity("");
    setLocalStatus("");

    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SearchInput
          label="Buscar Cliente"
          placeholder="Nombre, documento, correo o teléfono..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        <Input
          label="Ciudad"
          placeholder="Ej: Lima..."
          icon={MapPin}
          value={localCity}
          onChange={(e) => setLocalCity(e.target.value)}
        />

        <Select
          label="Estado"
          placeholder="Todos"
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          options={statusOptions}
          icon={getStatusIcon()}
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
