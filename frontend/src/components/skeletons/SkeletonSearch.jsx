// components/skeletons/SkeletonSearch.jsx

export default function SkeletonSearch() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div className="h-11 w-full rounded-xl bg-slate-100 dark:bg-slate-900" />
    </div>
  );
}
