// components/skeletons/SkeletonStats.jsx

export default function SkeletonStats({ count = 4 }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4

        lg:grid-cols-4
      "
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            rounded-2xl
            border
            border-slate-100
            bg-slate-50
            p-4

            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="mb-3 h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />

          <div className="h-7 w-16 rounded-lg bg-slate-200 dark:bg-slate-700" />

          <div className="mt-2 h-3 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}
