import { ModernButton } from "@/components/buttons";
import { Input, SearchInput, Select } from "@/components/forms";

import { Calendar, CheckCircle2, RefreshCw, Search, Store, Truck, User } from "lucide-react";

import { useState } from "react";

export default function PurchaseFilters({
  onSearch,
  onClear,
  loading,

  suppliers = [],
  buyers = [],
  branches = [],
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [supplierId, setSupplierId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [branchId, setBranchId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const statusOptions = [
    {
      value: "PENDING",
      label: "Pendiente",
    },
    {
      value: "COMPLETED",
      label: "Completada",
    },
    {
      value: "CANCELLED",
      label: "Cancelada",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      search: search.trim(),
      status,
      supplierId,
      buyerId,
      branchId,
      startDate,
      endDate,
    });
  };

  const handleClear = () => {
    setSearch("");
    setStatus("");
    setSupplierId("");
    setBuyerId("");
    setBranchId("");
    setStartDate("");
    setEndDate("");

    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SearchInput
          label="Buscar"
          placeholder="N° Compra o proveedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          label="Estado"
          placeholder="Todos"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusOptions}
          icon={CheckCircle2}
        />

        <Select
          label="Proveedor"
          placeholder="Todos"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          options={suppliers}
          icon={Truck}
        />

        <Select
          label="Sucursal"
          placeholder="Todas"
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
          options={branches}
          icon={Store}
        />

        <Select
          label="Comprador"
          placeholder="Todos"
          value={buyerId}
          onChange={(e) => setBuyerId(e.target.value)}
          options={buyers}
          icon={User}
        />

        <Input
          type="date"
          label="Desde"
          icon={Calendar}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input type="date" label="Hasta" icon={Calendar} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
