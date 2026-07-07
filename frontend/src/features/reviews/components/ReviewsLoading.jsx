// ========================================
// features/reviews/components/ReviewsLoading.jsx
// ========================================

import { SkeletonHeader, SkeletonStats } from "@/components/skeletons";

export default function ReviewsLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-6 animate-pulse">
      {/* 1. ESQUELETO DE LA CABECERA */}
      <SkeletonHeader stats={3} showActions />

      {/* 2. GRID DE ESQUELETOS ASIMÉTRICO */}
      {/* Mantiene la proporción lg:grid-cols-12 para evitar saltos visuales bruscos */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* COLUMNA IZQUIERDA: ESQUELETO DEL LISTADO DE RESEÑAS */}
        <div className="lg:col-span-8">
          <SkeletonStats className="w-full h-[250px] rounded-2xl" />
        </div>

        {/* COLUMNA DERECHA: ESQUELETO DE LA TARJETA DE DISTRIBUCIÓN */}
        <div className="lg:col-span-4">
          <SkeletonStats className="w-full h-[280px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
