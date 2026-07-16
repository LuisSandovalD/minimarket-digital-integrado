import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AreaChart({ title = "Ventas", data = [], dataKey = "sales", nameKey = "date" }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      <h2 className="mb-5 text-lg font-semibold text-slate-800 dark:text-white">{title}</h2>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          No existen datos
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={nameKey} />
              <YAxis />
              <Tooltip />

              <Area type="monotone" dataKey={dataKey} stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2} />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
