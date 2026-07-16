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
      <SkeletonStats count={4} />
      <SkeletonStats count={2} />
      <SkeletonStats count={2} />
      <SkeletonStats count={3} />
    </div>
  );
}
