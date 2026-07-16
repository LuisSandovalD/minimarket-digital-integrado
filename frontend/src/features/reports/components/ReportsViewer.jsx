import { AlertCircle, FileText, Loader2 } from "lucide-react";
import { reportsRegistry } from "../constants/reportsRegistry";

export default function ReportsViewer({ reportType, filters, innerRef, isLoading = false }) {
  // 1. Estado: Cargando datos (Spinner/Skeleton elegante)
  if (isLoading && reportType) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin mb-3 stroke-[1.5]" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Procesando información...</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Generando la estructura del reporte</p>
      </div>
    );
  }

  // 2. Estado: No se ha seleccionado ningún reporte aún (Empty State amigable)
  if (!reportType) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 dark:border-white/[0.08] rounded-2xl bg-slate-50/50 dark:bg-white/[0.01] text-slate-400 dark:text-slate-500 max-w-md mx-auto my-12 transition-all duration-300">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-slate-400 dark:text-slate-400 mb-4">
          <FileText className="w-6 h-6 stroke-[1.5]" />
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ningún reporte seleccionado</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-1.5 max-w-[280px] leading-relaxed">
          Por favor, elige un tipo de reporte en los filtros superiores para comenzar la visualización.
        </p>
      </div>
    );
  }

  const Component = reportsRegistry[reportType];

  // 3. Estado: Error de configuración (Fallback corporativo)
  if (!Component) {
    return (
      <div className="flex items-start gap-3.5 p-4 rounded-xl bg-red-50/80 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-900 dark:text-red-400 max-w-xl mx-auto my-8 shadow-sm backdrop-blur-sm">
        <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold tracking-wide uppercase text-red-800 dark:text-red-400">
            Error de Registro
          </h4>
          <p className="text-xs text-red-700/90 dark:text-red-400/80 mt-1.5 leading-relaxed">
            El identificador de reporte{" "}
            <code className="bg-red-100 dark:bg-red-500/20 px-1.5 py-0.5 rounded font-mono text-red-800 dark:text-red-300 border border-red-200/40">
              {reportType}
            </code>{" "}
            no se encuentra mapeado en el registro interno.
          </p>
        </div>
      </div>
    );
  }

  // 4. Render del Reporte listo para pantalla e Impresión impecable
  return (
    <div ref={innerRef}>
      <Component filters={filters} />
    </div>
  );
}
