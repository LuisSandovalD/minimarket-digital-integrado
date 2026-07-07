// features/analytics/pages/TopProductsReportPage.jsx
import { SkeletonTable } from "@/components/skeletons";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getTopProductsReport } from "../services/report.service"; // <-- Cambiado a tu servicio unificado

export default function TopProductsReportPage() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        const company = getCompany();
        if (!company?.id)
          throw new Error("No se encontró el ID de la empresa.");

        // Usamos el servicio binario que acabamos de agregar
        const blobData = await getTopProductsReport(company.id);

        if (!blobData || blobData.size === 0) throw new Error("PDF vacío.");

        const url = URL.createObjectURL(
          new Blob([blobData], { type: "application/pdf" }),
        );
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch (err) {
        console.error(err);
        setError("Error al generar el reporte de productos top.");
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
  }, []);

  if (loading) return <SkeletonTable />;
  if (error)
    return <div className="p-6 bg-red-50 text-red-800 rounded-xl">{error}</div>;

  return (
    <div className="w-full h-[750px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}#toolbar=1`}
          className="w-full h-full border-none"
          title="Top Productos"
        />
      ) : (
        <p className="p-6 text-slate-400">Cargando visor...</p>
      )}
    </div>
  );
}
