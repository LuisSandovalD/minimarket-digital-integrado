// ========================================
// components/skeletons/SkeletonSearch.jsx
// ========================================

export default function SkeletonSearch() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      {/* Grid de filtros */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />
          </div>
        ))}
      </div>

      {/* Botones */}
      <div className="mt-5 flex justify-end gap-2">
        <div className="h-11 w-28 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />
        <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />
      </div>
    </div>
  );
}
