// ========================================
// features/sales/components/SaleDetailModal.jsx
// ========================================
import {
  Banknote,
  Calendar,
  FileText,
  Package,
  Receipt,
  User,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

// Formateadores de ayuda locales
const fPrice = (v) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    Number(v || 0),
  );

const fDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

const STATUS_MAP = {
  COMPLETED: {
    label: "Completada",
    dot: "bg-emerald-500",
    style:
      "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/50",
  },
  PENDING: {
    label: "Pendiente",
    dot: "bg-blue-500",
    style:
      "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900/50",
  },
  CREDIT_PENDING: {
    label: "Crédito Pendiente",
    dot: "bg-amber-500",
    style:
      "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-900/50",
  },
  CANCELED: {
    label: "Anulada",
    dot: "bg-rose-500",
    style:
      "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/30 dark:border-rose-900/50",
  },
  RETURNED: {
    label: "Devuelta",
    dot: "bg-indigo-500",
    style:
      "text-indigo-600 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-900/50",
  },
  ARCHIVED: {
    label: "Archivada",
    dot: "bg-zinc-400",
    style:
      "text-zinc-600 bg-zinc-50 border-zinc-200 dark:text-zinc-400 dark:bg-zinc-950/30 dark:border-zinc-900/50",
  },
  DRAFT: {
    label: "Borrador",
    dot: "bg-slate-400",
    style:
      "text-slate-600 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-950/30 dark:border-zinc-900/50",
  },
};

export default function SaleDetailModal({ open, onClose, sale }) {
  if (!open || !sale) return null;

  const currentStatus = STATUS_MAP[sale.status] || {
    label: sale.status,
    dot: "bg-slate-400",
    style: "text-slate-600 bg-slate-50 border-slate-200",
  };

  const items = sale.details || [];
  const payments = sale.payments || [];

  // Cálculos de Caja Reales para lectura
  const totalPagado = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0,
  );
  const totalVenta = Number(sale.total || 0);
  const saldoPendiente = totalVenta - totalPagado;

  const isCredit = sale.status === "CREDIT_PENDING" || saldoPendiente > 0;
  const paymentWithDueDate = payments.find((p) => p.dueDate);
  const creditDueDate = paymentWithDueDate ? paymentWithDueDate.dueDate : null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <HeaderModal
        onClose={onClose}
        title={`Venta N° ${sale.saleNumber}`}
        subtitle="Consulta de Control Interno"
        icon={Receipt}
      />

      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-slate-600 dark:text-slate-300">
        {/* Barra de Estados Informativos */}
        <div className="flex flex-wrap items-center gap-3 border-b pb-3 dark:border-slate-800">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold text-[11px] border shadow-sm tracking-wide ${currentStatus.style}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
            {currentStatus.label.toUpperCase()}
          </span>

          <span className="text-slate-300 dark:text-slate-700 font-light">
            |
          </span>

          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md font-bold text-[11px] border shadow-sm ${
              isCredit
                ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50"
                : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50"
            }`}
          >
            {isCredit ? "CRÉDITO" : "CONTADO"}
          </span>

          {isCredit && creditDueDate && (
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium text-[11px]">
              <Calendar size={13} /> Vence: {fDate(creditDueDate)}
            </span>
          )}
        </div>

        {/* Panel de Datos Generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 bg-slate-50/50 dark:bg-slate-900/30 p-3 rounded-xl border dark:border-slate-800">
            <div className="flex justify-between border-b pb-1 dark:border-slate-800 font-semibold text-slate-400 uppercase text-[10px]">
              <span>Información General</span>
              <FileText size={12} />
            </div>
            <div className="flex justify-between">
              <span>Emisión:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {fDate(sale.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sucursal:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {sale.branch?.name || `ID: ${sale.branchId}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Atendido por:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {sale.seller?.name || `ID: ${sale.sellerId}`}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 bg-slate-50/50 dark:bg-slate-900/30 p-3 rounded-xl border dark:border-slate-800">
            <div className="flex justify-between border-b pb-1 dark:border-slate-800 font-semibold text-slate-400 uppercase text-[10px]">
              <span>Cliente</span>
              <User size={12} />
            </div>
            <p className="font-bold text-slate-800 dark:text-slate-100">
              {sale.customer?.name || "Cliente General (Venta Directa)"}
            </p>
            {sale.customer?.documentNumber && (
              <p className="font-mono text-slate-400 text-[11px]">
                {sale.customer.documentType || "DOC"}:{" "}
                {sale.customer.documentNumber}
              </p>
            )}
            {Number(sale.customer?.currentDebt || 0) > 0 && (
              <div className="flex justify-between pt-1 text-rose-500 font-semibold border-t border-dashed dark:border-slate-800 mt-1">
                <span>Deuda en Cuenta Corriente:</span>
                <span>{fPrice(sale.customer.currentDebt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Listado de Artículos Vendidos */}
        <div className="border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 border-b dark:border-slate-800 flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-400">
            <Package size={12} /> Artículos registrados
          </div>
          <div className="divide-y dark:divide-slate-800 px-3 bg-white dark:bg-slate-900/20">
            {items.length === 0 ? (
              <p className="py-4 text-center text-slate-400 italic">
                Sin productos en el desglose de venta.
              </p>
            ) : (
              items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="py-2.5 flex justify-between items-center gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate text-slate-800 dark:text-slate-200">
                      {item.product?.name || "Producto desconocido"}
                    </p>
                    {item.product?.sku && (
                      <span className="font-mono text-[10px] text-slate-400">
                        {item.product.sku}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-5 text-right shrink-0">
                    <span className="font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                      x{item.quantity}
                    </span>
                    <span className="font-mono w-24 text-slate-800 dark:text-slate-200 font-bold text-xs">
                      {fPrice(item.subtotal)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Flujo Financiero e Historial de Caja */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="md:col-span-2 border dark:border-slate-800 rounded-xl p-3 space-y-2 bg-white dark:bg-slate-900/10">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] text-slate-400 mb-1">
              <Banknote size={12} /> Historial de Amortizaciones
            </div>
            {payments.length === 0 ? (
              <p className="text-slate-400 italic py-2 text-center border border-dashed rounded-lg dark:border-slate-800">
                Operación sin amortizaciones monetarias realizadas.
              </p>
            ) : (
              <div className="space-y-1 font-mono text-[11px] max-h-[80px] overflow-y-auto">
                {payments.map((p, i) => (
                  <div
                    key={p.id || i}
                    className="flex justify-between text-slate-500 py-1 border-b border-dashed dark:border-slate-800 last:border-0"
                  >
                    <span className="font-medium text-slate-600 dark:text-slate-300">
                      Método: {p.paymentMethod}{" "}
                      {p.reference && `(${p.reference})`}
                    </span>
                    <span className="text-slate-400">
                      {fDate(p.paidAt || p.createdAt)}
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {fPrice(p.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bloque de Totales Numéricos */}
          <div className="bg-slate-900 text-white dark:bg-slate-950 p-4 rounded-xl flex flex-col justify-between space-y-3 shadow-md">
            <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-white font-medium">
                  {fPrice(sale.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Impuesto (18%):</span>
                <span className="text-white font-medium">
                  {fPrice(sale.tax)}
                </span>
              </div>
              {Number(sale.discount) > 0 && (
                <div className="flex justify-between text-rose-400 font-medium">
                  <span>Descuento aplicado:</span>
                  <span>-{fPrice(sale.discount)}</span>
                </div>
              )}
              {saldoPendiente > 0 && (
                <div className="flex justify-between text-amber-400 font-bold border-t border-slate-800/80 pt-1.5 mt-1.5">
                  <span>Saldo Pendiente:</span>
                  <span>{fPrice(saldoPendiente)}</span>
                </div>
              )}
            </div>
            <div className="border-t border-slate-800/60 pt-2">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                Importe Total Venta
              </p>
              <p className="text-2xl font-black font-mono tracking-tight text-emerald-400">
                {fPrice(totalVenta)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterModal>
        <div className="flex justify-end">
          <ModernButton text="Cerrar Ventana" onClick={onClose} />
        </div>
      </FooterModal>
    </Modal>
  );
}
