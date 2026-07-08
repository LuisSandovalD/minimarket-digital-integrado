// ========================================
// features/dashboard/statistics/pages/StatisticsPage.jsx
// ========================================
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Componente específico para la carga visual de estadísticas
import StatisticsHeader from "../components/StatisticsHeader.jsx"; // 👈 Importación del nuevo Header
import StatisticsLoading from "../components/StatisticsLoading.jsx";

// Componentes extraídos del Dashboard original (Rankings, Entidades y Operaciones)
import RecentActivity from "../components/RecentActivity.jsx";
import TopCustomersChart from "../components/TopCustomersChart";
import TopProductsChart from "../components/TopProductsChart";
import TopSuppliersChart from "../components/TopSuppliersChart.jsx";

// Hook de datos compartido
import useDashboard from "../../dashboard/hooks/useDashboard.js";

export default function StatisticsPage() {
  const navigate = useNavigate();

  // Extraemos las funciones de filtrado temporal necesarias para el Header desde tu hook
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

  return (
    <div className="space-y-6">
      {/* 1. Control Superior de Navegación */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex h-fit w-fit items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft size={16} /> Regresar al Resumen
        </button>
      </div>

      {/* 2. Cabecera Avanzada de Estadísticas con Filtros Activos */}
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

      {/* 3. Rejilla de Rankings Rápidos (Top Productos y Clientes) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TopProductsChart products={analytics?.topProducts || []} />
        <TopCustomersChart customers={analytics?.topCustomers || []} />
      </div>

      {/* 4. Gráfico Ancho de Proveedores Críticos */}
      <TopSuppliersChart suppliers={analytics?.topSuppliers || []} />

      <RecentActivity logs={activity?.logs || []} />
    </div>
  );
}
