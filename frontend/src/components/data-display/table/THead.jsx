export default function THead({ columns = [] }) {
  return (
    <thead>
      <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03]">
        {columns.map((column) => (
          <th
            key={column.key}
            className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-white/45"
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
