import { MetricCard } from "@/components/card";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  ShoppingCart,
  Wallet,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentSales({ sales = [] }) {
  const previewSales = sales.slice(0, 5);

  const totalSales = sales.reduce(
    (acc, sale) => acc + Number(sale.total || 0),
    0,
  );

  const completedSales = sales.filter(
    (sale) => sale.status === "COMPLETED",
  ).length;

  const pendingSales = sales.filter((sale) => sale.status === "PENDING").length;

  const cancelledSales = sales.filter(
    (sale) => sale.status === "CANCELLED",
  ).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            <CheckCircle size={12} />
            Completada
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            <AlertCircle size={12} />
            Pendiente
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
            <XCircle size={12} />
            Cancelada
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
            <ShoppingCart size={20} className="text-emerald-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Ventas Recientes
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Resumen rápido de las últimas ventas registradas
            </p>
          </div>
        </div>

        <span className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm font-medium">
          {sales.length} ventas
        </span>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShoppingCart}
          label="Ventas"
          value={sales.length}
          subtext="Transacciones registradas"
          variant="info"
        />

        <MetricCard
          icon={Wallet}
          label="Monto Total"
          value={`S/ ${totalSales.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Ingresos generados"
          variant="success"
        />

        <MetricCard
          icon={CheckCircle}
          label="Completadas"
          value={completedSales}
          subtext="Ventas finalizadas"
          variant="success"
        />

        <MetricCard
          icon={Clock}
          label="Pendientes"
          value={pendingSales}
          subtext="Esperando procesamiento"
          variant="warning"
        />
      </div>

      {/* Sin datos */}
      {sales.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-sm text-slate-500">
          No existen ventas registradas.
        </div>
      ) : (
        <>
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Venta
                  </th>

                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Cliente
                  </th>

                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Vendedor
                  </th>

                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fecha
                  </th>

                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Estado
                  </th>

                  <th className="py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {previewSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-slate-100 dark:border-slate-800"
                  >
                    <td className="py-4 font-medium text-slate-800 dark:text-white">
                      {sale.saleNumber}
                    </td>

                    <td className="py-4 text-slate-600 dark:text-slate-300">
                      {sale.customer?.name || "Cliente General"}
                    </td>

                    <td className="py-4 text-slate-600 dark:text-slate-300">
                      {sale.seller?.name || "Sistema"}
                    </td>

                    <td className="py-4 text-slate-600 dark:text-slate-300">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4">{getStatusBadge(sale.status)}</td>

                    <td className="py-4 text-right font-semibold text-emerald-500">
                      S/ {Number(sale.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
            <div>
              <p className="text-sm text-slate-500">
                Mostrando las últimas {previewSales.length} ventas
              </p>

              <p className="text-xs text-slate-400">
                {cancelledSales} ventas canceladas
              </p>
            </div>

            <Link
              to="/sales"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-all"
            >
              Ver todas las ventas
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
