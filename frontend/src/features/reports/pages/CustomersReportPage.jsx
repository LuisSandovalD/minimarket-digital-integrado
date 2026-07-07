// ========================================
// features/analytics/pages/CustomersReportPage.jsx
// ========================================

import { SkeletonTable } from "@/components/skeletons";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getCustomersReport } from "../services/report.service";

export default function CustomersReportPage({ filters }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        if (filters && filters.startDate && filters.endDate) {
          const company = getCompany();

          // 1. Llamamos al servicio modificado que trae el Blob binario
          const blobData = await getCustomersReport(
            company?.id,
            filters.startDate,
            filters.endDate,
          );

          // Validamos que contenga información
          if (!blobData || blobData.size === 0) {
            throw new Error("El archivo PDF se recibió vacío.");
          }

          // 2. Creamos un Object URL a partir del Blob especificando el tipo PDF
          const url = URL.createObjectURL(
            new Blob([blobData], { type: "application/pdf" }),
          );

          // Limpieza preventiva: si ya existía un blob en el estado anterior, lo destruimos
          setPdfUrl((prevUrl) => {
            if (prevUrl) URL.revokeObjectURL(prevUrl);
            return url;
          });
        }
      } catch (err) {
        console.error("Error al renderizar el visor de PDF:", err);
        setError(
          "Ocurrió un error al generar la vista previa del PDF. Inténtalo de nuevo.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    // Clean-up: Revocamos la URL de memoria cuando el componente se desmonte
    return () => {
      setPdfUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return null;
      });
    };
  }, [filters]);

  // Pantalla de Carga (Espera)
  if (loading) return <SkeletonTable />;

  // Estado de error amigable en UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/40">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-sm font-medium text-red-800 dark:text-red-300 text-center mb-4">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors"
        >
          <RefreshCw size={12} /> Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Visor Interactivo NATIVO del PDF */}
      <div className="w-full h-[750px] bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=1`} // El '#toolbar=1' activa las opciones nativas de impresión y zoom del browser
            className="w-full h-full border-none"
            title="Reporte Maestro de Clientes"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6">
            <p className="text-sm font-medium">
              Por favor selecciona un rango de fechas en los filtros para
              generar el PDF.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
