import { MetricCard } from "@/components/card";
import {
  AlertTriangle,
  ArrowRight,
  Package,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function LowStockProducts({ products = [] }) {
  // ⚡ OPTIMIZACIÓN: Memorizar y procesar los estados de inventario en un solo recorrido lineal
  const inventoryStats = useMemo(() => {
    const previewProducts = products.slice(0, 5);

    let criticalCount = 0;
    let totalMissingUnits = 0;

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      const stock = Number(item.stock || 0);
      const minStock = Number(item.product?.minStock || 1);

      // Evaluar si es stock crítico (menor o igual a la mitad del mínimo reglamentario)
      const criticalThreshold = Math.max(1, Math.floor(minStock / 2));
      if (stock <= criticalThreshold) {
        criticalCount++;
      }

      // Sumar unidades faltantes para recuperar el stock de seguridad
      totalMissingUnits += Math.max(minStock - stock, 0);
    }

    return {
      previewProducts,
      criticalCount,
      totalMissingUnits,
    };
  }, [products]);

  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/60 p-6 shadow-xl shadow-slate-200/5 backdrop-blur-xl transition-shadow duration-300 dark:border-slate-800/40 dark:bg-slate-900/60 dark:shadow-none">
      {/* 📋 ENCABEZADO */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/10 bg-amber-500/10 dark:bg-amber-500/20">
            <AlertTriangle
              size={18}
              className="text-amber-600 dark:text-amber-400"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Stock Bajo
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Productos e insumos que requieren reposición inmediata.
            </p>
          </div>
        </div>

        <span className="rounded-xl bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-600 border border-red-500/10 dark:bg-red-500/20 dark:text-red-400">
          {products.length} alertas
        </span>
      </div>

      {/* 📊 GRID DE MÉTRICAS (Sincronizado con tus props nativas) */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard
          icon={Package}
          subtitle="Productos"
          value={products.length}
          description="Con stock bajo el mínimo"
          variant="default"
        />

        <MetricCard
          icon={ShieldAlert}
          subtitle="Críticos"
          value={inventoryStats.criticalCount}
          description="Urgencia de compra máxima"
          variant="default"
        />

        <MetricCard
          icon={TrendingDown}
          subtitle="Faltantes"
          value={inventoryStats.totalMissingUnits}
          description="Unidades totales por reponer"
          variant="default"
        />
      </div>

      {/* 🔍 CONTROL DE ESTADO VACÍO */}
      {products.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
          <div className="text-center">
            <Package size={28} className="mx-auto mb-2 text-slate-400" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Inventario saludable. No existen alertas de stock.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* LISTA DE PRODUCTOS ALERTADOS */}
          <div className="space-y-3">
            {inventoryStats.previewProducts.map((item) => {
              const stock = Number(item.stock || 0);
              const minStock = Number(item.product?.minStock || 1);
              const percentage = Math.min((stock / minStock) * 100, 100);
              const isCritical = stock <= minStock / 2;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100/80 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800/60 dark:bg-slate-950/20 dark:hover:bg-slate-950/40"
                >
                  <div className="mb-2.5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.product?.name}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                        Límite mínimo requerido: {minStock} unidades
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCritical && (
                        <span className="rounded-lg bg-red-500/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-red-600 border border-red-500/10 dark:bg-red-500/20 dark:text-red-400">
                          Crítico
                        </span>
                      )}
                      <span
                        className={`rounded-lg px-2.5 py-0.5 text-xs font-bold ${
                          isCritical
                            ? "bg-red-500/10 text-red-600 border border-red-500/10 dark:bg-red-500/20 dark:text-red-400"
                            : "bg-amber-500/10 text-amber-600 border border-amber-500/10 dark:bg-amber-500/20 dark:text-amber-400"
                        }`}
                      >
                        {stock} uds
                      </span>
                    </div>
                  </div>

                  {/* BARRA DE PROGRESO */}
                  <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical ? "bg-red-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    <span>Disponible: {stock}</span>
                    <span
                      className={
                        isCritical ? "text-red-500/90 font-semibold" : ""
                      }
                    >
                      Faltan {Math.max(minStock - stock, 0)} unidades
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🏁 PIE DE PANEL Y ENLACES */}
          <div className="mt-5 border-t border-slate-200/60 pt-4 dark:border-slate-800/40">
            <Link
              to="/notifications"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-amber-600 hover:shadow-amber-500/10 transform-gpu active:scale-[0.99]"
            >
              Gestionar Alertas y Reposición
              <ArrowRight size={14} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
