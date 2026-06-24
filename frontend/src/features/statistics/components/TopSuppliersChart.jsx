import { MetricCard } from "@/components/card";
import { ArrowRight, Truck, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopSuppliersChart({ suppliers = [] }) {
  const topSuppliers = suppliers.slice(0, 5);

  const totalPurchased = suppliers.reduce(
    (acc, supplier) => acc + Number(supplier.totalPurchased || 0),
    0,
  );

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
          <Truck size={20} className="text-indigo-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Top Proveedores
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Proveedores con mayor volumen de compras
          </p>
        </div>
      </div>

      {topSuppliers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-sm text-slate-500">
          No existen compras registradas.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Ranking
                  </th>

                  <th className="py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Proveedor
                  </th>

                  <th className="py-3 text-center text-xs font-semibold uppercase text-slate-500">
                    Compras
                  </th>

                  <th className="py-3 text-right text-xs font-semibold uppercase text-slate-500">
                    Total
                  </th>

                  <th className="py-3 text-right text-xs font-semibold uppercase text-slate-500">
                    %
                  </th>
                </tr>
              </thead>

              <tbody>
                {topSuppliers.map((supplier, index) => {
                  const percentage =
                    totalPurchased > 0
                      ? (
                          (supplier.totalPurchased / totalPurchased) *
                          100
                        ).toFixed(1)
                      : 0;

                  return (
                    <tr
                      key={supplier.supplierId}
                      className="border-b border-slate-100 dark:border-slate-800"
                    >
                      <td className="py-4">
                        <span className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                          #{index + 1}
                        </span>
                      </td>

                      <td className="py-4 font-medium text-slate-800 dark:text-white">
                        {supplier.supplierName}
                      </td>

                      <td className="py-4 text-center text-slate-600 dark:text-slate-300">
                        {supplier.purchasesCount}
                      </td>

                      <td className="py-4 text-right font-semibold text-indigo-600 dark:text-indigo-400">
                        S/ {Number(supplier.totalPurchased).toFixed(2)}
                      </td>

                      <td className="py-4 text-right text-slate-500">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <MetricCard
              icon={Wallet}
              label="Total Comprado"
              value={`S/ ${totalPurchased.toLocaleString("es-PE", {
                minimumFractionDigits: 2,
              })}`}
              subtext="Inversión total en compras"
              variant="info"
            />

            <MetricCard
              icon={Truck}
              label="Proveedores Analizados"
              value={suppliers.length}
              subtext="Proveedores con movimientos"
              variant="success"
            />
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
            <Link
              to="/analytics/suppliers"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-medium text-white transition-all"
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
