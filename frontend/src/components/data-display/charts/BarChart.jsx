import {
  Bar,
  CartesianGrid,
  Cell,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#185FA5", "#1D9E75", "#534AB7", "#BA7517", "#A32D2D"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-slate-800 dark:text-white">{label}</p>
      <p className="text-slate-500 dark:text-slate-400">
        {payload[0].value} und.
      </p>
    </div>
  );
};

export default function BarChart({
  title = "Gráfico",
  data = [],
  dataKey = "total",
  nameKey = "name",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      {data.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-400">Sin datos disponibles</span>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(148,163,184,0.2)"
              />

              <XAxis
                dataKey={nameKey}
                tick={{ fontSize: 11, fill: "rgba(100,116,139,0.8)" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "rgba(100,116,139,0.8)" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
              />

              <Bar dataKey={dataKey} radius={[6, 6, 0, 0]} maxBarSize={40}>
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
