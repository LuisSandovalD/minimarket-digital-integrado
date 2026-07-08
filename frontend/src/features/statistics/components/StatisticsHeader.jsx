// ========================================
// features/dashboard/statistics/components/StatisticsHeader.jsx
// ========================================
import {
  BarChart3,
  Calendar,
  Package,
  RefreshCw,
  Truck,
  Users
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { PageHeader } from "@/components/data-display";

export default function StatisticsHeader({
  totalProducts = 0,
  totalCustomers = 0,
  suppliers = 0,
  totalLogs = 0,

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
  return (
    <div className="space-y-4">
      <PageHeader
        icon={BarChart3}
        badge="Estadísticas"
        title="Estadísticas y Rendimiento Operativo"
        description="Análisis de rotación del catálogo, participación de terceros y trazabilidad del personal."
        headerActions={
          <ModernButton
            icon={RefreshCw}
            text="Actualizar Métricas"
            onClick={onRefresh}
          />
        }
        stats={[
          {
            icon: Package,
            label: "Catálogo Activo",
            value: `${Number(totalProducts).toLocaleString("es-PE")} Items`,
          },
          {
            icon: Users,
            label: "Participación Clientes",
            value: Number(totalCustomers).toLocaleString("es-PE"),
          },
          {
            icon: Truck,
            label: "Cartera Proveedores",
            value: Number(suppliers).toLocaleString("es-PE"),
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
                  ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
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
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
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
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
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
