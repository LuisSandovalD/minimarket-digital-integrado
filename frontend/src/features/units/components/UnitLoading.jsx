import {
  SkeletonHeader,
  SkeletonSearch,
  SkeletonTable,
} from "@/components/skeletons";

export default function UnitLoading() {
  return (
    <div
      className="
        p-6
        space-y-6
        animate-pulse
      "
    >
      <SkeletonHeader stats={3} showActions />

      <SkeletonSearch />

      <SkeletonTable columns={8} rows={8} />
    </div>
  );
}
