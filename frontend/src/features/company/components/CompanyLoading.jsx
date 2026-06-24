// ============================================================================
// components/CompanyLoading.jsx
// SKELETON: Imita exactamente la estructura visual de la página de empresas
// ============================================================================

import { SkeletonHeader } from "@/components/skeletons";

export default function CompanyLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Esqueleto del Header (Sincronizado con CompanyHeader) */}
      <SkeletonHeader stats={0} showActions={true} />

      {/* 2. Esqueleto del Contenido (Copia exacta de la grilla de CompanyList) */}
      <div className="grid grid-cols-1 gap-6">
        {/* Simulamos la tarjeta 'CompanyCard' en estado de carga */}
        <div className="h-[200px] w-full rounded-2xl bg-slate-200 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/40 p-6 space-y-4">
          {/* Línea para el logo o inicial de la empresa */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-300 dark:bg-slate-700 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded-md w-3/4" />
              <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded-md w-1/2" />
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-2">
            {/* Líneas para el RUC, Teléfono o Dirección */}
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded-md w-full" />
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded-md w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
