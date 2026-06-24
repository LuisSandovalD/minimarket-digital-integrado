import { SkeletonForm, SkeletonHeader } from "@/components/skeletons";

export default function ConfigurationLoading() {
  return (
    <div
      className="
        space-y-6
        animate-pulse
      "
    >
      <SkeletonHeader stats={3} showActions />

      <SkeletonForm />
    </div>
  );
}
