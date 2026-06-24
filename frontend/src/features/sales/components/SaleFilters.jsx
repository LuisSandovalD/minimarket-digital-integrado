// ========================================
// features/sales/components/SaleFilters.jsx
// ========================================
import { ModernButton } from "@/components/buttons";
import { SearchInput, Select } from "@/components/forms/";
import {
  AlertCircle,
  Archive,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  FileEdit,
  FileText,
  HelpCircle,
  Layers,
  Receipt,
  RefreshCw,
  Search,
  Ticket,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function SaleFilters({ onSearch, onClear, loading }) {
  // Estados locales temporales (Borrador de filtros)
  const [localSearch, setLocalSearch] = useState("");
  const [localStatus, setLocalStatus] = useState("");
  const [localBilling, setLocalBilling] = useState("");

  // Estructura de opciones sincronizada al 100% con el enum SaleStatus
  const statusOptions = [
    { value: "DRAFT", label: "Borrador" },
    { value: "PENDING", label: "Pendiente" },
    { value: "COMPLETED", label: "Completado" },
    { value: "CANCELLED", label: "Cancelado" },
    { value: "RETURNED", label: "Devuelto" },
    { value: "ARCHIVED", label: "Archivado" },
    { value: "CREDIT_PENDING", label: "Crédito Pendiente" },
  ];

  const billingOptions = [
    { value: "INVOICE", label: "Factura Electrónica" },
    { value: "BOLETA", label: "Boleta de Venta" },
    { value: "TICKET", label: "Ticket Interno POS" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envía strings limpios o undefined para evitar ruido en las queries del backend
    onSearch({
      search: localSearch.trim() || undefined,
      status: localStatus || undefined,
      billingType: localBilling || undefined,
    });
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalStatus("");
    setLocalBilling("");
    onClear();
  };

  // Determinar dinámicamente qué icono secundario mostrar según SaleStatus
  const getStatusIcon = () => {
    switch (localStatus) {
      case "DRAFT":
        return FileEdit;
      case "PENDING":
        return Clock;
      case "COMPLETED":
        return CheckCircle2;
      case "CANCELLED":
        return XCircle;
      case "RETURNED":
        return ArrowLeftRight;
      case "ARCHIVED":
        return Archive;
      case "CREDIT_PENDING":
        return AlertCircle;
      default:
        return HelpCircle; // Icono por defecto neutral cuando está en "Todos"
    }
  };

  // Determinar dinámicamente qué icono secundario mostrar al seleccionar un comprobante
  const getBillingIcon = () => {
    switch (localBilling) {
      case "INVOICE":
        return FileText;
      case "BOLETA":
        return Ticket;
      case "TICKET":
        return Layers;
      default:
        return Receipt;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-4
        bg-slate-50
        dark:bg-slate-900/40
        p-4
        rounded-xl
        border
        border-slate-100
        dark:border-slate-800/60
        w-full
        lg:flex-row
        lg:items-end
      "
    >
      {/* 1. BÚSQUEDA GLOBAL */}
      <div className="flex-1">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mb-2">
          Buscar Transacción
        </label>
        <SearchInput
          placeholder="Buscar por cliente, N° de venta o documento..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      {/* 2. FILTRO: ESTADO DE LA VENTA (SaleStatus) */}
      <div className="w-full lg:w-64">
        <Select
          label="Estado de Venta"
          placeholder="Todos los estados"
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          options={statusOptions}
          icon={getStatusIcon()}
        />
      </div>

      {/* 3. FILTRO: TIPO DE COMPROBANTE */}
      <div className="w-full lg:w-64">
        <Select
          label="Tipo de Comprobante"
          placeholder="Todos los tipos"
          value={localBilling}
          onChange={(e) => setLocalBilling(e.target.value)}
          options={billingOptions}
          icon={getBillingIcon()}
        />
      </div>

      {/* 4. BOTONES DE ACCIÓN */}
      <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
        <ModernButton
          type="button"
          disabled={loading}
          icon={RefreshCw}
          text="Limpiar"
          onClick={handleClear}
          variant="outline"
          className="flex-1 lg:flex-none"
        />

        <ModernButton
          type="submit"
          disabled={loading}
          icon={Search}
          text={loading ? "Buscando..." : "Buscar"}
          variant="primary"
          className="flex-1 lg:flex-none"
        />
      </div>
    </form>
  );
}
