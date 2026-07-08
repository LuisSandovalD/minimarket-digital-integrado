// ========================================
// features/analytics/components/RecentActivity.jsx
// ========================================

import MetricCard from "@/components/card/MetricCard";
import {
  Activity,
  ArrowRight,
  FileText,
  Package,
  PlusCircle,
  RefreshCw,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentActivity({ logs = [] }) {
  const previewLogs = logs.slice(0, 5);

  const getIcon = (action = "") => {
    if (action.includes("SALE")) return ShoppingCart;
    if (action.includes("PRODUCT")) return Package;
    if (action.includes("CUSTOMER")) return Users;
    return FileText;
  };

  const translateAction = (action = "") => {
    const value = action.toUpperCase();
    if (value.includes("CREATE")) return "Creación";
    if (value.includes("UPDATE")) return "Actualización";
    if (value.includes("DELETE")) return "Eliminación";
    if (value.includes("LOGIN")) return "Inicio de Sesión";
    if (value.includes("LOGOUT")) return "Cierre de Sesión";
    return value.replaceAll("_", " ");
  };

  const formatRelativeDate = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diff = Math.floor((now - created) / 1000);

    if (diff < 60) return "Hace unos segundos";
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
    return `Hace ${Math.floor(diff / 86400)} días`;
  };

  const createCount = logs.filter((log) =>
    log.action?.includes("CREATE"),
  ).length;
  const updateCount = logs.filter((log) =>
    log.action?.includes("UPDATE"),
  ).length;
  const usersCount = new Set(logs.map((log) => log.user?.id).filter(Boolean))
    .size;

  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Activity size={22} className="text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Actividad Reciente
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Últimos movimientos registrados en el sistema.
          </p>
        </div>
      </div>

      {/* Grid de Métricas con MetricCard Sincronizado */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Activity}
          title="Actividades"
          value={logs.length}
          description="Eventos registrados"
          variant="info"
          className="border border-slate-100 dark:border-slate-800 bg-background"
        />
        <MetricCard
          icon={Users}
          title="Usuarios"
          value={usersCount}
          description="Usuarios con actividad"
          variant="default"
          className="border border-slate-100 dark:border-slate-800 bg-background"
        />
        <MetricCard
          icon={PlusCircle}
          title="Creaciones"
          value={createCount}
          description="Registros creados"
          variant="success"
          className="border border-slate-100 dark:border-slate-800 bg-background"
        />
        <MetricCard
          icon={RefreshCw}
          title="Actualizaciones"
          value={updateCount}
          description="Registros modificados"
          variant="warning"
          className="border border-slate-100 dark:border-slate-800 bg-background"
        />
      </div>

      {/* Lista de Registros */}
      {logs.length === 0 ? (
        <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <span className="text-sm text-slate-400">
            No existe actividad reciente
          </span>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {previewLogs.map((log) => {
              const Icon = getIcon(log.action);

              return (
                <div
                  key={log.id}
                  className="flex items-center gap-4 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-slate-700 shrink-0">
                    <Icon
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-white truncate">
                      {translateAction(log.action)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {log.user?.name || "Sistema"}
                    </p>
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap">
                    {formatRelativeDate(log.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-5 border-t border-slate-200 dark:border-slate-700 pt-5">
            <Link
              to="/activities"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700"
            >
              Ver historial completo
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
