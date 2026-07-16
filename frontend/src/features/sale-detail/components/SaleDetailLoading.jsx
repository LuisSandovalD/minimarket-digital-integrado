// ========================================
// features/sale-detail/components/SaleDetailLoading.jsx
// ========================================

import { SkeletonHeader, SkeletonSearch, SkeletonTable } from "@/components/skeletons";

export default function SaleDetailLoading() {
  return (
    <div
      className="
        space-y-6
        animate-pulse
      "
    >
      {/* HEADER */}
      <SkeletonHeader stats={3} showActions={false} />

      {/* SEARCH */}
      <SkeletonSearch />

      {/* TABLE */}
      <SkeletonTable columns={7} rows={8} />
    </div>
  );
}
