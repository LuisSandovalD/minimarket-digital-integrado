// ========================================
// features/sales/modal/steps/PaymentStep.jsx
// ========================================

import { Input } from "@/components/forms";
import {
  Banknote,
  Calendar,
  CheckCircle,
  CreditCard,
  Landmark,
  Plus,
  Receipt,
  Smartphone,
  Trash2,
} from "lucide-react";
import { SummaryRow } from "../SummaryRow";

const SALE_TYPES = [
  { value: "CASH_SALE", label: "Contado", description: "Se cobra ahora" },
  { value: "CREDIT_SALE", label: "Crédito", description: "Queda pendiente" },
];

const PAYMENT_METHODS = [
  { value: "CASH", backendMethodId: 1, label: "Efectivo", icon: Banknote },
  { value: "CARD", backendMethodId: 2, label: "Tarjeta", icon: CreditCard },
  { value: "YAPE", backendMethodId: 3, label: "Yape", icon: Smartphone },
  { value: "PLIN", backendMethodId: 4, label: "Plin", icon: Smartphone },
  {
    value: "TRANSFER",
    backendMethodId: 5,
    label: "Transferencia",
    icon: Landmark,
  },
];

const NEEDS_REFERENCE = ["CARD", "YAPE", "PLIN", "TRANSFER"];

const fmt = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    Number(value || 0),
  );

const sumPayments = (payments) =>
  (payments || []).reduce((acc, p) => acc + Number(p.amount || 0), 0);

const roundToTenCents = (value) => Math.round(Number(value || 0) * 10) / 10;

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function PaymentStep({
  form,
  setForm,
  totalOverride = null,
  isAbonoFlow = false,
}) {
  const details = Array.isArray(form?.details) ? form.details : [];

  // ── DETERMINACIÓN DEL TOTAL REUTILIZABLE ──
  // Si nos pasan un totalOverride (ej: saldo de un crédito), usamos ese. Si no, calculamos desde los productos.
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  if (totalOverride !== null) {
    total = Number(totalOverride);
    subtotal = total / 1.18;
    tax = total - subtotal;
  } else {
    subtotal = details.reduce(
      (acc, item) =>
        acc +
        Number(item.quantity || 0) * Number(item.price || item.unitPrice || 0),
      0,
    );
    tax = subtotal * 0.18;
    total = subtotal + tax;
  }

  // ── ACCIONES DE ACTUALIZACIÓN ──
  const setSaleType = (type) =>
    setForm((prev) => {
      const targetDueDate = prev.creditDueDate || getTodayDateString();
      return {
        ...prev,
        saleType: type,
        payments:
          type === "CREDIT_SALE"
            ? [
                {
                  id: "CREDIT-ID",
                  method: "CREDIT",
                  paymentMethodId: 1, // Ajustado al ID de método base por defecto
                  amount: total > 0 ? total.toFixed(2) : "",
                  status: "PENDING",
                  dueDate: targetDueDate,
                  reference: "CRÉDITO-DIRECTO",
                },
              ]
            : [
                {
                  id: crypto.randomUUID(),
                  method: "CASH",
                  paymentMethodId: 1,
                  amount: total > 0 ? total.toFixed(2) : "",
                  reference: "",
                },
              ],
        creditDueDate: type === "CREDIT_SALE" ? targetDueDate : null,
      };
    });

  const addPayment = () => {
    const currentPaid = sumPayments(form.payments || []);
    const suggestedAmount = Math.max(0, roundToTenCents(total - currentPaid));

    setForm((prev) => ({
      ...prev,
      payments: [
        ...(prev.payments || []),
        {
          id: crypto.randomUUID(),
          method: "CASH",
          paymentMethodId: 1,
          amount: suggestedAmount > 0 ? suggestedAmount.toFixed(2) : "",
          reference: "",
        },
      ],
    }));
  };

  const updatePayment = (id, updated) => {
    setForm((prev) => ({
      ...prev,
      payments: (prev.payments || []).map((p) => (p.id === id ? updated : p)),
    }));
  };

  const removePayment = (id) =>
    setForm((prev) => ({
      ...prev,
      payments: (prev.payments || []).filter((p) => p.id !== id),
    }));

  const handleBlurPaymentAmount = (id, value) => {
    if (!value) return;
    const rounded = roundToTenCents(value);
    setForm((prev) => ({
      ...prev,
      payments: (prev.payments || []).map((p) =>
        p.id === id ? { ...p, amount: rounded.toFixed(2) } : p,
      ),
    }));
  };

  const handleCreditDueDateChange = (dateValue) => {
    setForm((prev) => ({
      ...prev,
      creditDueDate: dateValue,
      payments: (prev.payments || []).map((p) =>
        p.id === "CREDIT-ID" ? { ...p, dueDate: dateValue } : p,
      ),
    }));
  };

  // ── MATEMÁTICAS EN TIEMPO REAL ──
  const totalPaid = sumPayments(form.payments || []);
  const pending = Math.max(total - totalPaid, 0);

  const isCashSale = form.saleType === "CASH_SALE" || !form.saleType;
  const isCreditSale = form.saleType === "CREDIT_SALE";

  const rawChange = isCashSale ? Math.max(totalPaid - total, 0) : 0;
  const change = roundToTenCents(rawChange);

  // Si es flujo de abonos, permitimos pagos parciales sin obligar a cubrir el 100% de la venta para poder guardar
  const isFullyPaid = totalPaid >= total - 0.05;
  const hasCash = (form.payments || []).some((p) => p.method === "CASH");

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-3">
          {/* TIPO DE VENTA (Se oculta o inhabilita si es un flujo de abono/amortización pura) */}
          {!isAbonoFlow && (
            <div className="rounded-2xl p-3 bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05]">
              <p className="text-sm font-semibold mb-2">Tipo de venta</p>
              <div className="grid grid-cols-2 gap-2">
                {SALE_TYPES.map((type) => {
                  const selected =
                    form.saleType === type.value ||
                    (!form.saleType && type.value === "CASH_SALE");
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSaleType(type.value)}
                      className={`rounded-xl border p-2.5 text-left flex flex-col gap-0.5 transition-all ${selected ? "border-slate-400/60 dark:border-slate-600 bg-white dark:bg-slate-900/80" : "border-slate-200/40 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 hover:bg-white/50"}`}
                    >
                      <span className="text-sm font-semibold">
                        {type.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {type.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* LISTADO DINÁMICO DE PAGOS */}
          {isCashSale && (
            <div className="rounded-2xl p-3 bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  {isAbonoFlow ? "Desglose del Abono" : "Pagos"}
                </p>
                {(!isFullyPaid || isAbonoFlow) && (
                  <button
                    type="button"
                    onClick={addPayment}
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/40 hover:bg-white transition-colors"
                  >
                    <Plus size={12} /> Agregar método mixto
                  </button>
                )}
              </div>

              {(form.payments || []).length === 0 ? (
                <p className="text-sm text-slate-400 py-1">
                  Agrega al menos un método de pago.
                </p>
              ) : (
                <div className="space-y-2">
                  {(form.payments || []).map((p) => (
                    <PaymentRow
                      key={p.id}
                      payment={p}
                      canRemove={(form.payments || []).length > 1}
                      onUpdate={updatePayment}
                      onRemove={removePayment}
                      onBlurAmount={handleBlurPaymentAmount}
                    />
                  ))}
                </div>
              )}

              {total > 0 &&
                (form.payments || []).length > 0 &&
                !isAbonoFlow && (
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progreso de Pago</span>
                      <span>
                        {Math.min(Math.round((totalPaid / total) * 100), 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isFullyPaid ? "bg-emerald-500" : "bg-blue-500"}`}
                        style={{
                          width: `${Math.min((totalPaid / total) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

              {change > 0 && hasCash && !isAbonoFlow && (
                <div className="rounded-xl p-2.5 border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Vuelto estimado a entregar
                  </p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {fmt(change)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* CONFIGURACIÓN CRÉDITO ORIGINAL */}
          {isCreditSale && (
            <div className="rounded-2xl p-3 bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] space-y-3">
              <p className="text-sm font-semibold">Configuración de crédito</p>
              <div className="rounded-xl p-2.5 border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 flex items-start gap-2">
                <CheckCircle
                  size={15}
                  className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                />
                <p className="text-xs text-emerald-800 dark:text-emerald-400">
                  Esta venta quedará registrada como **Cuenta por Cobrar
                  (Crédito)**. El monto total de{" "}
                  <strong className="font-bold">{fmt(total)}</strong> pasará a
                  estado pendiente hasta su vencimiento.
                </p>
              </div>
              <Input
                label="Fecha de vencimiento"
                type="date"
                icon={Calendar}
                min={getTodayDateString()}
                value={form.creditDueDate || ""}
                onChange={(e) => handleCreditDueDateChange(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* ── RESUMEN LATERAL ASOCIADO ── */}
        <div className="lg:col-span-4">
          <div className="sticky top-0 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2">
              <Receipt size={14} />
              <p className="text-sm font-medium">
                {isAbonoFlow ? "Resumen de Deuda" : "Resumen del comprobante"}
              </p>
            </div>

            <div className="p-4 space-y-3">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {!isAbonoFlow && (
                    <>
                      <SummaryRow label="Subtotal" value={fmt(subtotal)} />
                      <SummaryRow label="IGV (18%)" value={fmt(tax)} />
                    </>
                  )}
                  <tr className="border-t border-slate-200/50 dark:border-slate-800/50">
                    <td className="pt-2 pb-1 font-semibold text-slate-900 dark:text-white">
                      {isAbonoFlow ? "Total adeudado" : "Total a Pagar"}
                    </td>
                    <td className="pt-2 pb-1 text-right font-bold text-base text-slate-900 dark:text-white">
                      {fmt(total)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-2">
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    <SummaryRow
                      label="Flujo"
                      value={
                        isAbonoFlow
                          ? "Abono / Amortización"
                          : SALE_TYPES.find((t) => t.value === form.saleType)
                              ?.label || "Contado"
                      }
                    />
                    {isCashSale ? (
                      (form.payments || [])
                        .filter((p) => Number(p.amount) > 0)
                        .map((p) => {
                          const m = PAYMENT_METHODS.find(
                            (m) => m.value === p.method,
                          );
                          return (
                            <SummaryRow
                              key={p.id}
                              label={m?.label || p.method}
                              value={fmt(p.amount)}
                            />
                          );
                        })
                    ) : (
                      <SummaryRow label="Crédito Directo" value={fmt(total)} />
                    )}
                  </tbody>
                </table>
              </div>

              <div>
                {isCreditSale ? (
                  <div className="rounded-xl p-2.5 border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20">
                    <p className="text-xs text-amber-600 mb-0.5">
                      Monto Financiado
                    </p>
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                      {fmt(total)}
                    </p>
                  </div>
                ) : pending > 0 ? (
                  <div className="rounded-xl p-2.5 border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20">
                    <p className="text-xs text-amber-600 mb-0.5">
                      {isAbonoFlow ? "Saldo pendiente final" : "Saldo Restante"}
                    </p>
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                      {fmt(pending)}
                    </p>
                  </div>
                ) : total > 0 ? (
                  <div className="rounded-xl p-2.5 border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 flex items-center gap-2">
                    <CheckCircle
                      size={14}
                      className="text-emerald-600 dark:text-emerald-400 shrink-0"
                    />
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      {isAbonoFlow
                        ? "Deuda saldada por completo"
                        : "Monto Cubierto"}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// ROW COMPONENT INDEPENDIENTE
// ========================================
function PaymentRow({ payment, canRemove, onUpdate, onRemove, onBlurAmount }) {
  const needsRef = NEEDS_REFERENCE.includes(payment.method);
  const refLabel =
    payment.method === "CARD"
      ? "N° operación"
      : payment.method === "YAPE" || payment.method === "PLIN"
        ? `Código ${payment.method}`
        : "N° transferencia";

  return (
    <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-2.5 flex flex-col md:flex-row items-stretch md:items-start gap-2 bg-white/40 dark:bg-slate-900/10">
      <div className="grid grid-cols-5 gap-1 flex-1">
        {PAYMENT_METHODS.map((m) => {
          const MIcon = m.icon;
          const sel = payment.method === m.value;
          return (
            <button
              key={m.value}
              type="button"
              title={m.label}
              onClick={() =>
                onUpdate(payment.id, {
                  ...payment,
                  method: m.value,
                  paymentMethodId: m.backendMethodId,
                  reference: "",
                })
              }
              className={`h-11 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all ${sel ? "border-slate-500 bg-slate-50 dark:bg-slate-900 font-semibold" : "border-slate-200/40 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 hover:bg-white/60"}`}
            >
              <MIcon size={14} />
              <span className="text-[9px] leading-none">{m.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full md:w-36 shrink-0 flex flex-col gap-1.5">
        <Input
          label="Monto (S/)"
          type="number"
          min="0"
          step="0.10"
          value={payment.amount ?? ""}
          onChange={(e) =>
            onUpdate(payment.id, { ...payment, amount: e.target.value })
          }
          onBlur={(e) => onBlurAmount(payment.id, e.target.value)}
        />
        {needsRef && (
          <Input
            label={refLabel}
            type="text"
            value={payment.reference || ""}
            onChange={(e) =>
              onUpdate(payment.id, { ...payment, reference: e.target.value })
            }
          />
        )}
      </div>

      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(payment.id)}
          className="md:mt-5 h-9 w-full md:w-9 shrink-0 rounded-lg border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-center transition-colors"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
