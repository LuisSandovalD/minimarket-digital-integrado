// features/dashboard/components/DashboardLoading.jsx
import {
  SkeletonCard,
  SkeletonChart,
  SkeletonHeader,
  SkeletonStats,
} from "@/components/skeletons";

export default function DashboardLoading() {
  return (
    <div className="max-w-[1800px] mx-auto p-6 space-y-8 animate-pulse">
      <SkeletonHeader stats={9} showActions />

      {/* ==========================================================
          2. 🚀 SKELETONS PARA LOS ACCESOS DIRECTOS (NUEVO)
         ========================================================== */}
      <SkeletonStats />
      {/* ==========================================================
          3. TENDENCIAS CENTRALES (Flujos transaccionales)
         ========================================================== */}
      <div className="space-y-6">
        <SkeletonChart type="line" />
        <SkeletonChart type="line" />
      </div>

      {/* ==========================================================
          4. BAJO STOCK / ALERTAS OPERATIVAS (Parte inferior fija)
         ========================================================== */}
      <div className="border-t border-slate-100 dark:border-slate-800/50 pt-6">
        <SkeletonCard rows={5} />
      </div>
    </div>
  );
}
