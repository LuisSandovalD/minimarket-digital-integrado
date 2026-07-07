// ========================================
// features/analytics/pages/DailyPurchasesReportPage.jsx
// ========================================

import { SkeletonTable } from "@/components/skeletons";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getDailyPurchasesReport } from "../services/report.service";

// Opcional: Si tienes un componente genérico de Tabla, puedes importarlo.
// Si no, aquí abajo se genera una estructura de tabla limpia con Tailwind CSS.

export default function DailyPurchasesReportPage({ filters }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        if (filters && filters.startDate && filters.endDate) {
          const company = getCompany();
          const data = await getDailyPurchasesReport(
            company?.id,
            filters.startDate,
            filters.endDate,
          );
          // Guardamos el array de compras que viene desde data.data
          setItems(data || []);
        }
      } catch (err) {
        console.error("Error al obtener el reporte de compras diarias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [filters]);

  if (loading) return <SkeletonTable />;

  // Función auxiliar para formatear la moneda local (S/.)
  const formatMoney = (value) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));
  };

  return (
    <div className="space-y-6">
      {/* Encabezado del reporte */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Reporte de Compras Diarias
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Visualiza el desglose y totales de las compras realizadas en el rango
          de fechas seleccionado.
        </p>
      </div>

      {/* Tabla de Datos */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Proveedor</th>
              <th className="px-6 py-4">Comprobante</th>
              <th className="px-6 py-4">Método de Pago</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {items.length > 0 ? (
              items.map((purchase) => (
                <tr
                  key={purchase.id || purchase.code}
                  className="text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {purchase.date || "-"}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {purchase.supplierName ||
                      purchase.supplier ||
                      "Proveedor Desconocido"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {purchase.documentNumber || purchase.invoiceNumber || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      {purchase.paymentMethod || "Efectivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-blue-600 dark:text-blue-400">
                    {formatMoney(purchase.total || purchase.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                      <ShoppingBag className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      No hay compras registradas
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      No se encontraron movimientos para el rango de fechas
                      seleccionado.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
