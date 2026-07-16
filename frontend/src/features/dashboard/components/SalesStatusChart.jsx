import { PieChart } from "@/components/data-display/";

const STATUS_MAP = {
  COMPLETED: {
    label: "Completada",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  PENDING: {
    label: "Pendiente",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  CANCELLED: {
    label: "Cancelada",
    color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
  UNKNOWN: {
    label: "Desconocido",
    color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
};

export default function SalesStatusChart({ sales = [] }) {
  const chartData = Object.values(
    sales.reduce((acc, sale) => {
      const status = sale.status || "UNKNOWN";
      if (!acc[status]) {
        acc[status] = {
          name: STATUS_MAP[status]?.label || status,
          value: 0,
          status,
        };
      }
      acc[status].value++;
      return acc;
    }, {}),
  );

  const totalSales = sales.length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="mb-4">
        <h2 className="text-base font-medium text-slate-800 dark:text-white">Estado de ventas</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Distribución de ventas según su estado</p>
      </div>

      <PieChart title="Estados" data={chartData} />

      <div className="mt-5 space-y-2">
        {chartData.map((item) => {
          const style = STATUS_MAP[item.status] || STATUS_MAP.UNKNOWN;
          const pct = totalSales > 0 ? Math.round((item.value / totalSales) * 100) : 0;

          return (
            <div
              key={item.status}
              className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-2"
            >
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${style.color}`}>{item.name}</span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 dark:text-slate-500">{pct}%</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
        <span className="text-xs text-slate-500 dark:text-slate-400">Total de ventas</span>
        <span className="text-sm font-medium text-slate-900 dark:text-white">{totalSales}</span>
      </div>
    </div>
  );
}
