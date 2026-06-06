import { Activity, Check } from "lucide-react";

export default function DatabaseStatus({ health, loading }) {
  if (loading)
    return (
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-white/10 animate-pulse" />
        <div className="h-3 w-64 rounded bg-white/10 animate-pulse" />
      </div>
    );

  if (!health)
    return <p className="text-slate-500 dark:text-slate-400">Sin datos</p>;

  const isGood = health.status === "good";

  return (
    <div
      className={`
        rounded-2xl
        border
        backdrop-blur-xl
        p-6

        ${
          isGood
            ? "bg-emerald-500/10 border-emerald-500/20"
            : "bg-amber-500/10 border-amber-500/20"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* ICON */}
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl

            ${
              isGood
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
            }
          `}
        >
          {isGood ? <Check size={24} /> : <Activity size={24} />}
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={`
                text-lg
                font-semibold

                ${
                  isGood
                    ? "text-emerald-900 dark:text-emerald-200"
                    : "text-amber-900 dark:text-amber-200"
                }
              `}
            >
              {health.status === "good"
                ? "Sistema Saludable"
                : "Revisar Estado"}
            </h3>

            <span
              className={`
                inline-flex
                px-2
                py-1
                rounded-lg
                text-xs
                font-medium

                ${
                  isGood
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                }
              `}
            >
              {health.database}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Latencia</p>
              <p className="text-slate-900 dark:text-slate-100 font-medium">
                {health.latency}
              </p>
            </div>

            <div>
              <p className="text-slate-500 dark:text-slate-400">Versión</p>
              <p className="text-slate-900 dark:text-slate-100 font-medium">
                PostgreSQL {health.version.split(" ")[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
