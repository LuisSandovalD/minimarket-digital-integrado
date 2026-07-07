import { MetricCard } from "@/components/card/";
import { AreaChart } from "@/components/data-display";
import {
  Calendar,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useMemo } from "react";

export default function SalesOverview({
  sales = [],
  totalSales = 0,
  totalOrders = 0,
}) {
  // ⚡ OPTIMIZACIÓN: Unificar todos los cálculos analíticos pesados en un solo hilo memorizado
  const analytics = useMemo(() => {
    // 1. Agrupación y mapeo para el gráfico
    const chartData = sales.reduce((acc, sale) => {
      const date = new Date(sale.createdAt).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
      });

      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.sales += Number(sale.total || 0);
        existing.orders += 1;
      } else {
        acc.push({
          date,
          sales: Number(sale.total || 0),
          orders: 1,
        });
      }
      return acc;
    }, []);

    // 2. Ticket Promedio
    const averageSale = totalOrders > 0 ? totalSales / totalOrders : 0;

    // 3. Buscar la última venta de forma eficiente (O(n) sin mutar ni re-ordenar el array original)
    let lastSale = null;
    let highestSale = 0;

    if (sales.length > 0) {
      lastSale = sales[0];
      for (let i = 0; i < sales.length; i++) {
        const currentTotal = Number(sales[i].total || 0);
        // Encontrar la más alta
        if (currentTotal > highestSale) {
          highestSale = currentTotal;
        }
        // Encontrar la más reciente
        if (new Date(sales[i].createdAt) > new Date(lastSale.createdAt)) {
          lastSale = sales[i];
        }
      }
    }

    // 4. Promedio diario
    const averageDailyIncome = totalSales / Math.max(chartData.length, 1);

    return {
      chartData,
      averageSale,
      lastSale,
      highestSale,
      averageDailyIncome,
    };
  }, [sales, totalSales, totalOrders]);

  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/60 p-6 shadow-xl shadow-slate-200/5 backdrop-blur-xl transition-shadow duration-300 dark:border-slate-800/40 dark:bg-slate-900/60 dark:shadow-none">
      {/* 📋 ENCABEZADO */}
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Resumen de Ventas
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Evolución de ingresos y comportamiento comercial según el período
          seleccionado.
        </p>
      </div>

      {/* 📊 GRID DE MÉTRICAS SUPERIOR (Acoplado a tus props nativas) */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShoppingCart}
          subtitle="Total Vendido"
          value={`S/ ${Number(totalSales).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Ingresos generados"
          variant="default"
        />

        <MetricCard
          icon={Receipt}
          subtitle="Órdenes"
          value={totalOrders}
          description="Ventas registradas"
          variant="default"
        />

        <MetricCard
          icon={TrendingUp}
          subtitle="Ticket Promedio"
          value={`S/ ${analytics.averageSale.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Promedio por venta"
          variant="default"
        />

        <MetricCard
          icon={Calendar}
          subtitle="Última Venta"
          value={
            analytics.lastSale
              ? new Date(analytics.lastSale.createdAt).toLocaleDateString(
                  "es-PE",
                )
              : "-"
          }
          description="Registro más reciente"
          variant="default"
        />
      </div>

      {/* 📉 PANEL GRÁFICO (Contenedor con bordes pulidos) */}
      <div className="rounded-2xl border border-slate-100 bg-white/40 p-4 dark:border-slate-800/40 dark:bg-slate-950/20">
        <AreaChart
          title="Ventas por Período"
          data={analytics.chartData}
          dataKey="sales"
          nameKey="date"
          className="h-[400px] w-full"
        />
      </div>

      {/* 📊 GRID DE MÉTRICAS INFERIOR */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard
          icon={Trophy}
          subtitle="Venta Más Alta"
          value={`S/ ${analytics.highestSale.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Mayor importe registrado"
          variant="default"
        />

        <MetricCard
          icon={Receipt}
          subtitle="Ventas Registradas"
          value={sales.length}
          description="Registros analizados"
          variant="default"
        />

        <MetricCard
          icon={TrendingUp}
          subtitle="Ingreso Promedio Diario"
          value={`S/ ${analytics.averageDailyIncome.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Promedio por día"
          variant="default"
        />
      </div>
    </div>
  );
}
