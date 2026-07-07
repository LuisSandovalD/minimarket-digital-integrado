// ========================================
// components/BranchEmpty.jsx
// ========================================
import { MapPinOff } from "lucide-react";

export default function BranchEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-16 text-center dark:border-slate-800/80 dark:bg-slate-900/20">
      <div className="mb-4 rounded-xl bg-slate-100 p-3 text-slate-400 dark:bg-slate-800/60 dark:text-slate-500">
        <MapPinOff size={28} strokeWidth={1.5} />
      </div>

      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
        No hay sucursales encontradas
      </h3>

      <p className="mt-1 max-w-xs text-sm text-slate-400 dark:text-slate-500">
        Intenta cambiando los términos de búsqueda o los filtros seleccionados.
      </p>
    </div>
  );
}
