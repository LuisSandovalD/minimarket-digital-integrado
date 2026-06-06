// components/skeletons/SkeletonForm.jsx

export default function SkeletonForm({ fields = 6 }) {
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
      <div className="space-y-5">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index}>
            <div className="mb-2 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="h-11 rounded-xl bg-slate-100 dark:bg-slate-900" />
          </div>
        ))}
      </div>
    </div>
  );
}
