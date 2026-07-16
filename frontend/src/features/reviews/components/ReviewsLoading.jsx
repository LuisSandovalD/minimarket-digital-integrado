// ========================================
// features/reviews/components/ReviewsLoading.jsx
// ========================================

import { SkeletonHeader, SkeletonStats } from "@/components/skeletons";

export default function ReviewsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. ESQUELETO DE LA CABECERA */}
      <SkeletonHeader stats={3} showActions />
      <SkeletonStats count={2} className="!w-full" />
    </div>
  );
}
