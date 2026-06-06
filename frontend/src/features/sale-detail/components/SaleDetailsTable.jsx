// ========================================
// features/sale-detail/components/SaleDetailTable.jsx
// ========================================

import {
  Activity,
  BadgeDollarSign,
  DollarSign,
  Eye,
  Package,
  Percent,
  Receipt,
  Settings2,
  ShoppingCart,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { Table, THead } from "@/components/data-display";

export default function SaleDetailTable({ details = [], onView }) {
  // ========================================
  // COLUMNS
  // ========================================

  const columns = [
    {
      key: "sale",
      label: (
        <div className="flex items-center gap-2">
          <Receipt size={14} />
          Venta
        </div>
      ),
    },
    {
      key: "product",
      label: (
        <div className="flex items-center gap-2">
          <Package size={14} />
          Producto
        </div>
      ),
    },
    {
      key: "quantity",
      label: (
        <div className="flex items-center gap-2">
          <ShoppingCart size={14} />
          Cantidad
        </div>
      ),
    },
    {
      key: "price",
      label: (
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Precio U.
        </div>
      ),
    },
    {
      key: "subtotal",
      label: (
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Subtotal
        </div>
      ),
    },
    {
      key: "discount",
      label: (
        <div className="flex items-center gap-2">
          <BadgeDollarSign size={14} />
          Descuento
        </div>
      ),
    },
    {
      key: "tax",
      label: (
        <div className="flex items-center gap-2">
          <Percent size={14} />
          {/* ✅ FIX: el IGV pertenece a la venta completa, no a la línea */}
          IGV (venta)
        </div>
      ),
    },
    {
      key: "total",
      label: (
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Total venta
        </div>
      ),
    },
    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
          <Activity size={14} />
          Estado
        </div>
      ),
    },
    {
      key: "actions",
      label: (
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          Acciones
        </div>
      ),
    },
  ];

  // ========================================
  // FORMAT MONEY
  // ========================================

  const formatMoney = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));

  // ========================================
  // STATUS COLOR
  // ========================================

  const getStatusStyles = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "CANCELLED":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Detalles de Ventas
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Historial de productos vendidos.
        </p>
      </div>

      <Table>
        <THead columns={columns} />

        <tbody>
          {details.length > 0 ? (
            details.map((detail) => (
              <tr
                key={detail.id}
                className="border-b border-slate-200/50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40"
              >
                {/* SALE */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Receipt size={18} className="text-slate-500" />
                    </div>
                    <span className="text-sm font-semibold">
                      {detail.sale?.saleNumber}
                    </span>
                  </div>
                </td>

                {/* PRODUCT */}
                <td className="px-6 py-5">{detail.product?.name}</td>

                {/* QUANTITY */}
                <td className="px-6 py-5">{detail.quantity}</td>

                {/* PRICE UNITARIO — dato del detalle */}
                <td className="px-6 py-5">{formatMoney(detail.price)}</td>

                {/* SUBTOTAL LÍNEA — dato del detalle */}
                <td className="px-6 py-5 font-semibold">
                  {formatMoney(detail.subtotal)}
                </td>

                {/* DESCUENTO LÍNEA — dato del detalle */}
                <td className="px-6 py-5">{formatMoney(detail.discount)}</td>

                {/* ✅ FIX: IGV de la venta completa, etiquetado correctamente */}
                <td className="px-6 py-5 text-slate-500">
                  {formatMoney(detail.sale?.tax || 0)}
                </td>

                {/* ✅ FIX: Total de la venta completa, antes no existía en la tabla */}
                <td className="px-6 py-5 font-semibold">
                  {formatMoney(detail.sale?.total || 0)}
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-xl px-3 py-1 text-xs font-semibold ${getStatusStyles(detail.sale?.status)}`}
                  >
                    {detail.sale?.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-5">
                  <ModernButton
                    text="Ver"
                    icon={Eye}
                    variant="secondary"
                    onClick={() => onView?.(detail)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center">
                  <Receipt size={40} className="mb-4 text-slate-400" />
                  <h3 className="text-sm font-semibold">
                    No hay detalles de venta
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    No existen registros disponibles.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
