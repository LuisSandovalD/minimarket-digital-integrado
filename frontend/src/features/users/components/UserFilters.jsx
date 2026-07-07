// ========================================
// features/users/components/UserFilters.jsx
// ========================================

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

import { useState } from "react";

export default function UserFilters({
  onSearch,
  onClear,
  branches = [],
  loading,
}) {
  const [localSearch, setLocalSearch] = useState("");
  const [localBranch, setLocalBranch] = useState("");
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

  const branchOptions = branches.map((branch) => ({
    value: String(branch.id),
    label: branch.name,
  }));

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
      branchId: localBranch || undefined,
      isActive: isActiveValue,
    });
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalBranch("");
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
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SearchInput
          label="Buscar Usuario"
          placeholder="Nombre, correo o teléfono..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        <Select
          label="Sucursal"
          placeholder="Todas las sucursales"
          value={localBranch}
          onChange={(e) => setLocalBranch(e.target.value)}
          options={branchOptions}
          icon={Building2}
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
