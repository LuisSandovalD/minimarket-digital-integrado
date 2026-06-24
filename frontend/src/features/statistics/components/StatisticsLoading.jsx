// ========================================
// features/dashboard/components/DashboardLoading.jsx
// ========================================
import {
    SkeletonCard,
    SkeletonChart,
    SkeletonHeader,
} from "@/components/skeletons";

export default function DashboardLoading() {
  return (
    <div className="max-w-[1800px] mx-auto p-6 space-y-8 animate-pulse">
      {/* 1. HEADER + KPIs GLOBALES (Simula los 9 mini-indicadores perfectamente) */}
      <SkeletonHeader stats={9} showActions />

      {/* 2. 🚀 ACCESOS DIRECTOS PREMIUM (Simulación exacta de los 3 botones interactivos) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50 h-[86px]"
          >
            <div className="flex items-center gap-4 w-full">
              {/* Icono animado */}
              <div className="w-11 h-11 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0" />
              {/* Título y Subtítulo */}
              <div className="space-y-2 w-3/4">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
              </div>
            </div>
            {/* Flecha indicadora derecha */}
            <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0 hidden sm:block" />
          </div>
        ))}
      </div>

      {/* 3. TENDENCIAS CENTRALES (SalesOverview y PurchasesOverview) */}
      <div className="space-y-6">
        <SkeletonChart type="line" />
        <SkeletonChart type="line" />
      </div>

      {/* 4. BAJO STOCK / ALERTAS OPERATIVAS (Tabla inferior fija) */}
      <div className="border-t border-slate-100 dark:border-slate-800/50 pt-6">
        <div className="space-y-3">
          {/* Título simulado de la sección de alertas */}
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-48 mb-4" />
          <SkeletonCard rows={5} />
        </div>
      </div>
    </div>
  );
}
