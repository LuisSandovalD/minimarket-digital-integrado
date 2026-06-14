import {
  BarChart3,
  CalendarRange,
  FileBarChart,
  TrendingUp,
} from "lucide-react";

import "@/styles/print.css";
import { useEffect } from "react";
import ReportsFilters from "../components/ReportsFilters";
import ReportsHeader from "../components/ReportsHeader";
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
  } = useReports();

  useEffect(() => {
    // Auto-generate a preview on page load so users see data immediately
    generateReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentType = activeFilters?.reportType;

  return (
    <div className="space-y-6">
      <ReportsHeader onGenerate={generateReport} />

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
        />
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] backdrop-blur-xl">
          {/* Glow Effects */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex min-h-[500px] flex-col items-center justify-center px-8 py-16 text-center">
            {/* Icono Principal */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04]">
              <FileBarChart className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            </div>

            {/* Badge */}
            <div className="mb-4 rounded-full border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Reportes
              </span>
            </div>

            {/* Título */}
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Centro de Reportes
            </h2>

            {/* Descripción */}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Genera reportes detallados para analizar el rendimiento de tu
              negocio. Obtén información sobre ventas, compras, inventario,
              clientes y procesos operativos.
            </p>

            {/* Cards */}
            <div className="mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-6 text-left">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/10">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Selecciona el reporte
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Escoge el módulo que deseas analizar: ventas, compras,
                  inventario, clientes o auditoría.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-6 text-left">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-500/10">
                  <CalendarRange className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Configura fechas
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Define un rango de fechas para obtener resultados más precisos
                  y relevantes.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-6 text-left">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Analiza resultados
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Visualiza métricas, tendencias y estadísticas para apoyar la
                  toma de decisiones estratégicas.
                </p>
              </div>
            </div>

            {/* Hint */}
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 dark:border-white/[0.08] px-6 py-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Selecciona un tipo de reporte y presiona{" "}
                <span className="font-semibold text-blue-500">
                  "Generar Reporte"
                </span>{" "}
                para comenzar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
