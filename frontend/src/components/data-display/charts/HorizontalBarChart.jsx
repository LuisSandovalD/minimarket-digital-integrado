import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#185FA5", "#1D9E75", "#534AB7", "#BA7517", "#A32D2D"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-slate-800 dark:text-white">{label}</p>
      <p className="text-slate-500 dark:text-slate-400">S/ {Number(payload[0].value).toFixed(2)}</p>
    </div>
  );
};

export default function HorizontalBarChart({
  title = "Top clientes",
  subtitle = "Clientes con mayor volumen de compras",
  data = [],
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="mb-4">
        <h2 className="text-base font-medium text-slate-800 dark:text-white">{title}</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,0.2)" />

            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "rgba(100,116,139,0.8)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `S/ ${v}`}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={130}
              tick={{ fontSize: 12, fill: "rgba(100,116,139,0.9)" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.08)" }} />

            <Bar dataKey="total" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
