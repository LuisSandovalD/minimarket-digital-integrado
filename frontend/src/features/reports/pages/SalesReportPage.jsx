// ========================================
// features/analytics/pages/SalesReportPage.jsx
// ========================================

import { SkeletonTable } from "@/components/skeletons";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getActivityReport } from "../services/report.service";

export default function SalesReportPage({ filters }) {
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

          // 1. Solicitamos el binario (Blob) mediante tu servicio actualizado
          const blobData = await getActivityReport(
            company?.id,
            filters.startDate,
            filters.endDate,
          );

          // Validación del tamaño del archivo
          if (!blobData || blobData.size === 0) {
            throw new Error("El archivo PDF se recibió vacío.");
          }

          // 2. Creamos una URL segura local para inyectarla en el iframe
          const url = URL.createObjectURL(
            new Blob([blobData], { type: "application/pdf" }),
          );

          // Limpieza de memoria reactiva
          setPdfUrl((prevUrl) => {
            if (prevUrl) URL.revokeObjectURL(prevUrl);
            return url;
          });
        }
      } catch (err) {
        console.error("Error al generar vista previa del PDF de ventas:", err);
        setError(
          "Ocurrió un error al generar la vista previa del reporte de ventas.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    // Limpieza de memoria al desmontar el componente
    return () => {
      setPdfUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return null;
      });
    };
  }, [filters]);

  // Renderizado del esqueleto durante la carga
  if (loading) return <SkeletonTable />;

  // Control visual de fallos
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/40">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-sm font-medium text-red-800 dark:text-red-300 text-center">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Encabezado opcional simplificado o puedes mantener el tuyo externo */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Reporte de Ventas
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Visualiza de manera oficial el balance y las operaciones de salida
          correspondientes al rango de fechas seleccionado.
        </p>
      </div>

      {/* Contenedor del Visor PDF Incrustado */}
      <div className="w-full h-[750px] bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=1`} // Activa los controles nativos del navegador para descargar/imprimir
            className="w-full h-full border-none"
            title="Reporte Oficial de Ventas"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6">
            <p className="text-sm font-medium">
              Por favor selecciona un rango de fechas válido en los filtros para
              generar el PDF.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
