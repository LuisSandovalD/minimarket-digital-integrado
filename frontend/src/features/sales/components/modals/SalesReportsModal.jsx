// ========================================
// features/sales/components/SalesReportsModal.jsx
// ========================================
import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { BarChart3, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import {
    downloadDailySalesExcel,
    downloadDailySalesPDF,
    downloadTopProductsExcel,
    downloadTopProductsPDF,
} from "../../services/sale.service";

export default function SalesReportsModal({ open, onClose, companyId }) {
  const [dates, setDates] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);

  const triggerDownload = async (apiCall, filename) => {
    try {
      setLoading(true);
      const blob = await apiCall({ companyId, ...dates });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el reporte financiero:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="md">
      <HeaderModal
        title="Reportes Gerenciales y de Caja"
        subtitle="Descarga consolidada de rendimiento local"
        icon={BarChart3}
        onClose={onClose}
      />

      <div className="p-4 space-y-5 text-xs text-slate-600 dark:text-slate-300">
        {/* Filtro de Rango para Cierre de Caja */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border dark:border-slate-800 space-y-2">
          <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block">
            Rango del Cierre Diario
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">
                Desde:
              </label>
              <input
                type="date"
                value={dates.startDate}
                onChange={(e) =>
                  setDates((p) => ({ ...p, startDate: e.target.value }))
                }
                className="w-full bg-white dark:bg-slate-950 border dark:border-slate-800 rounded-lg p-2 font-mono text-xs text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">
                Hasta:
              </label>
              <input
                type="date"
                value={dates.endDate}
                onChange={(e) =>
                  setDates((p) => ({ ...p, endDate: e.target.value }))
                }
                className="w-full bg-white dark:bg-slate-950 border dark:border-slate-800 rounded-lg p-2 font-mono text-xs text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Sección 1: Cierre Diario */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200">
            1. Reporte de Ventas Diarias
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <ModernButton
              fullWidth
              disabled={loading}
              icon={FileText}
              variant="outline"
              text="Cierre Diario (PDF)"
              className="justify-start text-red-600 dark:text-red-400"
              onClick={() =>
                triggerDownload(
                  downloadDailySalesPDF,
                  `Cierre_Ventas_${dates.startDate}.pdf`,
                )
              }
            />
            <ModernButton
              fullWidth
              disabled={loading}
              icon={FileSpreadsheet}
              variant="outline"
              text="Cierre Diario (Excel)"
              className="justify-start text-emerald-600 dark:text-emerald-400"
              onClick={() =>
                triggerDownload(
                  downloadDailySalesExcel,
                  `Cierre_Ventas_${dates.startDate}.xlsx`,
                )
              }
            />
          </div>
        </div>

        {/* Sección 2: Top Productos */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200">
            2. Ránking de Rotación de Inventario (Top Productos)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <ModernButton
              fullWidth
              disabled={loading}
              icon={FileText}
              variant="outline"
              text="Top Productos (PDF)"
              className="justify-start text-red-600 dark:text-red-400"
              onClick={() =>
                triggerDownload(
                  downloadTopProductsPDF,
                  "Top_Productos_Rotacion.pdf",
                )
              }
            />
            <ModernButton
              fullWidth
              disabled={loading}
              icon={FileSpreadsheet}
              variant="outline"
              text="Top Productos (Excel)"
              className="justify-start text-emerald-600 dark:text-emerald-400"
              onClick={() =>
                triggerDownload(
                  downloadTopProductsExcel,
                  "Top_Productos_Rotacion.xlsx",
                )
              }
            />
          </div>
        </div>
      </div>

      <FooterModal>
        <div className="flex justify-end">
          <ModernButton text="Cerrar Panel" onClick={onClose} />
        </div>
      </FooterModal>
    </Modal>
  );
}
