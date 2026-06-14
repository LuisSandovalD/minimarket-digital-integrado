import {
  AlertTriangle,
  Building2,
  Calendar,
  LayoutDashboard,
  Package,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { PageHeader } from "@/components/data-display";

export default function DashboardHeader({
  totalSales = 0,
  totalProducts = 0,
  totalCustomers = 0,
  totalAlerts = 0,
  totalPurchases = 0,
  salesCount = 0,
  purchasesCount = 0,
  branches = 0,
  suppliers = 0,

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
        icon={LayoutDashboard}
        badge="Dashboard"
        title="Panel de control"
        description="Visualiza indicadores, ventas, inventario, clientes y alertas en tiempo real."
        headerActions={
          <ModernButton
            icon={RefreshCw}
            text="Actualizar"
            onClick={onRefresh}
          />
        }
        stats={[
          {
            icon: TrendingUp,
            label: "Ventas Totales",
            value: `S/ ${Number(totalSales).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
          },

          {
            icon: ShoppingCart,
            label: "Compras Totales",
            value: `S/ ${Number(totalPurchases).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
          },

          {
            icon: Package,
            label: "Productos",
            value: Number(totalProducts).toLocaleString("es-PE"),
          },

          {
            icon: Users,
            label: "Clientes",
            value: Number(totalCustomers).toLocaleString("es-PE"),
          },

          {
            icon: Truck,
            label: "Proveedores",
            value: Number(suppliers).toLocaleString("es-PE"),
          },

          {
            icon: ShoppingCart,
            label: "Ventas Realizadas",
            value: Number(salesCount).toLocaleString("es-PE"),
          },

          {
            icon: Truck,
            label: "Compras Realizadas",
            value: Number(purchasesCount).toLocaleString("es-PE"),
          },

          {
            icon: AlertTriangle,
            label: "Alertas Activas",
            value: Number(totalAlerts).toLocaleString("es-PE"),
          },

          {
            icon: Building2,
            label: "Sucursales",
            value: Number(branches).toLocaleString("es-PE"),
          },
        ]}
      />

      {/* FILTROS */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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
              className={period === p.value ? "bg-blue-600 text-white" : ""}
              variant="outline"
            />
          ))}
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block mb-1 text-xs text-slate-500">
              Fecha inicio
            </label>
            <input
              type="date"
              value={draftStartDate}
              onChange={(e) => {
                setDraftStartDate(e.target.value);
                clearDateError();
              }}
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs text-slate-500">
              Fecha fin
            </label>
            <input
              type="date"
              value={draftEndDate}
              onChange={(e) => {
                setDraftEndDate(e.target.value);
                clearDateError();
              }}
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
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

        {dateError && <div className="text-sm text-rose-600">{dateError}</div>}
      </div>
    </div>
  );
}
