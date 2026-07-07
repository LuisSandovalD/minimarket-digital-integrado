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
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function RecentSales({ sales = [] }) {
  // ⚡ MEMORIZACIÓN: Evita recálculos de arrays pesados en renderizados frecuentes
  const stats = useMemo(() => {
    const previewSales = sales.slice(0, 5);
    const totalSales = sales.reduce(
      (acc, sale) => acc + Number(sale.total || 0),
      0,
    );
    const completedSales = sales.filter(
      (sale) => sale.status === "COMPLETED",
    ).length;
    const pendingSales = sales.filter(
      (sale) => sale.status === "PENDING",
    ).length;
    const cancelledSales = sales.filter(
      (sale) => sale.status === "CANCELLED",
    ).length;

    return {
      previewSales,
      totalSales,
      completedSales,
      pendingSales,
      cancelledSales,
    };
  }, [sales]);

  const getStatusBadge = (status) => {
    const badges = {
      COMPLETED: {
        bg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
        icon: <CheckCircle size={12} className="shrink-0" />,
        text: "Completada",
      },
      PENDING: {
        bg: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
        icon: <AlertCircle size={12} className="shrink-0" />,
        text: "Pendiente",
      },
      CANCELLED: {
        bg: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
        icon: <XCircle size={12} className="shrink-0" />,
        text: "Cancelada",
      },
    };

    const current = badges[status] || badges.CANCELLED;

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${current.bg}`}
      >
        {current.icon}
        {current.text}
      </span>
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/60 p-6 shadow-xl shadow-slate-200/5 backdrop-blur-xl transition-shadow duration-300 dark:border-slate-800/40 dark:bg-slate-900/60 dark:shadow-none">
      {/* 📋 HEADER DE LA SECCIÓN */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/10 dark:bg-emerald-500/20">
            <ShoppingCart
              size={18}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Ventas Recientes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Resumen rápido de las últimas transacciones en el sistema
            </p>
          </div>
        </div>
        <div>
          <span className="inline-block rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200/20 dark:bg-slate-800 dark:text-slate-300">
            {sales.length} registros
          </span>
        </div>
      </div>

      {/* 📊 GRID DE METRICAS (Acoplado perfectamente a las props de tu MetricCard nativo) */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShoppingCart}
          subtitle="Ventas"
          value={sales.length}
          description="Transacciones en el periodo"
          variant="default"
        />
        <MetricCard
          icon={Wallet}
          subtitle="Monto Recaudado"
          value={`S/ ${stats.totalSales.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Caja e ingresos brutos"
          variant="default"
        />
        <MetricCard
          icon={CheckCircle}
          subtitle="Completadas"
          value={stats.completedSales}
          description="Entregadas y cobradas"
          variant="default"
        />
        <MetricCard
          icon={Clock}
          subtitle="Pendientes"
          value={stats.pendingSales}
          description="Por confirmar pago"
          variant="default"
        />
      </div>

      {/* 🔍 CONTROL DE ESTADO VACÍO */}
      {sales.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-400 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/20">
          No se registran órdenes ni ventas en este intervalo de tiempo.
        </div>
      ) : (
        <>
          {/* 🖥️ TABLA DE DATOS RESPONSIVE */}
          <div className="overflow-x-auto rounded-xl border border-slate-100/80 dark:border-slate-800/50">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/40">
                  <th className="px-4 py-3">Código / Ticket</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Operador</th>
                  <th className="px-4 py-3">Fecha de Registro</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Monto Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {stats.previewSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                  >
                    <td className="px-4 py-3.5 font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {sale.saleNumber}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 font-medium">
                      {sale.customer?.name || "Cliente General"}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                      {sale.seller?.name || "Automatización POS"}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                      {new Date(sale.createdAt).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3.5">
                      {getStatusBadge(sale.status)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900 dark:text-white">
                      S/ {Number(sale.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🏁 CONTROL INFERIOR Y ENLACES ACCIONABLES */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/60 pt-4 dark:border-slate-800/40">
            <div className="flex items-center gap-4 text-xs">
              <p className="font-medium text-slate-500 dark:text-slate-400">
                Mostrando las últimas{" "}
                <span className="text-slate-900 font-bold dark:text-white">
                  {stats.previewSales.length}
                </span>{" "}
                ventas
              </p>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <p className="text-rose-500 font-medium">
                {stats.cancelledSales} transacciones rechazadas
              </p>
            </div>

            <Link
              to="/sales"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-emerald-600/10 transform-gpu active:scale-[0.98]"
            >
              Módulo Completo de Ventas
              <ArrowRight size={14} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
