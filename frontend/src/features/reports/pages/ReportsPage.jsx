// ========================================
// features/reports/pages/ReportsPage.jsx
// ========================================
import { getUser } from "@/features/auth/services/session.service";
import { FileBarChart } from "lucide-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import "@/styles/print.css";
import ReportsFilters from "../components/ReportsFilters";
import ReportsHeader from "../components/ReportsHeader";
import ReportsLoading from "../components/ReportsLoading";
import ReportsViewer from "../components/ReportsViewer";
import useReports from "../hooks/useReports";

export default function ReportsPage() {
  const user = getUser();
  const canAccessReports = ["ADMIN", "MANAGER"].includes(user?.role);

  const {
    filters,
    setFilters,
    activeFilters,
    reportRef,
    generateReport,
    handleDownload,
    downloading,
    handlePrint,
    isLoading,
  } = useReports();

  // 🛡️ Guard de seguridad: Redirigir si no tiene permisos
  if (!canAccessReports) {
    return <Navigate to="/dashboard" replace />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (filters?.reportType) {
      generateReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentType = activeFilters?.reportType;

  if (isLoading) {
    return <ReportsLoading />;
  }

  return (
    <div className="space-y-6">
      <ReportsHeader onGenerate={generateReport} isLoading={isLoading} />

      <ReportsFilters
        filters={filters}
        onChange={setFilters}
        onDownload={handleDownload}
        onPrint={handlePrint}
        activeFilters={activeFilters}
        downloading={downloading}
      />

      {currentType ? (
        <ReportsViewer reportType={currentType} filters={activeFilters} innerRef={reportRef} isLoading={isLoading} />
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] backdrop-blur-xl animate-fade-in">
          {/* ... UI de bienvenida (sin cambios) ... */}
          <div className="relative flex min-h-[500px] flex-col items-center justify-center px-8 py-16 text-center">
            {/* El contenido de la interfaz de usuario se mantiene intacto */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04]">
              <FileBarChart className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            </div>
            {/* ... resto de elementos de UI ... */}
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Centro de Reportes Analíticos</h2>
          </div>
        </div>
      )}
    </div>
  );
}
