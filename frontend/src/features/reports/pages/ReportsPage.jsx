import {
  BarChart3,
  CalendarRange,
  FileBarChart,
  TrendingUp,
} from "lucide-react";

import { useEffect } from "react";

import "@/styles/print.css";

import ReportsFilters from "../components/ReportsFilters";
import ReportsHeader from "../components/ReportsHeader";
import ReportsLoading from "../components/ReportsLoading";
import ReportsViewer from "../components/ReportsViewer";

import useReports from "../hooks/useReports";

export default function ReportsPage() {
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
        <ReportsViewer
          reportType={currentType}
          filters={activeFilters}
          innerRef={reportRef}
          isLoading={isLoading}
        />
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] backdrop-blur-xl animate-fade-in">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex min-h-[500px] flex-col items-center justify-center px-8 py-16 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04]">
              <FileBarChart className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            </div>

            <div className="mb-4 rounded-full border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Módulo del Sistema
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Centro de Reportes Analíticos
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Genera reportes detallados para analizar el rendimiento de tu
              negocio. Obtén información sobre ventas, compras, inventario,
              clientes y procesos operativos.
            </p>

            <div className="mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-6 text-left">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/10">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  1. Selecciona el reporte
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Escoge el módulo que deseas analizar: ventas, compras,
                  inventario o auditoría.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-6 text-left">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-500/10">
                  <CalendarRange className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  2. Configura fechas
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Define un rango cronológico para segmentar los datos de manera
                  precisa.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-6 text-left">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  3. Analiza y exporta
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Visualiza las métricas en pantalla e imprímelas o descárgalas
                  en Excel/PDF.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 dark:border-white/[0.08] px-6 py-3.5 bg-slate-50/50 dark:bg-transparent">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Elige un reporte en la lista superior y haz clic en{" "}
                <span className="font-bold text-blue-500 dark:text-blue-400">
                  "Exportar Datos"
                </span>{" "}
                o visualízalo abajo.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
