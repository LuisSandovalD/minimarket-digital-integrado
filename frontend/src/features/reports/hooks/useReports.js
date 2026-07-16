import api from "@/api/axios";
import { formatDateISO } from "@/utils/format";
import { useRef, useState } from "react";
import { getCompany } from "../../auth/services/session.service";

const REPORT_ENDPOINTS = {
  sales: { pdf: "/sale/reports/daily/pdf", excel: "/sale/reports/daily/excel" },
  "top-products": {
    pdf: "/sale/reports/top-products/pdf",
    excel: "/sale/reports/top-products/excel",
  },
  purchases: {
    pdf: "/purchase/reports/daily/pdf",
    excel: "/purchase/reports/daily/excel",
  },
  inventory: {
    pdf: "/inventory/reports/inventory/pdf",
    excel: "/inventory/reports/inventory/excel",
  },
  customers: {
    pdf: "/customer/reports/customers/pdf",
    excel: "/customer/reports/customers/excel",
  },
  suppliers: {
    pdf: "/supplier/reports/suppliers/pdf",
    excel: "/supplier/reports/suppliers/excel",
  },
  payments: {
    pdf: "/payments/reports/payments/pdf",
    excel: "/payments/reports/payments/excel",
  },
  activity: {
    pdf: "/dashboard/reports/activity/pdf",
    excel: "/dashboard/reports/activity/excel",
  },
  audit: {
    pdf: "/dashboard/reports/activity/pdf",
    excel: "/dashboard/reports/activity/excel",
  },
};

export default function useReports() {
  const [filters, setFilters] = useState({
    reportType: "sales",
    startDate: "",
    endDate: "",
  });

  const [activeFilters, setActiveFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // <-- Controla el Skeleton de la página
  const [downloading, setDownloading] = useState(false); // <-- Controla el botón de descarga
  const reportRef = useRef(null);

  // Genera el reporte simulando la latencia de carga para disparar los skeletons
  const generateReport = async () => {
    if (!filters.reportType) return;

    try {
      setIsLoading(true);
      // Simulamos un delay de 600ms para que el skeleton haga una transición suave y limpie la cache de pantalla
      await new Promise((resolve) => setTimeout(resolve, 600));
      setActiveFilters({ ...filters });
    } catch (error) {
      console.error("Error al estructurar filtros:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async ({ format }) => {
    if (!activeFilters) return;

    const company = getCompany();
    const params = {
      companyId: company?.id,
      startDate: activeFilters.startDate ? formatDateISO(activeFilters.startDate) : undefined,
      endDate: activeFilters.endDate ? formatDateISO(activeFilters.endDate) : undefined,
    };

    const endpoint = REPORT_ENDPOINTS[activeFilters.reportType]?.[format];

    if (!endpoint) {
      console.warn("Este reporte aún no tiene exportación asignada.");
      return;
    }

    try {
      setDownloading(true);

      const response = await api.get(endpoint, {
        params,
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const start = params.startDate || "inicio";
      const end = params.endDate || "fin";
      a.download = `reporte-${activeFilters.reportType}-${start}-${end}.${format === "pdf" ? "pdf" : "xlsx"}`;

      document.body.appendChild(a);
      a.click();

      // Limpieza del DOM diferida para evitar fallos en ciertos navegadores
      setTimeout(() => {
        a.remove();
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error descargando el archivo:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!reportRef.current) {
      window.print();
      return;
    }

    const html = reportRef.current.innerHTML;
    const popup = window.open("", "_blank", "width=1024,height=768");

    if (!popup) {
      console.error("El navegador bloqueó la ventana emergente de impresión.");
      return;
    }

    // Estilos base inline infalibles para garantizar la consistencia en el popup de impresión
    const printStyles = `
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; padding: 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
      th { bg-color: #f8fafc; font-weight: 600; text-align: left; }
      th, td { border: 1px solid #e2e8f0; padding: 8px 12px; }
      .text-right { text-align: right; }
      @media print {
        body { padding: 0; }
        button { display: none; }
      }
    `;

    popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>Imprimir Reporte — ${activeFilters?.reportType || ""}</title>
        <style>${printStyles}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `);

    popup.document.close();

    // Pequeño delay para asegurar que los elementos del DOM del popup se hayan renderizado por completo
    popup.onload = () => {
      popup.focus();
      popup.print();
    };

    // Fallback si onload no se dispara en ciertos navegadores basados en WebKit
    setTimeout(() => {
      if (popup) {
        popup.focus();
        popup.print();
      }
    }, 300);
  };

  return {
    filters,
    setFilters,
    activeFilters,
    reportRef,
    generateReport,
    handleDownload,
    handlePrint,
    isLoading, // <-- Ahora tu ReportsPage recibirá el estado real de la carga
    downloading,
  };
}
