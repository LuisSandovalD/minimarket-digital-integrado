// ========================================
// features/analytics/pages/PurchasesReportPage.jsx
// ========================================

import { SkeletonTable } from "@/components/skeletons";
import { AlertTriangle, Calendar, RefreshCw, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getDailyPurchasesReport } from "../services/report.service";

export default function PurchasesReportPage({ filters }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Espera a los filtros iniciales
  const [error, setError] = useState(null);

  const fetchPdf = async () => {
    if (!filters?.startDate || !filters?.endDate) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const company = getCompany();
      if (!company?.id) {
        throw new Error("No se encontró el ID de la empresa.");
      }

      // Solicitamos el binario (Blob) del PDF de compras
      const blobData = await getDailyPurchasesReport(
        company.id,
        filters.startDate,
        filters.endDate,
      );

      // Validación de integridad del archivo recibido
      if (!blobData || blobData.size === 0) {
        throw new Error("El archivo PDF se recibió vacío.");
      }

      const blob =
        blobData instanceof Blob
          ? blobData
          : new Blob([blobData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Limpieza preventiva de memoria en estados anteriores
      setPdfUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });
    } catch (err) {
      console.error("Error al generar vista previa del PDF de compras:", err);
      setError(err.message || "Error al generar el reporte de compras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdf();

    // Limpieza de memoria (Clean-up) al desmontar o cambiar filtros
    return () => {
      setPdfUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return null;
      });
    };
  }, [filters]);

  const hasFilters = filters?.startDate && filters?.endDate;

  return (
    <div className="w-full space-y-6 bg-transparent">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Reporte de Compras Diarias
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visualiza de manera oficial el balance de compras y egresos
            correspondientes al rango de fechas seleccionado.
          </p>
        </div>

        {/* ACCIONES (SÓLO ACTUALIZAR) */}
        {pdfUrl && !loading && hasFilters && (
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
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-50">
                No se pudo cargar el reporte
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {error}
              </p>
            </div>
            <button
              onClick={fetchPdf}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Intentar de nuevo
            </button>
          </div>
        ) : !hasFilters ? (
          /* ESTADO INICIAL: FALTA SELECCIONAR FECHAS */
          <div className="max-w-sm text-center p-6 space-y-3">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto border border-slate-200/60 dark:border-slate-700/50">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-200">
                Rango de fechas requerido
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Por favor, selecciona una fecha de inicio y de fin en el panel
                de filtros para generar el reporte de compras.
              </p>
            </div>
          </div>
        ) : pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-none bg-white dark:bg-slate-900"
            title="Reporte Oficial de Compras Diarias"
          />
        ) : (
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            No hay datos disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
