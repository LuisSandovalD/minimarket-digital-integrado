import { formatDateISO } from "@/utils/format";
import { useRef, useState } from "react";
import api from "../../../api/axios";
import { getCompany } from "../../auth/services/session.service";

export default function useReports() {
    const [filters, setFilters] = useState({
        reportType: "sales",
        startDate: "",
        endDate: "",
    });
    const [activeFilters, setActiveFilters] = useState(null);
    const reportRef = useRef(null);
    const [downloading, setDownloading] = useState(false);

    const generateReport = () => {
        setActiveFilters({ ...filters });
    };

    const handleDownload = async ({ format }) => {
        // Prefer server-side exports (PDF/XLSX) when available
        const useFilters = activeFilters || filters;

        if (!activeFilters) {
            alert("Presiona 'Generar Reporte' antes de descargar.");
            return;
        }

        const company = getCompany();
        const params = {
            companyId: company?.id,
            startDate: useFilters.startDate ? formatDateISO(useFilters.startDate) : undefined,
            endDate: useFilters.endDate ? formatDateISO(useFilters.endDate) : undefined,
        };

        // Map report type to backend path
        const reportType = useFilters.reportType || "sales";

        // resolve endpoint per report type and format
        function resolveEndpoint(type, fmt) {
            if (type === 'sales') {
                return fmt === 'excel' ? `/sale/reports/daily/excel` : `/sale/reports/daily/pdf`;
            }
            if (type === 'top-products') {
                return fmt === 'excel' ? `/sale/reports/top-products/excel` : `/sale/reports/top-products/pdf`;
            }
            if (type === 'purchases') {
                return fmt === 'excel' ? `/purchase/reports/daily/excel` : `/purchase/reports/daily/pdf`;
            }
            if (type === 'inventory') {
                return fmt === 'excel' ? `/inventory/reports/inventory/excel` : `/inventory/reports/inventory/pdf`;
            }
            if (type === 'customers') {
                return fmt === 'excel' ? `/customer/reports/customers/excel` : `/customer/reports/customers/pdf`;
            }
            if (type === 'suppliers') {
                return fmt === 'excel' ? `/supplier/reports/suppliers/excel` : `/supplier/reports/suppliers/pdf`;
            }
            if (type === 'payments') {
                return fmt === 'excel' ? `/payments/reports/payments/excel` : `/payments/reports/payments/pdf`;
            }
            if (type === 'audit' || type === 'activity') {
                return fmt === 'excel' ? `/dashboard/reports/activity/excel` : `/dashboard/reports/activity/pdf`;
            }
            // not implemented on backend yet
            return null;
        }

        try {
            setDownloading(true);
            if (format === "excel") {
                const endpoint = resolveEndpoint(reportType, 'excel');
                if (!endpoint) {
                    alert('Exportación a Excel no disponible para el tipo de reporte seleccionado.');
                    return;
                }

                const response = await api.get(endpoint, {
                    params,
                    responseType: "blob",
                });

                const blob = new Blob([response.data], {
                    type: response.headers["content-type"],
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                // use readable dates for filename when available
                const startLabel = useFilters.startDate ? formatDateISO(useFilters.startDate) : "sin-fecha";
                const endLabel = useFilters.endDate ? formatDateISO(useFilters.endDate) : null;
                const rangeLabel = endLabel ? `${startLabel}_to_${endLabel}` : startLabel;
                a.download = `reporte-${reportType}-${rangeLabel}.xlsx`;
                a.click();
                URL.revokeObjectURL(url);
                return;
            }

            if (format === "pdf") {
                const endpoint = resolveEndpoint(reportType, 'pdf');
                if (!endpoint) {
                    alert('Exportación a PDF no disponible para el tipo de reporte seleccionado.');
                    return;
                }

                const response = await api.get(endpoint, {
                    params,
                    responseType: "blob",
                });

                const blob = new Blob([response.data], {
                    type: response.headers["content-type"],
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                const startLabel = useFilters.startDate ? formatDateISO(useFilters.startDate) : "sin-fecha";
                const endLabel = useFilters.endDate ? formatDateISO(useFilters.endDate) : null;
                const rangeLabel = endLabel ? `${startLabel}_to_${endLabel}` : startLabel;
                a.download = `reporte-${reportType}-${rangeLabel}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
                return;
            }

            // Fallback: print current view (open printable content only)
            if (format === "print") {
                if (reportRef.current) {
                    const html = reportRef.current.innerHTML;
                    const w = window.open("", "_blank", "width=900,height=700");
                    if (!w) {
                        alert(
                            "No se pudo abrir la ventana de impresión. Revisa el bloqueador de ventanas emergentes.",
                        );
                        return;
                    }
                    const style = `
                              ${await fetchPrintCss()}
                            `;
                    w.document.write(
                        `<!doctype html><html><head><title>Reporte</title><meta charset="utf-8"><style>${style}</style></head><body>${html}</body></html>`,
                    );
                    w.document.close();
                    setTimeout(() => {
                        w.focus();
                        w.print();
                        // optional: close after print
                        // w.close();
                    }, 500);
                } else {
                    window.print();
                }
            }
        } catch (err) {
            console.error(err);
            alert("Error descargando el reporte.");
        } finally {
            setDownloading(false);
        }
    };

    const handlePrint = async () => {
        if (reportRef.current) {
            const html = reportRef.current.innerHTML;
            const w = window.open("", "_blank", "width=900,height=700");
            if (!w) {
                alert(
                    "No se pudo abrir la ventana de impresión. Revisa el bloqueador de ventanas emergentes.",
                );
                return;
            }
            const style = `
              ${await fetchPrintCss()}
            `;
            w.document.write(
                `<!doctype html><html><head><title>Reporte</title><meta charset="utf-8"><style>${style}</style></head><body>${html}</body></html>`,
            );
            w.document.close();
            setTimeout(() => {
                w.focus();
                w.print();
                // optional: w.close();
            }, 500);
        } else {
            window.print();
        }
    };

    // helper to retrieve print.css content
    async function fetchPrintCss() {
        try {
            const resp = await fetch("/src/styles/print.css", { cache: "no-store" });
            if (resp.ok) return await resp.text();
        } catch (e) {
            // fallback to minimal styles
        }
        return `@media print { body * { visibility: hidden !important } .printable, .printable * { visibility: visible !important } .printable { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; background: white !important; color: #000 !important } table { border-collapse: collapse !important; width: 100% !important; font-size: 12px !important } th, td { border: 1px solid #ddd !important; padding: 6px !important } tr, td, th { page-break-inside: avoid !important } }`;
    }

    return {
        filters,
        setFilters,
        activeFilters,
        reportRef,
        generateReport,
        handleDownload,
        handlePrint,
        downloading,
    };
}
