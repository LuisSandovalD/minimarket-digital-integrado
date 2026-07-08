// ========================================
// components/skeletons/SkeletonStats.jsx
// ========================================

export default function SkeletonStats({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 flex flex-col space-y-3"
        >
          {/* Simulación del contenedor de icono */}
          <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />

          {/* Simulación del subtítulo / label */}
          <div className="h-4 w-20 rounded bg-slate-200/80 dark:bg-slate-800/80" />

          {/* Simulación del valor métrico principal */}
          <div className="h-8 w-28 rounded-lg bg-slate-200 dark:bg-slate-700" />

          {/* Simulación de la descripción o tendencia corta */}
          <div className="h-3 w-full max-w-[140px] rounded bg-slate-100 dark:bg-slate-800/50" />
        </div>
      ))}
    </div>
  );
}
