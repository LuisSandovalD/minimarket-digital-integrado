import { CalendarDays, Download, FileBarChart2, FileSpreadsheet, Filter, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { Input, Select } from "@/components/forms";

export default function ReportsFilters({ filters, onChange, onDownload, onPrint, activeFilters, downloading }) {
  const { reportType, startDate, endDate } = filters;
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const menuRef = useRef(null);

  // Determina si los botones de acción deben estar habilitados
  const isActionDisabled = !reportType || !activeFilters;

  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  const handleDownload = (format) => {
    setShowDownloadMenu(false);
    onDownload?.({ ...filters, format });
  };

  const handlePrint = () => {
    if (isActionDisabled) return;
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
    <div className="relative overflow-visible rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none p-6 md:p-8">
      {/* Acento superior dinámico: Cambia a verde/azul cuando hay filtros activos */}
      <div
        className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/40 dark:via-blue-400/30 to-transparent transition-all duration-500 ${activeFilters ? "via-emerald-500/50 dark:via-emerald-400/40" : ""}`}
      />

      {/* Header de la sección de filtros */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg transition-colors ${activeFilters ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" : "bg-slate-50 dark:bg-white/[0.04] text-slate-400"}`}
          >
            <Filter className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Parámetros del Reporte</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Define los criterios para la extracción de datos
            </p>
          </div>
        </div>

        {/* Badge indicador de estado */}
        {activeFilters && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Filtros Aplicados
          </span>
        )}
      </div>

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
              { value: "daily-purchases", label: "Compras diarias" },
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
      <div className="my-6 h-px bg-slate-100 dark:bg-white/[0.06]" />

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-slate-400 dark:text-slate-500 order-2 sm:order-1">
          * Los formatos PDF mantienen los estilos de impresión corporativos.
        </p>

        <div className="flex items-center justify-end gap-3 order-1 sm:order-2 w-full sm:w-auto">
          {/* Botón Imprimir protegido contra estados vacíos */}
          <ModernButton
            variant="secondary"
            icon={Printer}
            text="Imprimir"
            onClick={handlePrint}
            disabled={isActionDisabled}
            className={`w-full sm:w-auto transition-opacity ${isActionDisabled ? "opacity-40 cursor-not-allowed" : "opacity-100"}`}
          />

          <div ref={menuRef} className="relative w-full sm:w-auto">
            {/* El botón de descarga pasa a ser primario cuando está listo */}
            <ModernButton
              variant={isActionDisabled ? "secondary" : "primary"}
              icon={Download}
              text={downloading ? "Descargando..." : "Exportar Datos"}
              onClick={() => setShowDownloadMenu((prev) => !prev)}
              disabled={isActionDisabled || downloading}
              loading={downloading}
              className="w-full sm:w-auto shadow-sm"
            />

            {showDownloadMenu && (
              <div
                className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900 shadow-2xl shadow-slate-300/40 dark:shadow-black/50"
                style={{ zIndex: 9999 }}
              >
                {/* Acento superior del dropdown */}
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

                <button
                  type="button"
                  onClick={() => handleDownload("excel")}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Microsoft Excel</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">.xlsx (Datos planos)</p>
                  </div>
                </button>

                <div className="mx-4 h-px bg-slate-100 dark:bg-white/[0.06]" />

                <button
                  type="button"
                  onClick={() => handleDownload("pdf")}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20 group-hover:scale-105 transition-transform">
                    <FileBarChart2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Documento PDF</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">.pdf (Listo para archivar)</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
