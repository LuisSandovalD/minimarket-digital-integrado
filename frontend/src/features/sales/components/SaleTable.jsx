// ========================================
// features/sales/components/SaleTable.jsx
// ========================================

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
  UserCheck, // 🚀 Icono para la columna Vendedor
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { Table, TFooter, THead } from "@/components/data-display";

import SaleActions from "./SaleActions";

export default function SaleTable({
  sales = [],
  onView,
  onPayment,
  onCancel,
  onReturn,
  onInvoice,
  onWhatsAppShare,
  onPrint,
  readOnly = false,
  page = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage,
}) {
  const safeSales = Array.isArray(sales) ? sales : [];

  // ========================================
  // CONFIGURACIÓN DINÁMICA DE COLUMNAS
  // ========================================
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
    // 🌟 NUEVA COLUMNA INTEGRADA: Vendedor / Atendido por
    {
      key: "seller",
      label: (
        <div className="flex items-center gap-2">
          <UserCheck size={14} />
          Atendido por
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

  const getStatusDetails = (status) => {
    const normalizedStatus = String(status || "")
      .toUpperCase()
      .trim();
    switch (normalizedStatus) {
      case "DRAFT":
        return {
          label: "Borrador",
          styles:
            "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        };
      case "PENDING":
        return {
          label: "Pendiente",
          styles:
            "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
        };
      case "COMPLETED":
        return {
          label: "Completado",
          styles:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
        };
      case "CANCELLED":
        return {
          label: "Cancelado",
          styles:
            "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800/50",
        };
      case "RETURNED":
        return {
          label: "Devuelto",
          styles:
            "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50",
        };
      default:
        return {
          label: status || "Desconocido",
          styles:
            "bg-slate-100 text-slate-600 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
        };
    }
  };

  return (
    <div className="space-y-5">
      {!readOnly && (
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Historial de Ventas
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gestiona comprobantes, clientes y cobros de caja.
          </p>
        </div>
      )}

      <Table>
        <THead columns={columns} />

        <tbody>
          {safeSales.length > 0 ? (
            safeSales.map((sale, index) => {
              if (!sale) return null;

              const rowKey = sale.id || `sale-${index}`;
              const statusInfo = getStatusDetails(sale.status);
              const totalAmount = Number(sale.total || 0);
              const discountAmount = Number(sale.discount || 0);
              const subtotalAmount =
                sale.subtotal !== undefined
                  ? Number(sale.subtotal || 0)
                  : totalAmount / 1.18;

              const customerName =
                sale.customer?.name || sale.customerName || "Cliente General";

              // 🌟 Extracción segura del vendedor (soporta fallback .seller o .user)
              const sellerData = sale.seller || sale.user;
              const sellerName = sellerData?.name || "No asignado";
              const sellerRole = sellerData?.role || "EMPLOYEE";
              const sellerAvatar = sellerData?.avatar;
              const sellerOnline = sellerData?.isOnline || false;

              const totalProducts = Array.isArray(sale.details)
                ? sale.details.length
                : Array.isArray(sale.SaleDetails)
                  ? sale.SaleDetails.length
                  : 0;

              return (
                <tr
                  key={rowKey}
                  className="border-b border-slate-200/50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                >
                  {/* IDENTIFICADOR DE VENTA */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <ShoppingCart size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">
                        {sale.saleNumber || `N° ${sale.id}`}
                      </span>
                    </div>
                  </td>

                  {/* CLIENTE */}
                  <td className="px-6 py-4">
                    <p
                      className="text-sm font-medium text-slate-900 dark:text-white max-w-[180px] truncate"
                      title={customerName}
                    >
                      {customerName}
                    </p>
                  </td>

                  {/* 🌟 NUEVA CELDA: DETALLE DEL VENDEDOR CON AVATAR E INDICADOR ONLINE */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs border border-white dark:border-slate-800">
                        {sellerAvatar ? (
                          <img
                            src={sellerAvatar}
                            alt={sellerName}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          sellerName.charAt(0).toUpperCase()
                        )}
                        {/* Indicador de Conexión en tiempo real */}
                        <span
                          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-slate-950 ${sellerOnline ? "bg-emerald-500" : "bg-slate-400"}`}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                          {sellerName.split(" ")[0]}{" "}
                          {sellerName.split(" ")[1] || ""}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono tracking-wider">
                          {sellerRole}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* SUBTOTAL */}
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {formatPrice(subtotalAmount)}
                  </td>

                  {/* DESCUENTO */}
                  <td className="px-6 py-4 text-sm">
                    {discountAmount > 0 ? (
                      <span className="font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-md">
                        -{formatPrice(discountAmount)}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600">
                        {formatPrice(0)}
                      </span>
                    )}
                  </td>

                  {/* TOTAL NETO */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/50">
                      {formatPrice(totalAmount)}
                    </span>
                  </td>

                  {/* CANTIDAD DE PRODUCTOS */}
                  <td className="px-6 py-4">
                    {readOnly ? (
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {totalProducts} Prod.
                      </span>
                    ) : (
                      <ModernButton
                        type="button"
                        icon={Eye}
                        variant="secondary"
                        text={`${totalProducts} Prod.`}
                        onClick={() => onView?.(sale)}
                      />
                    )}
                  </td>

                  {/* BADGE DE ESTADO */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium shadow-sm border ${statusInfo.styles}`}
                    >
                      {statusInfo.label}
                    </span>
                  </td>

                  {/* ACCIONES DE CONTROL */}
                  {!readOnly && (
                    <td className="px-6 py-4">
                      <SaleActions
                        sale={sale}
                        onView={onView}
                        onPayment={onPayment}
                        onInvoice={onInvoice}
                        onCancel={onCancel}
                        onCreditNote={onReturn}
                        onWhatsAppShare={onWhatsAppShare}
                        onPrint={onPrint}
                      />
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={readOnly ? 8 : 9} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <ShoppingCart className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    No hay ventas registradas
                  </h3>
                </div>
              </td>
            </tr>
          )}
        </tbody>

        {safeSales.length > 0 && (
          <TFooter
            page={page}
            totalPages={totalPages}
            onPrev={onPrevPage}
            onNext={onNextPage}
          />
        )}
      </Table>
    </div>
  );
}
