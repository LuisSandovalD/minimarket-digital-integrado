import { ResponsiveContainer, Tooltip, Treemap } from "recharts";

export default function TreemapChart({ title = "Categorías", data = [] }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap data={data} dataKey="value" stroke="#fff">
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
