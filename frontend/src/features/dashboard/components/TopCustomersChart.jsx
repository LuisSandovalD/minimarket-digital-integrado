import { ArrowRight, Crown, ShoppingCart, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { MetricCard } from "@/components/card";
import { HorizontalBarChart } from "@/components/data-display";

export default function TopCustomersChart({ customers = [] }) {
  const chartData = customers
    .map((customer) => ({
      id: customer.id,
      name: customer.name || "Cliente General",
      total: customer.sales?.length || 0,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const totalPurchases = chartData.reduce(
    (acc, customer) => acc + customer.total,
    0,
  );

  const topCustomer = chartData[0];

  const topPercentage =
    totalPurchases > 0 && topCustomer
      ? ((topCustomer.total / totalPurchases) * 100).toFixed(1)
      : 0;

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/30">
          <Users size={20} className="text-cyan-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Top Clientes
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Clientes con mayor frecuencia de compra
          </p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-sm text-slate-500">
          No existen clientes registrados.
        </div>
      ) : (
        <>
          {/* Gráfico */}
          <HorizontalBarChart title="Clientes Frecuentes" data={chartData} />

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <MetricCard
              icon={ShoppingCart}
              label="Compras Registradas"
              value={totalPurchases}
              subtext="Operaciones realizadas"
              variant="info"
            />

            <MetricCard
              icon={Crown}
              label="Cliente Líder"
              value={topCustomer?.name || "Sin registros"}
              subtext={`${topPercentage}% de participación`}
              variant="warning"
            />
          </div>

          {/* Ranking */}
          <div className="mt-6 space-y-3">
            {chartData.map((customer, index) => {
              const percentage =
                totalPurchases > 0
                  ? ((customer.total / totalPurchases) * 100).toFixed(1)
                  : 0;

              return (
                <div
                  key={customer.id || customer.name}
                  className="flex items-center justify-between rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                      #{index + 1}
                    </span>

                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {customer.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {percentage}% de participación
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {customer.total} compras
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
            <Link
              to="/analytics/customers"
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition-all"
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
