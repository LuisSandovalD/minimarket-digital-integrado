// ========================================
// features/movements/components/MovementFilters.jsx
// ========================================

import { useState } from "react";

import { ModernButton } from "@/components/buttons";
import { SearchInput, Select } from "@/components/forms";

import { Package, RefreshCw, Search, Shuffle } from "lucide-react";

export default function MovementFilters({ branches = [], products = [], onSearch, onClear, loading }) {
  const [localSearch, setLocalSearch] = useState("");
  const [localBranch, setLocalBranch] = useState("");
  const [localProduct, setLocalProduct] = useState("");
  const [localType, setLocalType] = useState("");

  const branchOptions = [
    {
      value: "",
      label: "Todas las sucursales",
    },
    ...branches.map((branch) => ({
      value: branch.id,
      label: branch.name,
    })),
  ];

  const productOptions = [
    {
      value: "",
      label: "Todos los productos",
    },
    ...products.map((product) => ({
      value: product.id,
      label: product.name,
    })),
  ];

  const typeOptions = [
    {
      value: "",
      label: "Todos",
    },
    {
      value: "ADD",
      label: "Entrada",
    },
    {
      value: "REMOVE",
      label: "Salida",
    },
    {
      value: "DAMAGED",
      label: "Dañado",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      search: localSearch.trim() || undefined,
      branchId: localBranch || undefined,
      productId: localProduct || undefined,
      type: localType || undefined,
    });
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalBranch("");
    setLocalProduct("");
    setLocalType("");

    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SearchInput
          label="Buscar"
          placeholder="Producto, SKU..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        <Select
          label="Sucursal"
          icon={Package}
          value={localBranch}
          onChange={(e) => setLocalBranch(e.target.value)}
          options={branchOptions}
        />

        <Select
          label="Producto"
          icon={Package}
          value={localProduct}
          onChange={(e) => setLocalProduct(e.target.value)}
          options={productOptions}
        />

        <Select
          label="Tipo"
          icon={Shuffle}
          value={localType}
          onChange={(e) => setLocalType(e.target.value)}
          options={typeOptions}
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
