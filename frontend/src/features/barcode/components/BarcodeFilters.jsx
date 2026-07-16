// ========================================
// features/barcodes/components/BarcodeFilters.jsx
// ========================================

import { useState } from "react";

import { ModernButton } from "@/components/buttons";
import { SearchInput } from "@/components/forms";

import { RefreshCw, Search } from "lucide-react";

export default function BarcodeFilters({ value = "", onChange, onSearch, onClear, loading = false }) {
  const [localSearch, setLocalSearch] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch?.({
      search: localSearch.trim() || undefined,
    });
  };

  const handleClear = () => {
    setLocalSearch("");

    onChange?.("");

    onClear?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        rounded-xl
        border
        border-slate-100
        bg-slate-50
        p-4
        dark:border-slate-800/60
        dark:bg-slate-900/40
      "
    >
      <div className="grid grid-cols-1 gap-4">
        <SearchInput
          label="Buscar Producto"
          placeholder="Nombre, código o SKU..."
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            onChange?.(e.target.value);
          }}
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
