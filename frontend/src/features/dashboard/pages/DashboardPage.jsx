// ========================================
// features/dashboard/pages/DashboardPage.jsx
// ========================================
import { BarChart3, FileText, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardHeader from "../components/DashboardHeader";
import DashboardLoading from "../components/DashboardLoading";

import LowStockProducts from "../components/LowStockProducts";
import PurchasesOverview from "../components/PurchasesOverview";
import SalesOverview from "../components/SalesOverview";

import { getUser } from "@/features/auth/services/session.service";
import useDashboard from "../hooks/useDashboard";

export default function DashboardPage() {
  const user = getUser();
  const {
    loading,
    kpis,
    analytics,
    alerts,
    totalAlerts,
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

  // Definición de permisos basados en roles
  const canAccessAnalytics = ["ADMIN", "MANAGER", "SUPERVISOR"].includes(user?.role);
  const canAccessReports = ["ADMIN", "MANAGER"].includes(user?.role);

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="mx-auto max-w-[1800px] space-y-8">
      <DashboardHeader
        totalSales={kpis.totalSales || 0}
        totalPurchases={kpis.totalPurchases || 0}
        totalProducts={kpis.products || 0}
        totalCustomers={kpis.customers || 0}
        salesCount={kpis.salesCount || 0}
        purchasesCount={kpis.purchasesCount || 0}
        suppliers={kpis.suppliers || 0}
        branches={kpis.branches || 0}
        totalAlerts={totalAlerts}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* ANALÍTICA */}
        {canAccessAnalytics && (
          <Link
            to="../analytics"
            className="flex items-center justify-between p-5 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-all group dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-blue-600 text-white rounded-lg">
                <LineChart size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Analítica</h3>
                <p className="text-xs text-slate-500">Flujos de caja e históricos.</p>
              </div>
            </div>
            <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}

        {/* ESTADÍSTICA - Accesible para todos */}
        <Link
          to="../statistics"
          className="flex items-center justify-between p-5 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-all group dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-emerald-600 text-white rounded-lg">
              <BarChart3 size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Estadísticas</h3>
              <p className="text-xs text-slate-500">Rankings y rendimiento top.</p>
            </div>
          </div>
          <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
        </Link>

        {/* REPORTES - Solo ADMIN y MANAGER */}
        {canAccessReports && (
          <Link
            to="../reports"
            className="flex items-center justify-between p-5 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-all group dark:border-slate-800 dark:bg-purple-950/20 dark:hover:bg-purple-950/30"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-purple-600 text-white rounded-lg">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Reportes</h3>
                <p className="text-xs text-slate-500">Exportables, PDFs y auditorías.</p>
              </div>
            </div>
            <span className="text-purple-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}
      </div>

      <div className="space-y-6">
        <SalesOverview
          sales={analytics?.recentSales || []}
          totalSales={kpis?.totalSales || 0}
          totalOrders={kpis?.salesCount || 0}
        />
        <PurchasesOverview
          purchases={analytics?.recentPurchases || []}
          totalPurchases={kpis?.totalPurchases || 0}
          totalOrders={kpis?.purchasesCount || 0}
        />
      </div>

      <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
        <LowStockProducts products={alerts?.lowStock || []} />
      </div>
    </div>
  );
}
