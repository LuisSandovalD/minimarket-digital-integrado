// ========================================
// features/dashboard/statistics/pages/StatisticsPage.jsx
// ========================================
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatisticsHeader from "../components/StatisticsHeader.jsx";
import StatisticsLoading from "../components/StatisticsLoading.jsx";

import RecentActivity from "../components/RecentActivity.jsx";
import TopCustomersChart from "../components/TopCustomersChart";
import TopProductsChart from "../components/TopProductsChart";
import TopSuppliersChart from "../components/TopSuppliersChart.jsx";

import useDashboard from "../../dashboard/hooks/useDashboard.js";
// 🌟 Importación del servicio de sesión
import { getUser } from "@/features/auth/services/session.service";

export default function StatisticsPage() {
  const navigate = useNavigate();
  const user = getUser();

  // Definimos permisos: Admin, Manager y Supervisor pueden ver estadísticas
  const canAccessStatistics = ["ADMIN", "MANAGER", "SUPERVISOR"].includes(
    user?.role,
  );

  const {
    loading,
    kpis,
    analytics,
    activity,
    period,
    setPeriod,
    draftStartDate,
    setDraftStartDate,
    draftEndDate,
    setDraftEndDate,
    dateError,
    clearDateError,
    onRefresh,
    onApplyCustomRange,
  } = useDashboard();

  if (loading) {
    return <StatisticsLoading />;
  }

  // 🛡️ Guard de acceso: Si no tiene permisos, redirigimos o mostramos mensaje
  if (!canAccessStatistics) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Acceso Restringido
        </h2>
        <p className="text-slate-500">
          No tienes permisos para visualizar esta sección de estadísticas.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 underline"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex h-fit w-fit items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft size={16} /> Regresar al Resumen
        </button>
      </div>

      <StatisticsHeader
        totalProducts={kpis?.products || 0}
        totalCustomers={kpis?.customers || 0}
        suppliers={kpis?.suppliers || 0}
        totalLogs={activity?.logs?.length || 0}
        period={period}
        setPeriod={setPeriod}
        draftStartDate={draftStartDate}
        setDraftStartDate={setDraftStartDate}
        draftEndDate={draftEndDate}
        setDraftEndDate={setDraftEndDate}
        dateError={dateError}
        clearDateError={clearDateError}
        onRefresh={onRefresh}
        onApplyCustomRange={onApplyCustomRange}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TopProductsChart products={analytics?.topProducts || []} />
        <TopCustomersChart customers={analytics?.topCustomers || []} />
      </div>

      <TopSuppliersChart suppliers={analytics?.topSuppliers || []} />

      <RecentActivity logs={activity?.logs || []} />
    </div>
  );
}
