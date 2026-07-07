// ========================================
// features/supplier/components/SupplierFilters.jsx
// ========================================

import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { SearchInput, Select } from "@/components/forms";

import {
  Building2,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

export default function SupplierFilters({
  onSearch,
  onClear,
  loading,
  globalFilters,
}) {
  const [localSearch, setLocalSearch] = useState("");
  const [localStatus, setLocalStatus] = useState("");

  const statusOptions = [
    { value: "true", label: "Activos" },
    { value: "false", label: "Inactivos" },
  ];

  useEffect(() => {
    if (globalFilters) {
      setLocalSearch(globalFilters.search || "");
      setLocalStatus(globalFilters.isActive ?? "");
    }
  }, [globalFilters]);

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

    onSearch({
      search: localSearch.trim(),
      isActive: localStatus,
    });
  };

  const handleClear = (e) => {
    e.preventDefault();

    setLocalSearch("");
    setLocalStatus("");

    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SearchInput
          label="Buscar proveedor"
          placeholder="Nombre, RUC, correo o contacto..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          icon={Building2}
        />

        <Select
          label="Estado"
          placeholder="Todos los estados"
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
