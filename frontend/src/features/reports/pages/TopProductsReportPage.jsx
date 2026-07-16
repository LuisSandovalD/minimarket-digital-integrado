// ========================================
// features/analytics/pages/TopProductsReportPage.jsx
// ========================================

import { SkeletonTable } from "@/components/skeletons";
import { AlertTriangle, FileText, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getTopProductsReport } from "../services/report.service";

export default function TopProductsReportPage() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPdf = async () => {
    try {
      setLoading(true);
      setError(null);

      const company = getCompany();
      if (!company?.id) {
        throw new Error("No se encontró el ID de la empresa.");
      }

      const blobData = await getTopProductsReport(company.id);
      if (!blobData || blobData.size === 0) {
        throw new Error("El reporte PDF se generó vacío.");
      }

      const blob = blobData instanceof Blob ? blobData : new Blob([blobData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al generar el reporte de productos top.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPdf();
    return () => {
      setPdfUrl((curr) => {
        if (curr) URL.revokeObjectURL(curr);
        return null;
      });
    };
  }, []);

  return (
    <div className="w-full space-y-6 bg-transparent">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Reporte de Productos Top
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visualiza y descarga el análisis de los productos con mayor rendimiento y ventas en tu empresa.
          </p>
        </div>

        {/* ACCIONES (SÓLO ACTUALIZAR) */}
        {pdfUrl && !loading && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={fetchPdf}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
              title="Actualizar reporte"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* CONTENEDOR DEL VISOR PDF INCRUSTADO (ANCHO COMPLETO) */}
      <div className="w-full h-[750px] bg-slate-50 dark:bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner flex flex-col justify-center items-center">
        {loading ? (
          <div className="w-full h-full p-6 bg-white dark:bg-slate-900 animate-pulse">
            <SkeletonTable />
          </div>
        ) : error ? (
          <div className="max-w-md text-center p-6 space-y-4">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-100 dark:border-red-900/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-50">No se pudo cargar el reporte</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{error}</p>
            </div>
            <button
              onClick={fetchPdf}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Intentar de nuevo
            </button>
          </div>
        ) : pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-none bg-white dark:bg-slate-900"
            title="Top Productos"
          />
        ) : (
          <p className="text-slate-400 dark:text-slate-500 text-sm">No hay datos disponibles.</p>
        )}
      </div>
    </div>
  );
}
