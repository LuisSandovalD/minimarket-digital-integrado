import { MetricCard } from "@/components/card/";
import { AreaChart } from "@/components/data-display";
import {
  Calendar,
  CreditCard,
  FileSearch,
  ShoppingBag,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useMemo } from "react";

export default function PurchasesOverview({
  purchases = [],
  totalPurchases = 0,
  totalOrders = 0,
}) {
  // ⚡ OPTIMIZACIÓN: Cálculos y agrupaciones agrupados en un único contenedor memorizado
  const analytics = useMemo(() => {
    // 1. Agrupación cronológica para el gráfico de área
    const chartData = purchases.reduce((acc, purchase) => {
      const date = new Date(purchase.createdAt).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
      });

      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.sales += Number(purchase.total || 0);
        existing.orders += 1;
      } else {
        acc.push({
          date,
          sales: Number(purchase.total || 0),
          orders: 1,
        });
      }
      return acc;
    }, []);

    // 2. Cálculo del ticket promedio de inversión
    const averagePurchase = totalOrders > 0 ? totalPurchases / totalOrders : 0;

    // 3. Extracción de métricas extremas en un solo recorrido lineal O(n) sin mutar props
    let lastPurchase = null;
    let highestPurchase = 0;

    if (purchases.length > 0) {
      lastPurchase = purchases[0];
      for (let i = 0; i < purchases.length; i++) {
        const currentTotal = Number(purchases[i].total || 0);

        // Determinar la compra de mayor valor
        if (currentTotal > highestPurchase) {
          highestPurchase = currentTotal;
        }
        // Determinar la orden más reciente
        if (
          new Date(purchases[i].createdAt) > new Date(lastPurchase.createdAt)
        ) {
          lastPurchase = purchases[i];
        }
      }
    }

    return {
      chartData,
      averagePurchase,
      lastPurchase,
      highestPurchase,
    };
  }, [purchases, totalPurchases, totalOrders]);

  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/60 p-6 shadow-xl shadow-slate-200/5 backdrop-blur-xl transition-shadow duration-300 dark:border-slate-800/40 dark:bg-slate-900/60 dark:shadow-none">
      {/* 📋 ENCABEZADO */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Resumen de Compras
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Evolución de egresos, adquisiciones y reabastecimiento según el
            período seleccionado.
          </p>
        </div>
      </div>

      {/* 📊 GRID DE MÉTRICAS SUPERIOR */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShoppingBag}
          subtitle="Total Comprado"
          value={`S/ ${Number(totalPurchases).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Monto invertido en mercadería"
          variant="default"
        />

        <MetricCard
          icon={CreditCard}
          subtitle="Órdenes"
          value={totalOrders}
          description="Compras registradas"
          variant="default"
        />

        <MetricCard
          icon={TrendingUp}
          subtitle="Compra Promedio"
          value={`S/ ${analytics.averagePurchase.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Promedio por orden de compra"
          variant="default"
        />

        <MetricCard
          icon={Calendar}
          subtitle="Última Compra"
          value={
            analytics.lastPurchase
              ? new Date(analytics.lastPurchase.createdAt).toLocaleDateString(
                  "es-PE",
                )
              : "-"
          }
          description="Fecha del registro más reciente"
          variant="default"
        />
      </div>

      {/* 📉 PANEL GRÁFICO CON BORDES INTEGRADOS */}
      <AreaChart
        title="Compras por período"
        data={analytics.chartData}
        dataKey="sales"
        nameKey="date"
        className="h-[400px] w-full"
      />

      {/* 📊 GRID DE MÉTRICAS INFERIOR */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard
          icon={Trophy}
          subtitle="Compra Más Alta"
          value={`S/ ${analytics.highestPurchase.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Mayor importe de inversión registrado"
          variant="default"
        />

        <MetricCard
          icon={FileSearch}
          subtitle="Registros Analizados"
          value={purchases.length}
          description="Total de facturas y boletas procesadas"
          variant="default"
        />
      </div>
    </div>
  );
}
