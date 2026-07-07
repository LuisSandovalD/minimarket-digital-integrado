// ========================================
// features/dashboard/analytics/components/AnalyticsHeader.jsx
// ========================================
import {
  Calendar,
  DollarSign,
  LineChart,
  RefreshCw,
  Scale,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { PageHeader } from "@/components/data-display";

export default function AnalyticsHeader({
  totalSales = 0,
  totalPurchases = 0,
  salesCount = 0,
  purchasesCount = 0,

  period,
  setPeriod,

  draftStartDate,
  setDraftStartDate,

  draftEndDate,
  setDraftEndDate,

  dateError,
  clearDateError,
  onRefresh,
  onApplyCustomRange,
}) {
  // Cálculo local del Balance Neto Operativo (Ingresos - Egresos)
  const netBalance = Number(totalSales) - Number(totalPurchases);

  // Formateador de moneda para Soles Peruanos
  const formatCurrency = (amount) => {
    return `S/ ${Number(amount).toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-4">
      <PageHeader
        icon={LineChart}
        badge="Analítica"
        title="Analítica Comercial Avanzada"
        description="Auditoría de ingresos, egresos corporativos e historial del flujo de caja transaccional."
        headerActions={
          <ModernButton
            icon={RefreshCw}
            text="Actualizar Flujo"
            onClick={onRefresh}
          />
        }
        stats={[
          {
            icon: TrendingUp,
            label: "Ingresos Totales",
            value: formatCurrency(totalSales),
          },
          {
            icon: ShoppingCart,
            label: "Egresos Totales",
            value: formatCurrency(totalPurchases),
          },
          {
            icon: Scale,
            label: "Balance Neto",
            value: formatCurrency(netBalance),
            // Estilo dinámico si el balance es negativo o positivo
            className:
              netBalance >= 0
                ? "text-emerald-600 font-bold"
                : "text-rose-600 font-bold",
          },
          {
            icon: DollarSign,
            label: "Comprobantes Emitidos",
            value: Number(salesCount).toLocaleString("es-PE"),
          },
          {
            icon: DollarSign,
            label: "Órdenes de Compra",
            value: Number(purchasesCount).toLocaleString("es-PE"),
          },
        ]}
      />

      {/* FILTROS DE RANGO TEMPORAL */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Hoy", value: "TODAY" },
            { label: "7 días", value: "LAST_7_DAYS" },
            { label: "30 días", value: "LAST_30_DAYS" },
            { label: "Mes actual", value: "THIS_MONTH" },
            { label: "Año actual", value: "THIS_YEAR" },
          ].map((p) => (
            <ModernButton
              key={p.value}
              text={p.label}
              onClick={() => setPeriod(p.value)}
              className={
                period === p.value
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : ""
              }
              variant="outline"
            />
          ))}
        </div>

        {/* SELECTOR DE FECHAS PERSONALIZADO */}
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block mb-1 text-xs text-slate-500 font-medium">
              Fecha inicio
            </label>
            <input
              type="date"
              value={draftStartDate || ""}
              onChange={(e) => {
                setDraftStartDate(e.target.value);
                clearDateError();
              }}
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs text-slate-500 font-medium">
              Fecha fin
            </label>
            <input
              type="date"
              value={draftEndDate || ""}
              onChange={(e) => {
                setDraftEndDate(e.target.value);
                clearDateError();
              }}
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <ModernButton
            icon={Calendar}
            text="Aplicar"
            onClick={onApplyCustomRange}
            variant="outline"
            disabled={!draftStartDate || !draftEndDate}
          />
        </div>
      </div>

      {dateError && (
        <div className="text-sm font-semibold text-rose-600 animate-pulse">
          ⚠️ {dateError}
        </div>
      )}
    </div>
  );
}
