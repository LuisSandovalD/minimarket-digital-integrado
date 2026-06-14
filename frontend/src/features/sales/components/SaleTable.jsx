import {
  Activity,
  BadgeDollarSign,
  DollarSign,
  Eye,
  Package,
  Receipt,
  Settings2,
  ShoppingCart,
  User,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { Table, THead } from "@/components/data-display";

import SaleActions from "./SaleActions";

export default function SalesTable({
  sales = [],
  onView,
  onPayment,
  onCancel,
  onReturn,
  onPrint,
  readOnly = false,
}) {
  const columns = [
    {
      key: "number",
      label: (
        <div className="flex items-center gap-2">
          <Receipt size={14} />
          Venta
        </div>
      ),
    },
    {
      key: "customer",
      label: (
        <div className="flex items-center gap-2">
          <User size={14} />
          Cliente
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
      key: "total",
      label: (
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Total
        </div>
      ),
    },
    {
      key: "products",
      label: (
        <div className="flex items-center gap-2">
          <Package size={14} />
          Productos
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
  ];

  if (!readOnly) {
    columns.push({
      key: "actions",
      label: (
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          Acciones
        </div>
      ),
    });
  }

  const formatPrice = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));

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
      {!readOnly && (
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Ventas
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Gestiona comprobantes, clientes y movimientos de venta.
          </p>
        </div>
      )}

      <Table>
        <THead columns={columns} />

        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr
                key={sale.id}
                className="
                  border-b
                  border-slate-200/50
                  dark:border-slate-800
                  hover:bg-slate-50
                  dark:hover:bg-slate-900/40
                "
              >
                {/* Venta */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      <ShoppingCart size={18} className="text-slate-500" />
                    </div>

                    <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                      {sale.saleNumber}
                    </h3>
                  </div>
                </td>

                {/* Cliente */}
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {sale.customer?.name || "Cliente General"}
                  </p>
                </td>

                {/* Subtotal */}
                <td className="px-6 py-5 text-sm">
                  {formatPrice(sale.subtotal)}
                </td>

                {/* Descuento */}
                <td className="px-6 py-5 text-sm">
                  {formatPrice(sale.discount)}
                </td>

                {/* Total */}
                <td className="px-6 py-5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {formatPrice(sale.total)}
                  </span>
                </td>

                {/* Productos */}
                <td className="px-6 py-5">
                  {readOnly ? (
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {sale.details?.length || 0} Productos
                    </span>
                  ) : (
                    <ModernButton
                      type="button"
                      icon={Eye}
                      variant="secondary"
                      text={`${sale.details?.length || 0} Productos`}
                      onClick={() => onView?.(sale)}
                    />
                  )}
                </td>

                {/* Estado */}
                <td className="px-6 py-5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      rounded-xl
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${getStatusStyles(sale.status)}
                    `}
                  >
                    {sale.status}
                  </span>
                </td>

                {/* Acciones */}
                {!readOnly && (
                  <td className="px-6 py-5">
                    <SaleActions
                      sale={sale}
                      onView={onView}
                      onPayment={onPayment}
                      onCancel={onCancel}
                      onReturn={onReturn}
                      onPrint={onPrint}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={readOnly ? 7 : 8} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <ShoppingCart className="h-8 w-8 text-slate-400" />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    No hay ventas
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Empieza registrando tu primera venta.
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
