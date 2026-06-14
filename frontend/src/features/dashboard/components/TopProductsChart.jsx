import { MetricCard } from "@/components/card";
import { ArrowRight, Package, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

import { BarChart } from "@/components/data-display";

export default function TopProductsChart({ products = [] }) {
  const chartData = products
    .map((product) => ({
      id: product.productId,
      name: product.productName || "Producto desconocido",
      quantity: Number(product.quantity) || 0,
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const totalSold = chartData.reduce((acc, item) => acc + item.quantity, 0);

  const topProduct = chartData[0];

  const topPercentage =
    totalSold > 0 && topProduct
      ? ((topProduct.quantity / totalSold) * 100).toFixed(1)
      : 0;

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
          <Package size={20} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Top Productos
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Productos con mayor volumen de ventas
          </p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-sm text-slate-500 ">
          No existen ventas registradas.
        </div>
      ) : (
        <>
          {/* Gráfico */}
          <BarChart
            title="Productos más vendidos"
            data={chartData}
            dataKey="quantity"
            nameKey="name"
            className="h-128"
          />

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <MetricCard
              icon={Package}
              label="Total Vendido"
              value={totalSold}
              subtext="Unidades comercializadas"
              variant="info"
            />

            <MetricCard
              icon={Trophy}
              label="Producto Líder"
              value={topProduct?.name || "Sin registros"}
              subtext={`${topPercentage}% del total vendido`}
              variant="success"
            />
          </div>

          {/* Ranking */}
          <div className="mt-6 space-y-3">
            {chartData.map((product, index) => {
              const percentage =
                totalSold > 0
                  ? ((product.quantity / totalSold) * 100).toFixed(1)
                  : 0;

              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-bold text-blue-700 dark:text-blue-300">
                      #{index + 1}
                    </span>

                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {product.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {percentage}% de participación
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {product.quantity} und.
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
            <Link
              to="/analytics/products"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-all"
            >
              Ver análisis completo
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
