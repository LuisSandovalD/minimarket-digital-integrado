import { SkeletonTable } from "@/components/skeletons";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getActivityReport } from "../services/report.service"; // Mapea a tu función getActivityReport

export default function AuditReportPage({ filters }) {
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
          const blobData = await getActivityReport(
            company?.id,
            filters.startDate,
            filters.endDate,
          );

          if (!blobData || blobData.size === 0) throw new Error("PDF vacío.");
          const url = URL.createObjectURL(
            new Blob([blobData], { type: "application/pdf" }),
          );
          setPdfUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
        }
      } catch (err) {
        setError("Error al generar el reporte de auditoría.");
      } finally {
        setLoading(false);
      }
    };
    fetchPdf();
    return () =>
      setPdfUrl((curr) => {
        if (curr) URL.revokeObjectURL(curr);
        return null;
      });
  }, [filters]);

  if (loading) return <SkeletonTable />;
  if (error)
    return <div className="p-6 bg-red-50 text-red-800 rounded-xl">{error}</div>;

  return (
    <div className="w-full h-[750px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}#toolbar=1`}
          className="w-full h-full border-none"
          title="Auditoría"
        />
      ) : (
        <p className="p-6 text-slate-400">
          Selecciona fechas para el reporte de auditoría.
        </p>
      )}
    </div>
  );
}
