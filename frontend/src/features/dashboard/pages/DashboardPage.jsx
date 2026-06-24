// ========================================
// features/dashboard/pages/DashboardPage.jsx
// ========================================
import { BarChart3, FileText, LineChart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import DashboardHeader from "../components/DashboardHeader";
import DashboardLoading from "../components/DashboardLoading";

import LowStockProducts from "../components/LowStockProducts";
import PurchasesOverview from "../components/PurchasesOverview";
import SalesOverview from "../components/SalesOverview";

import useDashboard from "../hooks/useDashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
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

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="mx-auto max-w-[1800px] space-y-8 p-6">
      {/* Cabecera Principal */}
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

      {/* 🚀 Los 3 Accesos Directos Especializados (Como Links) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* LINK: ANALÍTICA */}
        <Link
          to="../analytics" // 👈 Ruta relativa limpia
          className="flex items-center justify-between p-5 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-all group dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-blue-600 text-white rounded-lg">
              <LineChart size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">
                Analítica
              </h3>
              <p className="text-xs text-slate-500">
                Flujos de caja e históricos.
              </p>
            </div>
          </div>
          <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>

        {/* LINK: ESTADÍSTICA */}
        <Link
          to="../statistics" // 👈 Ruta relativa limpia
          className="flex items-center justify-between p-5 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-all group dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-emerald-600 text-white rounded-lg">
              <BarChart3 size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">
                Estadísticas
              </h3>
              <p className="text-xs text-slate-500">
                Rankings y rendimiento top.
              </p>
            </div>
          </div>
          <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>

        {/* LINK: REPORTES */}
        <Link
          to="../reports" // 👈 Sube un nivel relativo de manera correcta
          className="flex items-center justify-between p-5 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-all group dark:border-slate-800 dark:bg-purple-950/20 dark:hover:bg-purple-950/30"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-purple-600 text-white rounded-lg">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">
                Reportes
              </h3>
              <p className="text-xs text-slate-500">
                Exportables, PDFs y auditorías.
              </p>
            </div>
          </div>
          <span className="text-purple-600 font-bold group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {/* Bloque Central de Rendimiento General */}
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

      {/* Alertas Críticas */}
      <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
        <LowStockProducts products={alerts?.lowStock || []} />
      </div>
    </div>
  );
}
