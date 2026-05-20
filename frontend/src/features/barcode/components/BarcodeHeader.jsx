// ========================================
// components/BarcodeHeader.jsx
// ========================================

import { Barcode, CheckSquare, FileText, Printer } from "lucide-react";

import { ModernButton } from "@/components/buttons/";
import { PageHeader } from "@/components/data-display";

export default function BarcodeHeader({
  products,

  selectedProducts,

  onSelectAll,

  onExportPDF,

  onPrint,
}) {
  return (
    <div className="space-y-5">
      {/* MAIN HEADER */}

      <PageHeader
        icon={Barcode}
        badge="Sistema de etiquetado"
        title="Gestión de códigos de barras"
        description="
          Genera, imprime y exporta
          etiquetas profesionales para
          tus productos y automatiza
          el escaneo en ventas.
        "
        action={{
          label: "Seleccionar todo",

          icon: CheckSquare,

          onClick: onSelectAll,
        }}
        headerActions={
          <>
            <ModernButton
              onClick={onExportPDF}
              icon={FileText}
              text="Exportar PDF"
            />
            <ModernButton onClick={onPrint} icon={Printer} text="Imprimir" />
          </>
        }
        stats={[
          {
            icon: Barcode,

            label: "Productos",

            value: `${products.length} registrados`,
          },

          {
            icon: CheckSquare,

            label: "Seleccionados",

            value: `${selectedProducts.length} activos`,
          },

          {
            icon: FileText,

            label: "Exportación",

            value: "PDF profesional",
          },
        ]}
      />
    </div>
  );
}
