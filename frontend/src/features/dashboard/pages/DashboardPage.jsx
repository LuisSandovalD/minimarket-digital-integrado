import DashboardHeader from "../components/DashboardHeader";

import PurchasesOverview from "../components/PurchasesOverview";
import SalesOverview from "../components/SalesOverview";

import TopCustomersChart from "../components/TopCustomersChart";
import TopProductsChart from "../components/TopProductsChart";

import RecentActivity from "../components/RecentActivity.jsx";
import RecentSales from "../components/RecentSales";

import LowStockProducts from "../components/LowStockProducts";

import DashboardLoading from "../components/DashboardLoading";

import TopSuppliersChart from "../components/TopSuppliersChart.jsx";
import useDashboard from "../hooks/useDashboard";

export default function DashboardPage() {
  const {
    loading,

    kpis,
    analytics,
    alerts,
    activity,
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
      {/* Header */}
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

      {/* Tendencias */}
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

      {/* Rankings rápidos */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TopProductsChart products={analytics?.topProducts || []} />

        <TopCustomersChart customers={analytics?.topCustomers || []} />
      </div>

      <TopSuppliersChart suppliers={analytics?.topSuppliers || []} />

      {/* Ventas recientes */}
      <RecentSales sales={analytics?.recentSales || []} />
      <RecentActivity logs={activity?.logs || []} />
      <LowStockProducts products={alerts?.lowStock || []} />
    </div>
  );
}
