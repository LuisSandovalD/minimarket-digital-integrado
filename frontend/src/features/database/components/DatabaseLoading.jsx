// ========================================
// features/database/pages/DatabaseLoading.jsx
// ========================================

import { SkeletonHeader, SkeletonStats } from "@/components/skeletons";

export default function DatabaseLoading() {
  return (
    <div className="w-full space-y-6 bg-transparent">
      {/* 1. HEADER DEL MÓDULO */}
      <SkeletonHeader stats={3} showActions={true} />

      {/* 2. PANEL DE MÉTRICAS PRINCIPALES (Bases de datos activas, uso de CPU, RAM, Almacenamiento) */}
      <div className="space-y-3">
        <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <SkeletonStats count={4} />
      </div>

      {/* 3. SECCIÓN INTERMEDIA: GRÁFICAS O SECCIONES SECUNDARIAS (Rendimiento, Logs de Conexiones) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <SkeletonStats count={4} />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <SkeletonStats count={4} />
        </div>
      </div>

      {/* 4. SECCIÓN INFERIOR: DETALLES DE TABLAS / BACKUPS RECIENTES */}
      <div className="space-y-3">
        <div className="h-4 w-44 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <SkeletonStats count={4} />
      </div>
    </div>
  );
}
