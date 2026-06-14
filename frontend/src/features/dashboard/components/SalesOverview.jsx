import { MetricCard } from "@/components/card/";
import { AreaChart } from "@/components/data-display";
import {
  Calendar,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Trophy,
} from "lucide-react";

export default function SalesOverview({
  sales = [],
  totalSales = 0,
  totalOrders = 0,
}) {
  const chartData = sales.reduce((acc, sale) => {
    const date = new Date(sale.createdAt).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
    });

    const existing = acc.find((item) => item.date === date);

    if (existing) {
      existing.sales += Number(sale.total);
      existing.orders += 1;
    } else {
      acc.push({
        date,
        sales: Number(sale.total),
        orders: 1,
      });
    }

    return acc;
  }, []);

  const averageSale = totalOrders > 0 ? totalSales / totalOrders : 0;

  const lastSale =
    sales.length > 0
      ? [...sales].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )[0]
      : null;

  const highestSale =
    sales.length > 0
      ? Math.max(...sales.map((sale) => Number(sale.total || 0)))
      : 0;

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Resumen de Ventas
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Evolución de ingresos y comportamiento comercial según el período
          seleccionado.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShoppingCart}
          label="Total Vendido"
          value={`S/ ${Number(totalSales).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Ingresos generados"
          variant="success"
        />

        <MetricCard
          icon={Receipt}
          label="Órdenes"
          value={totalOrders}
          subtext="Ventas registradas"
          variant="info"
        />

        <MetricCard
          icon={TrendingUp}
          label="Ticket Promedio"
          value={`S/ ${averageSale.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Promedio por venta"
          variant="warning"
        />

        <MetricCard
          icon={Calendar}
          label="Última Venta"
          value={
            lastSale
              ? new Date(lastSale.createdAt).toLocaleDateString("es-PE")
              : "-"
          }
          subtext="Registro más reciente"
          variant="default"
        />
      </div>

      {/* Gráfico */}
      <AreaChart
        title="Ventas por Período"
        data={chartData}
        dataKey="sales"
        nameKey="date"
        className="h-[450px]"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard
          icon={Trophy}
          label="Venta Más Alta"
          value={`S/ ${highestSale.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Mayor importe registrado"
          variant="success"
        />

        <MetricCard
          icon={Receipt}
          label="Ventas Registradas"
          value={sales.length}
          subtext="Registros analizados"
          variant="info"
        />

        <MetricCard
          icon={TrendingUp}
          label="Ingreso Promedio Diario"
          value={`S/ ${(
            totalSales / Math.max(chartData.length, 1)
          ).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`}
          subtext="Promedio por día"
          variant="warning"
        />
      </div>
    </div>
  );
}
