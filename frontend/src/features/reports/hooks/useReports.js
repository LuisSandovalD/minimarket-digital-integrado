import api from "@/api/axios";
import { formatDateISO } from "@/utils/format";
import { useRef, useState } from "react";
import { getCompany } from "../../auth/services/session.service";

const REPORT_ENDPOINTS = {
  sales: {
    pdf: "/sale/reports/daily/pdf",
    excel: "/sale/reports/daily/excel",
  },

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

  const [downloading, setDownloading] = useState(false);

  const reportRef = useRef(null);

  const generateReport = () => {
    setActiveFilters({ ...filters });
  };

  const handleDownload = async ({ format }) => {
    if (!activeFilters) {
      alert("Primero genera el reporte.");
      return;
    }

    const company = getCompany();

    const params = {
      companyId: company?.id,
      startDate: activeFilters.startDate
        ? formatDateISO(activeFilters.startDate)
        : undefined,
      endDate: activeFilters.endDate
        ? formatDateISO(activeFilters.endDate)
        : undefined,
    };

    const endpoint = REPORT_ENDPOINTS[activeFilters.reportType]?.[format];

    if (!endpoint) {
      alert("Este reporte aún no tiene exportación.");
      return;
    }

    try {
      setDownloading(true);

      const response = await api.get(endpoint, {
        params,
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      const start = params.startDate || "inicio";
      const end = params.endDate || "fin";

      a.download = `reporte-${activeFilters.reportType}-${start}-${end}.${format === "pdf" ? "pdf" : "xlsx"}`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("No se pudo descargar el reporte.");
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = async () => {
    if (!reportRef.current) {
      window.print();
      return;
    }

    const html = reportRef.current.innerHTML;

    const popup = window.open("", "_blank", "width=900,height=700");

    if (!popup) {
      alert("Permite las ventanas emergentes.");
      return;
    }

    const style = await fetchPrintCss();

    popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>Reporte</title>
        <style>${style}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `);

    popup.document.close();

    setTimeout(() => {
      popup.focus();
      popup.print();
    }, 400);
  };

  async function fetchPrintCss() {
    try {
      const response = await fetch("/src/styles/print.css", {
        cache: "no-store",
      });

      if (response.ok) {
        return await response.text();
      }
    } catch { }

    return `
      table{
        width:100%;
        border-collapse:collapse;
      }

      th,td{
        border:1px solid #ccc;
        padding:6px;
      }

      body{
        font-family:Arial;
      }
    `;
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
