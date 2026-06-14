import { MetricCard } from "@/components/card";

import {
  AlertTriangle,
  ArrowRight,
  Package,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function LowStockProducts({ products = [] }) {
  const previewProducts = products.slice(0, 5);

  const criticalProducts = products.filter(
    (item) =>
      item.stock <= Math.max(1, Math.floor((item.product?.minStock || 1) / 2)),
  ).length;

  const missingUnits = products.reduce(
    (acc, item) =>
      acc +
      Math.max((item.product?.minStock || 0) - Number(item.stock || 0), 0),
    0,
  );

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
            <AlertTriangle size={22} className="text-amber-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Stock Bajo
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Productos que requieren reposición inmediata.
            </p>
          </div>
        </div>

        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
          {products.length} alertas
        </span>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard
          icon={Package}
          label="Productos"
          value={products.length}
          subtext="Con stock bajo"
          variant="danger"
        />

        <MetricCard
          icon={ShieldAlert}
          label="Críticos"
          value={criticalProducts}
          subtext="Requieren atención urgente"
          variant="warning"
        />

        <MetricCard
          icon={TrendingDown}
          label="Faltantes"
          value={missingUnits}
          subtext="Unidades por reponer"
          variant="info"
        />
      </div>

      {/* Lista */}
      {products.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="text-center">
            <Package size={32} className="mx-auto mb-3 text-slate-400" />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              No existen productos con stock bajo.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {previewProducts.map((item) => {
              const stock = Number(item.stock || 0);
              const minStock = Number(item.product?.minStock || 1);

              const percentage = Math.min((stock / minStock) * 100, 100);

              const isCritical = stock <= minStock / 2;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        {item.product?.name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        Stock mínimo: {minStock}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCritical && (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          Crítico
                        </span>
                      )}

                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        {stock}
                      </span>
                    </div>
                  </div>

                  {/* Barra */}
                  <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isCritical ? "bg-red-500" : "bg-amber-500"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Stock actual: {stock}</span>

                    <span>Faltan {Math.max(minStock - stock, 0)} unidades</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
            <Link
              to="/notifications"
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-medium text-white transition-all hover:bg-amber-600"
            >
              Ver todas las alertas
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
