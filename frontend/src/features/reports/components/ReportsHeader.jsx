import { Calendar, Download, FileBarChart2, FileText } from "lucide-react";

import { PageHeader } from "@/components/data-display/";

export default function ReportsHeader({
  totalReports = 0,
  totalExports = 0,
  scheduledReports = 0,
  onGenerate,
}) {
  return (
    <PageHeader
      icon={FileText}
      badge="Reportes"
      title="Centro de Reportes"
      description="Genera, visualiza y exporta reportes de ventas, compras, inventario, clientes y más."
      stats={[
        { icon: FileText, label: "Reportes", value: totalReports },
        { icon: Download, label: "Exportaciones", value: totalExports },
        { icon: Calendar, label: "Programados", value: scheduledReports },
      ]}
      action={{
        onClick: onGenerate,
        label: "Generar Reporte",
        icon: FileBarChart2,
      }}
    />
  );
}
