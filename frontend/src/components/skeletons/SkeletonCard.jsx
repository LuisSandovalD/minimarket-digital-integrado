// components/skeletons/SkeletonCard.jsx

export default function SkeletonCard() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />

      <div className="mt-4 h-5 w-32 rounded-lg bg-slate-200 dark:bg-slate-800" />

      <div className="mt-3 h-4 w-full rounded-lg bg-slate-100 dark:bg-slate-900" />

      <div className="mt-2 h-4 w-3/4 rounded-lg bg-slate-100 dark:bg-slate-900" />

      <div className="mt-6 h-10 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
