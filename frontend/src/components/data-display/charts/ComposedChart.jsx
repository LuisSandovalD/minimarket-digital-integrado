import {
  Bar,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart as RechartsComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ComposedChart({ title = "Ventas vs Compras", data = [] }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="sales" />

            <Bar dataKey="purchases" />

            <Line type="monotone" dataKey="profit" strokeWidth={3} />
          </RechartsComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
