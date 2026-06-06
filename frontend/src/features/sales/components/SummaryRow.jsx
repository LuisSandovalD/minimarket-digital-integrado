export function SummaryRow({ label, value, bold = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`
          text-xs
          tracking-wide

          ${
            bold
              ? "text-slate-600 dark:text-slate-300 font-medium"
              : "text-slate-500 dark:text-slate-500"
          }
        `}
      >
        {label}
      </span>

      <span
        className={`
          tabular-nums

          ${bold ? "text-base font-semibold" : "text-sm font-medium"}
        `}
      >
        {value}
      </span>
    </div>
  );
}
