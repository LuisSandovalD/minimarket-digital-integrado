// components/skeletons/SkeletonModal.jsx

export default function SkeletonModal() {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-xl

        dark:bg-slate-950
      "
    >
      <div className="h-7 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />

      <div className="mt-6 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <div className="mb-2 h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="h-11 rounded-xl bg-slate-100 dark:bg-slate-900" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />

        <div className="h-10 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
