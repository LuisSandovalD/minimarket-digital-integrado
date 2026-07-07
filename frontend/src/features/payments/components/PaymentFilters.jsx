// ========================================
// features/payments/components/PaymentFilters.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { Input, SearchInput, Select } from "@/components/forms";

import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  HelpCircle,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function PaymentFilters({
  onSearch,
  onClear,
  loading,
  globalFilters,
}) {
  const [localSearch, setLocalSearch] = useState("");
  const [localStatus, setLocalStatus] = useState("");
  const [localType, setLocalType] = useState("");
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");

  // Opciones basadas en el Enum 'PaymentStatus' de la Base de Datos
  const statusOptions = [
    { value: "PENDING", label: "Pendiente" },
    { value: "COMPLETED", label: "Completado" },
    { value: "FAILED", label: "Fallido" },
  ];

  // Filtro por flujo (Ventas = Ingresos, Compras = Egresos)
  const typeOptions = [
    { value: "SALE", label: "Ingresos (Ventas)" },
    { value: "PURCHASE", label: "Egresos (Compras)" },
  ];

  // Sincronizar filtros externos/globales (Crucial si se limpia desde fuera)
  useEffect(() => {
    if (globalFilters) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSearch(globalFilters.search || "");
      setLocalStatus(globalFilters.status || "");
      setLocalType(globalFilters.type || "");
      setLocalStartDate(globalFilters.startDate || "");
      setLocalEndDate(globalFilters.endDate || "");
    }
  }, [globalFilters]);

  const getStatusIcon = () => {
    switch (localStatus) {
      case "COMPLETED":
        return CheckCircle2;
      case "PENDING":
        return Clock;
      case "FAILED":
        return XCircle;
      default:
        return HelpCircle;
    }
  };

  const getTypeIcon = () => {
    switch (localType) {
      case "SALE":
        return TrendingUp;
      case "PURCHASE":
        return TrendingDown;
      default:
        return CreditCard;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviamos los filtros limpios hacia el hook de estados globales
    onSearch({
      search: localSearch.trim(),
      status: localStatus,
      type: localType,
      startDate: localStartDate,
      endDate: localEndDate,
    });
  };

  const handleClear = (e) => {
    e.preventDefault(); // Evita cualquier comportamiento extraño de propagación de eventos

    setLocalSearch("");
    setLocalStatus("");
    setLocalType("");
    setLocalStartDate("");
    setLocalEndDate("");

    // Llama a la función del hook principal que resetea la API
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      {/* PRIMERA FILA: Buscador, Estado y Tipo de Flujo */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SearchInput
          label="Buscar Pago"
          placeholder="Referencia, notas, ID o N° de folio..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        <Select
          label="Estado"
          placeholder="Todos los estados"
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          options={statusOptions}
          icon={getStatusIcon()}
        />

        <Select
          label="Tipo de Flujo"
          placeholder="Todos los flujos"
          value={localType}
          onChange={(e) => setLocalType(e.target.value)}
          options={typeOptions}
          icon={getTypeIcon()}
        />
      </div>

      {/* SEGUNDA FILA: Rango de Fechas */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="date"
          label="Fecha Inicial"
          icon={Calendar}
          value={localStartDate}
          onChange={(e) => setLocalStartDate(e.target.value)}
        />

        <Input
          type="date"
          label="Fecha Final"
          icon={Calendar}
          value={localEndDate}
          onChange={(e) => setLocalEndDate(e.target.value)}
        />
      </div>

      {/* BOTONES DE ACCIÓN */}
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
