// ============================================================================
// features/branch/components/BranchLoading.jsx
// SKELETON: Simetría exacta para la vista de sucursales (Stats + Grid de Cards)
// ============================================================================

import { SkeletonHeader, SkeletonSearch, SkeletonStats } from "@/components/skeletons";

export default function BranchLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. HEADER DEL MÓDULO */}
      <SkeletonHeader stats={3} showActions={true} />

      <SkeletonSearch />

      {/* 2. CONTADORES / ESTADÍSTICAS SUPERIORES (Mismo formato que Ventas/Compras) */}
      <SkeletonStats count={4} />
    </div>
  );
}
