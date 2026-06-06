// components/skeletons/SkeletonChart.jsx

export default function SkeletonChart() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div className="h-6 w-40 rounded-lg bg-slate-200 dark:bg-slate-800" />

      <div className="mt-6 h-72 rounded-2xl bg-slate-100 dark:bg-slate-900" />
    </div>
  );
}
