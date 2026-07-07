// ========================================
// features/inventory/components/InventoryFilters.jsx
// ========================================

import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { Input, SearchInput, Select } from "@/components/forms";

import {
  AlertTriangle,
  Boxes,
  Package,
  RefreshCw,
  Search,
  Store,
} from "lucide-react";

export default function InventoryFilters({
  onSearch,
  onClear,
  loading,
  branches = [],
  categories = [],
  globalFilters, // Sincronización con el hook principal
}) {
  const [localSearch, setLocalSearch] = useState("");
  const [localBranch, setLocalBranch] = useState("");
  const [localCategory, setLocalCategory] = useState("");
  const [localStockStatus, setLocalStockStatus] = useState("");
  const [localMinStock, setLocalMinStock] = useState(5);

  const stockOptions = [
    { value: "available", label: "Disponible" },
    { value: "low", label: "Stock Bajo" },
    { value: "out", label: "Agotado" },
  ];

  // Extraemos los datos dependiendo de si vienen planos o estructurados (.data)
  const branchesList = Array.isArray(branches) ? branches : branches.data || [];
  const categoriesList = Array.isArray(categories)
    ? categories
    : categories.data || [];

  const branchOptions = branchesList.map((branch) => ({
    value: String(branch.id),
    label: branch.name,
  }));

  const categoryOptions = categoriesList.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  // Sincronizar el formulario visual cuando cambien los filtros desde fuera
  useEffect(() => {
    if (globalFilters) {
      setLocalSearch(globalFilters.search || "");
      setLocalBranch(globalFilters.branchId || "");
      setLocalCategory(globalFilters.categoryId || "");
      setLocalStockStatus(globalFilters.stockStatus || "");
      setLocalMinStock(globalFilters.minStock ?? 5);
    }
  }, [globalFilters]);

  const getStockIcon = () => {
    switch (localStockStatus) {
      case "available":
        return Package;
      case "low":
        return AlertTriangle;
      case "out":
        return Boxes;
      default:
        return Package;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      search: localSearch.trim(),
      branchId: localBranch,
      categoryId: localCategory,
      stockStatus: localStockStatus,
      minStock: Number(localMinStock) || undefined,
    });
  };

  const handleClear = (e) => {
    e.preventDefault();

    setLocalSearch("");
    setLocalBranch("");
    setLocalCategory("");
    setLocalStockStatus("");
    setLocalMinStock(5);

    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SearchInput
          label="Buscar Producto"
          placeholder="Nombre, SKU o Código de Barras..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        <Select
          label="Sucursal"
          placeholder="Todas las sucursales"
          icon={Store}
          value={localBranch}
          onChange={(e) => setLocalBranch(e.target.value)}
          options={branchOptions}
        />

        <Select
          label="Categoría"
          placeholder="Todas las categorías"
          icon={Boxes}
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
          options={categoryOptions}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select
          label="Estado del Stock"
          placeholder="Todos"
          icon={getStockIcon()}
          value={localStockStatus}
          onChange={(e) => setLocalStockStatus(e.target.value)}
          options={stockOptions}
        />

        <Input
          type="number"
          label="Stock Mínimo"
          icon={AlertTriangle}
          value={localMinStock}
          min={1}
          onChange={(e) => setLocalMinStock(e.target.value)}
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
