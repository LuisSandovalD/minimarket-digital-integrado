import {
  CalendarDays,
  Download,
  FileBarChart2,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { Input, Select } from "@/components/forms";

export default function ReportsFilters({
  filters,
  onChange,
  onDownload,
  onPrint,
  activeFilters,
  downloading,
}) {
  const { reportType, startDate, endDate } = filters;
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const menuRef = useRef(null);

  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  const handleDownload = (format) => {
    setShowDownloadMenu(false);
    onDownload?.({ ...filters, format });
  };

  const handlePrint = () => {
    onPrint?.(filters);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative overflow-visible rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none p-8">
      {/* Acento superior */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/40 dark:via-blue-400/30 to-transparent" />

      <div className="grid gap-6 sm:grid-cols-3 sm:items-end">
        {/* Tipo de reporte */}
        <div className="sm:col-span-1">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Tipo de reporte
          </p>
          <Select
            name="reportType"
            value={reportType}
            onChange={set("reportType")}
            placeholder="Seleccione un reporte"
            options={[
              { value: "sales", label: "Ventas" },
              { value: "top-products", label: "Top productos" },
              { value: "purchases", label: "Compras" },
              { value: "inventory", label: "Inventario" },
              { value: "customers", label: "Clientes" },
              { value: "suppliers", label: "Proveedores" },
              { value: "payments", label: "Pagos" },
              { value: "audit", label: "Auditoría" },
            ]}
          />
        </div>

        {/* Fecha inicio */}
        <div>
          <label className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <CalendarDays className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
            Fecha inicio
          </label>
          <Input type="date" value={startDate} onChange={set("startDate")} />
        </div>

        {/* Fecha fin */}
        <div>
          <label className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            Fecha fin
          </label>
          <Input type="date" value={endDate} onChange={set("endDate")} />
        </div>
      </div>

      {/* Divider */}
      <div className="my-7 h-px bg-slate-100 dark:bg-white/[0.06]" />

      {/* Acciones */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ModernButton
            variant="secondary"
            icon={Printer}
            text="Imprimir"
            onClick={handlePrint}
          />

          <div ref={menuRef} className="relative">
            <ModernButton
              variant="secondary"
              icon={Download}
              text={downloading ? "Descargando..." : "Descargar"}
              onClick={() => setShowDownloadMenu((prev) => !prev)}
              disabled={!activeFilters || downloading}
              loading={downloading}
            />

            {showDownloadMenu && (
              <div
                className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-300/30 dark:shadow-black/40"
                style={{ zIndex: 9999 }}
              >
                {/* Acento superior del dropdown */}
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

                <button
                  type="button"
                  onClick={() => handleDownload("excel")}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20">
                    <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Excel</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      .xlsx — Hoja de cálculo
                    </p>
                  </div>
                </button>

                <div className="mx-4 h-px bg-slate-100 dark:bg-white/[0.06]" />

                <button
                  type="button"
                  onClick={() => handleDownload("pdf")}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200/60 dark:border-red-500/20">
                    <FileBarChart2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">PDF</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      .pdf — Documento
                    </p>
                  </div>
                </button>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200/60 dark:via-white/[0.04] to-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
