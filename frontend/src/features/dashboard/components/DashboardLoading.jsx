import {
  SkeletonCard,
  SkeletonChart,
  SkeletonHeader,
} from "@/components/skeletons";

export default function DashboardLoading() {
  return (
    <div className="max-w-[1800px] mx-auto p-6 space-y-8 animate-pulse">
      {/* ==========================================================
          HEADER + KPIs
      ========================================================== */}
      <SkeletonHeader stats={9} showActions />

      {/* ==========================================================
          VENTAS Y COMPRAS
      ========================================================== */}
      <SkeletonChart type="line" />
      <SkeletonChart type="line" />

      {/* ==========================================================
          TOP PRODUCTOS Y CLIENTES
      ========================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SkeletonChart type="bar" />
        <SkeletonChart type="bar" />
      </div>

      {/* ==========================================================
          VENTAS RECIENTES
      ========================================================== */}
      <SkeletonCard rows={8} />

      {/* ==========================================================
          ACTIVIDAD + STOCK BAJO
      ========================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SkeletonCard rows={8} />
        </div>

        <SkeletonCard rows={5} />
      </div>
    </div>
  );
}
