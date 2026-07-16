import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChart({ title = "Ventas", data = [], dataKey = "sales", nameKey = "date" }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h2>
      </div>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <span className="text-sm text-slate-400">No existen datos</span>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey={nameKey} />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey={dataKey} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
