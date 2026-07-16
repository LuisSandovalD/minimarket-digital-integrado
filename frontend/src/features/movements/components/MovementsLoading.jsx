import { SkeletonHeader, SkeletonSearch, SkeletonTable } from "@/components/skeletons";

export default function MovementsLoading() {
  return (
    <div
      className="
        space-y-6
        animate-pulse
      "
    >
      <SkeletonHeader stats={6} showActions />

      <SkeletonSearch />

      <SkeletonTable columns={8} rows={8} />
    </div>
  );
}
