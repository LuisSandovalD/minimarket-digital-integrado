// ========================================
// features/dashboard/analytics/components/AnalyticsLoading.jsx
// ========================================
import { SkeletonCard, SkeletonChart, SkeletonHeader } from "@/components/skeletons";

export default function AnalyticsLoading() {
  return (
    <div className="mx-auto space-y-6 animate-pulse">
      {/* 1. CONTROL DE NAVEGACIÓN SUPERIOR (Simula el botón "Regresar") */}
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-40" />

      {/* 2. HEADER ANALÍTICO + 5 KPIs TRANSACCIONALES 
          Calibrado con stats={5} para calzar con la estructura financiera */}
      <SkeletonHeader stats={5} showActions />

      {/* 3. TENDENCIAS CENTRALES (Gráficos de Ingresos y Egresos) */}
      <div className="space-y-6">
        <SkeletonChart type="line" />
        <SkeletonChart type="line" />
      </div>

      {/* 4. KARDEX TRANSACCIONAL RECIENTE (Simula la tabla de transacciones inferior) */}
      <div className="bg-white rounded-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4 space-y-4">
        {/* Título de la sección de la tabla */}
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-56" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-80" />
        </div>
        <hr className="border-slate-100 dark:border-slate-800" />
        {/* Filas de la tabla transaccional simuladas */}
        <SkeletonCard rows={6} />
      </div>
    </div>
  );
}
