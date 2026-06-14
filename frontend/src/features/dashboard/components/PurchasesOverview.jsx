import { AreaChart } from "@/components/data-display";

import { MetricCard } from "@/components/card/";
import {
  Calendar,
  CreditCard,
  FileSearch,
  ShoppingBag,
  TrendingUp,
  Trophy,
} from "lucide-react";

export default function PurchasesOverview({
  purchases = [],
  totalPurchases = 0,
  totalOrders = 0,
}) {
  const chartData = purchases.reduce((acc, purchase) => {
    const date = new Date(purchase.createdAt).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
    });

    const existing = acc.find((item) => item.date === date);

    if (existing) {
      existing.sales += Number(purchase.total);
      existing.orders += 1;
    } else {
      acc.push({
        date,
        sales: Number(purchase.total),
        orders: 1,
      });
    }

    return acc;
  }, []);

  const averagePurchase = totalOrders > 0 ? totalPurchases / totalOrders : 0;

  const lastPurchase =
    purchases.length > 0
      ? purchases.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )[0]
      : null;

  const highestPurchase =
    purchases.length > 0
      ? Math.max(...purchases.map((p) => Number(p.total || 0)))
      : 0;

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Resumen de Compras
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Evolución de compras según el período seleccionado.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShoppingBag}
          label="Total Comprado"
          value={`S/ ${Number(totalPurchases).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Monto invertido en compras"
          variant="info"
        />

        <MetricCard
          icon={CreditCard}
          label="Órdenes"
          value={totalOrders}
          subtext="Compras registradas"
          variant="success"
        />

        <MetricCard
          icon={TrendingUp}
          label="Compra Promedio"
          value={`S/ ${averagePurchase.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Promedio por orden"
          variant="warning"
        />

        <MetricCard
          icon={Calendar}
          label="Última Compra"
          value={
            lastPurchase
              ? new Date(lastPurchase.createdAt).toLocaleDateString("es-PE")
              : "-"
          }
          subtext="Fecha más reciente"
          variant="default"
        />
      </div>

      {/* Gráfico */}
      <div>
        <AreaChart
          title="Compras por período"
          data={chartData}
          dataKey="sales"
          nameKey="date"
          className="h-[450px]"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard
          icon={Trophy}
          label="Compra Más Alta"
          value={`S/ ${highestPurchase.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Mayor importe registrado"
          variant="success"
        />

        <MetricCard
          icon={FileSearch}
          label="Registros Analizados"
          value={purchases.length}
          subtext="Compras procesadas en el período"
          variant="info"
        />
      </div>
    </div>
  );
}
