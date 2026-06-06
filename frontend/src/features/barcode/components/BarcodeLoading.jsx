import {
  SkeletonCard,
  SkeletonHeader,
  SkeletonSearch,
} from "@/components/skeletons";

export default function BarcodeLoading() {
  return (
    <div
      className="
        space-y-6
        animate-pulse
      "
    >
      <SkeletonHeader stats={3} showActions />

      <SkeletonSearch />

      <SkeletonCard />
    </div>
  );
}
