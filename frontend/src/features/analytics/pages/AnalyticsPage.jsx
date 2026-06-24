// ========================================
// features/dashboard/analytics/pages/AnalyticsPage.jsx
// ========================================
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Componentes específicos para Auditoría de Cargas
import AnalyticsHeader from "../components/AnalyticsHeader"; // 👈 Integrado el nuevo Header financiero
import AnalyticsLoading from "../components/AnalyticsLoading";

// Componentes extraídos del Dashboard original (Financieros/Transaccionales)
import PurchasesOverview from "../../dashboard/components/PurchasesOverview";
import RecentSales from "../../dashboard/components/RecentSales";
import SalesOverview from "../../dashboard/components/SalesOverview";

// Hook de datos compartido
import useDashboard from "../../dashboard/hooks/useDashboard";

export default function AnalyticsPage() {
  const navigate = useNavigate();

  // Extraemos tanto la data como los controladores de estado para el filtro de fechas
  const {
    loading,
    kpis,
    analytics,
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
    return <AnalyticsLoading />;
  }

  return (
    <div className="mx-auto max-w-[1800px] space-y-6 p-6">
      {/* 1. Control Superior de Navegación */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex h-fit w-fit items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft size={16} /> Regresar al Resumen
        </button>
      </div>

      {/* 2. Cabecera Analítica Avanzada (Reemplaza el título estático e inyecta KPIs + Controles) */}
      <AnalyticsHeader
        totalSales={kpis?.totalSales || 0}
        totalPurchases={kpis?.totalPurchases || 0}
        salesCount={kpis?.salesCount || 0}
        purchasesCount={kpis?.purchasesCount || 0}
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

      {/* 3. Bloques de Tendencia (Gráficos de Líneas de Ventas y Compras) */}
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

      <RecentSales sales={analytics?.recentSales || []} />
    </div>
  );
}
