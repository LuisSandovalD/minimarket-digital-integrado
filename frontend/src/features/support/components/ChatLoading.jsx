import { SkeletonHeader, SkeletonStats } from "@/components/skeletons";

export default function ChatLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <SkeletonHeader stats={3} showActions />

      <SkeletonStats count={8} />
    </div>
  );
}
