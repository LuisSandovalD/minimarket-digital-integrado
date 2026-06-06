// ========================================
// features/sales/components/modals/SaleDetailModal.jsx
// ========================================

import {
  Banknote,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  Landmark,
  Package,
  Receipt,
  Smartphone,
  User,
  XCircle,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

// ─── helpers ─────────────────────────────────────────────────────────────────

const formatPrice = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    Number(value || 0),
  );

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── estado de la venta ───────────────────────────────────────────────────────

const STATUS_CONFIG = {
  COMPLETED: {
    label: "Completada",
    icon: CheckCircle,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
  },
  PENDING: {
    label: "Pendiente",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
  },
  CANCELLED: {
    label: "Cancelada",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
  },
};

// ─── método de pago ───────────────────────────────────────────────────────────

const PAYMENT_METHOD_CONFIG = {
  CASH: { label: "Efectivo", icon: Banknote },
  CARD: { label: "Tarjeta", icon: CreditCard },
  WALLET: { label: "Billetera digital", icon: Smartphone },
  TRANSFER: { label: "Transferencia", icon: Landmark },
};

// ─── tipo de venta ────────────────────────────────────────────────────────────

const SALE_TYPE_CONFIG = {
  CASH_SALE: {
    label: "Venta al contado",
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  },
  CREDIT_SALE: {
    label: "Venta a crédito",
    badge:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
  },
};

// ─── componente ──────────────────────────────────────────────────────────────

export default function SaleDetailModal({ open, onClose, sale }) {
  if (!open || !sale) return null;

  const statusCfg = STATUS_CONFIG[sale.status] ?? {
    label: sale.status ?? "-",
    icon: Clock,
    className:
      "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400",
  };
  const StatusIcon = statusCfg.icon;

  const saleTypeCfg = SALE_TYPE_CONFIG[sale.saleType] ?? null;
  const payments = sale.payments ?? [];

  return (
    <Modal open={open} onClose={onClose} size="full">
      <HeaderModal
        title={
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Receipt size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Detalle de Venta
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Código único:{" "}
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {sale.saleNumber}
                </span>
              </p>
            </div>
          </div>
        }
        onClose={onClose}
        subtitle=""
        customHeader
      />

      <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
        {/* ── ESTADO + TIPO DE VENTA ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Estado */}
          <div
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-semibold ${statusCfg.className}`}
          >
            <StatusIcon size={15} />
            {statusCfg.label}
          </div>

          {/* Tipo de venta */}
          {saleTypeCfg && (
            <span
              className={`inline-flex items-center rounded-xl px-3 py-1.5 text-sm font-semibold ${saleTypeCfg.badge}`}
            >
              {saleTypeCfg.label}
            </span>
          )}

          {/* Fecha de vencimiento crédito */}
          {sale.saleType === "CREDIT_SALE" && sale.creditDueDate && (
            <span className="text-xs text-slate-500">
              Vence:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {formatDate(sale.creditDueDate)}
              </span>
            </span>
          )}
        </div>

        {/* ── METADATA GENERAL Y CLIENTE ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Información General */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-900 dark:bg-slate-900/30">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FileText size={14} /> Información General
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha de emisión:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {formatDate(sale.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sucursal:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {sale.branch?.name || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vendedor:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {sale.seller?.name || "Sistema"}
                </span>
              </div>
            </div>
          </div>

          {/* Cliente */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-900 dark:bg-slate-900/30">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <User size={14} /> Cliente
            </h4>
            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">
                  Nombre o Razón Social
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {sale.customer?.name || "Cliente General"}
                </span>
              </div>
              {sale.customer?.documentNumber && (
                <div className="flex justify-between border-t border-slate-100/70 pt-2 dark:border-slate-800/60">
                  <span className="text-slate-500">
                    {sale.customer.documentType || "Documento"}:
                  </span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {sale.customer.documentNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── PAGOS REGISTRADOS ─────────────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Banknote size={14} /> Pagos registrados
            </h4>
          </div>

          {payments.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-400 italic">
              {sale.saleType === "CREDIT_SALE"
                ? "Sin abono inicial registrado."
                : "Sin pagos registrados."}
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50/50 dark:bg-slate-900/30">
                <tr>
                  <th className="px-4 py-2.5 text-left">Método</th>
                  <th className="px-4 py-2.5 text-right">Monto</th>
                  {payments.some((p) => p.reference) && (
                    <th className="px-4 py-2.5 text-right">Referencia</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                {payments.map((payment, i) => {
                  const cfg = PAYMENT_METHOD_CONFIG[payment.paymentMethod] ?? {
                    label: payment.paymentMethod,
                    icon: Banknote,
                  };
                  const PIcon = cfg.icon;
                  return (
                    <tr key={payment.id ?? i}>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <PIcon size={14} className="text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                        {formatPrice(payment.amount)}
                      </td>
                      {payments.some((p) => p.reference) && (
                        <td className="px-4 py-3 text-right font-mono text-xs text-slate-400">
                          {payment.reference || "-"}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* saldo pendiente si es crédito */}
          {sale.saleType === "CREDIT_SALE" && (
            <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center bg-amber-50/60 dark:bg-amber-950/20">
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                Saldo pendiente
              </span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                {formatPrice(
                  Math.max(
                    Number(sale.total || 0) -
                      payments.reduce((s, p) => s + Number(p.amount || 0), 0),
                    0,
                  ),
                )}
              </span>
            </div>
          )}
        </div>

        {/* ── PRODUCTOS ─────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Package size={14} /> Productos Incluidos
          </h4>
          <div className="overflow-hidden rounded-xl border border-slate-200/60 dark:border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Item / SKU</th>
                  <th className="px-4 py-3 text-center">Cant.</th>
                  <th className="px-4 py-3 text-right">P. Unit</th>
                  <th className="px-4 py-3 text-right">Desc.</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                {sale.details?.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10"
                  >
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {item.product?.name}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                        <span>{item.product?.sku || "Sin SKU"}</span>
                        {item.batch && (
                          <span className="inline-flex items-center rounded bg-amber-50 px-1.5 py-0.5 font-sans font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                            Lote: {item.batch.batchNumber}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center font-medium text-slate-700 dark:text-slate-300">
                      {item.quantity}{" "}
                      <span className="text-xs text-slate-400 font-normal">
                        {item.product?.unit?.abbreviation || "Und"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-slate-600 dark:text-slate-400">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-red-500">
                      {Number(item.discount) > 0
                        ? `-${formatPrice(item.discount)}`
                        : "-"}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {formatPrice(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── NOTAS ─────────────────────────────────────────────────────── */}
        {sale.notes && (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Notas Internas / Observaciones
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              "{sale.notes}"
            </p>
          </div>
        )}

        {/* ── TOTALES ───────────────────────────────────────────────────── */}
        <div className="flex justify-end pt-2">
          <div className="w-full max-w-xs space-y-2 text-sm border-t border-slate-100 pt-4 dark:border-slate-900">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {formatPrice(sale.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Impuestos (IGV):</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {formatPrice(sale.tax)}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Descuento Global:</span>
              <span className="font-mono text-red-500">
                -{formatPrice(sale.discount)}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold dark:border-slate-800">
              <span className="text-slate-900 dark:text-white">
                Total Neto:
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                {formatPrice(sale.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <FooterModal className="border-t border-slate-200 dark:border-slate-800">
        <div className="flex justify-end">
          <ModernButton text="Cerrar Ventana" onClick={onClose} />
        </div>
      </FooterModal>
    </Modal>
  );
}
