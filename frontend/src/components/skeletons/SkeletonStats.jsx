// ========================================
// components/skeletons/SkeletonStats.jsx
// ========================================

export default function SkeletonStats({ count = 4 }) {
  // Mapeamos dinámicamente las columnas en pantallas grandes según la cantidad de tarjetas
  // para evitar que queden espacios vacíos si el count es menor a 4.
  const gridColsClass =
    {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
    }[count] || "lg:grid-cols-4"; // Por defecto usa 4 columnas

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6 w-full`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 flex flex-col space-y-3 w-full"
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
