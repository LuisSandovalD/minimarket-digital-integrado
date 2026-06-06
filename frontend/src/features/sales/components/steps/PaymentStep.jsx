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
  TriangleAlert,
} from "lucide-react";
import { useId } from "react";

import { Input } from "@/components/forms";
import { SummaryRow } from "../SummaryRow";

// ─── constantes ──────────────────────────────────────────────────────────────

const SALE_TYPES = [
  { value: "CASH_SALE", label: "Contado", description: "Se cobra ahora" },
  { value: "CREDIT_SALE", label: "Crédito", description: "Queda pendiente" },
];

// ✅ backendValue alineado con el enum PaymentMethod de Prisma
const PAYMENT_METHODS = [
  { value: "CASH", backendValue: "CASH", label: "Efectivo", icon: Banknote },
  { value: "CARD", backendValue: "CARD", label: "Tarjeta", icon: CreditCard },
  { value: "YAPE", backendValue: "WALLET", label: "Yape", icon: Smartphone },
  { value: "PLIN", backendValue: "WALLET", label: "Plin", icon: Smartphone },
  {
    value: "TRANSFER",
    backendValue: "TRANSFER",
    label: "Transferencia",
    icon: Landmark,
  },
];

// ✅ mapeo UI → backend
const PAYMENT_METHOD_MAP = {
  CASH: "CASH",
  CARD: "CARD",
  YAPE: "WALLET",
  PLIN: "WALLET",
  TRANSFER: "TRANSFER",
};

const NEEDS_REFERENCE = ["CARD", "YAPE", "PLIN", "TRANSFER"];

// ─── helpers ─────────────────────────────────────────────────────────────────

const fmt = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    Number(value || 0),
  );

const sumPayments = (payments) =>
  payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);

// ─── componente principal ────────────────────────────────────────────────────

export default function PaymentStep({
  form,
  setForm,
  subtotal = 0,
  tax = 0,
  total = 0,
}) {
  const uid = useId();

  // ── helpers de estado ──────────────────────────────────────────────────────

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setSaleType = (type) =>
    setForm((prev) => ({
      ...prev,
      saleType: type,
      payments:
        type === "CREDIT_SALE"
          ? []
          : prev.payments?.length
            ? prev.payments
            : [{ id: `${uid}-0`, method: "CASH", amount: "", reference: "" }],
      creditDueDate: prev.creditDueDate || "",
    }));

  const addPayment = () =>
    setForm((prev) => ({
      ...prev,
      payments: [
        ...(prev.payments || []),
        {
          id: `${uid}-${Date.now()}`,
          method: "CASH",
          amount: "",
          reference: "",
        },
      ],
    }));

  const updatePayment = (id, updated) =>
    setForm((prev) => ({
      ...prev,
      payments: prev.payments.map((p) => (p.id === id ? updated : p)),
    }));

  const removePayment = (id) =>
    setForm((prev) => ({
      ...prev,
      payments: prev.payments.filter((p) => p.id !== id),
    }));

  // ── cálculos ───────────────────────────────────────────────────────────────

  const totalPaid = sumPayments(form.payments || []);
  const pending = Math.max(total - totalPaid, 0);
  const change =
    form.saleType === "CASH_SALE" ? Math.max(totalPaid - total, 0) : 0;
  const isFullyPaid = totalPaid >= total;
  const hasCash = (form.payments || []).some((p) => p.method === "CASH");

  // ── validaciones de envío ──────────────────────────────────────────────────

  const isCashSale = form.saleType === "CASH_SALE";
  const isCreditSale = form.saleType === "CREDIT_SALE";
  const canSubmitCashSale = isCashSale && totalPaid >= total && total > 0;
  const canSubmitCreditSale = isCreditSale && total > 0;
  const canSubmit = canSubmitCashSale || canSubmitCreditSale;

  // ✅ buildPayload: transforma el form al shape que espera el backend
  const buildPayload = () => ({
    ...form,
    payments: (form.payments || []).map((p) => ({
      ...p,
      paymentMethod: PAYMENT_METHOD_MAP[p.method],
      amount: Number(p.amount || 0),
    })),
  });

  // ── renderizado de fila de pago ────────────────────────────────────────────

  const renderPaymentRow = (payment, canRemove) => {
    const needsRef = NEEDS_REFERENCE.includes(payment.method);
    const refLabel =
      payment.method === "CARD"
        ? "N° operación"
        : payment.method === "YAPE"
          ? "Código Yape"
          : payment.method === "PLIN"
            ? "Código Plin"
            : "N° transferencia";

    return (
      <div
        key={payment.id}
        className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-2.5 flex items-start gap-2"
      >
        {/* métodos */}
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
                  updatePayment(payment.id, {
                    ...payment,
                    method: m.value,
                    reference: "",
                  })
                }
                className={`
                  h-10 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all
                  ${
                    sel
                      ? "border-slate-400/60 dark:border-slate-600 bg-white dark:bg-slate-900"
                      : "border-slate-200/40 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 hover:bg-white/60"
                  }
                `}
              >
                <MIcon size={13} />
                <span className="text-[9px] font-medium leading-none">
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* monto + referencia */}
        <div className="w-28 shrink-0 flex flex-col gap-1.5">
          <Input
            label="Monto (S/)"
            type="number"
            min="0"
            step="0.01"
            value={payment.amount || ""}
            onChange={(e) =>
              updatePayment(payment.id, { ...payment, amount: e.target.value })
            }
          />
          {needsRef && (
            <Input
              label={refLabel}
              type="text"
              value={payment.reference || ""}
              onChange={(e) =>
                updatePayment(payment.id, {
                  ...payment,
                  reference: e.target.value,
                })
              }
            />
          )}
        </div>

        {/* eliminar */}
        {canRemove && (
          <button
            type="button"
            onClick={() => removePayment(payment.id)}
            className="
              mt-5 h-9 w-9 shrink-0 rounded-lg
              border border-red-200/50 dark:border-red-900/40
              text-red-400 hover:text-red-600
              bg-red-50/40 dark:bg-red-950/20
              flex items-center justify-center transition-colors
            "
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    );
  };

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid lg:grid-cols-12 gap-4">
        {/* ── IZQUIERDA ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-3">
          {/* TIPO DE VENTA */}
          <div className="rounded-2xl p-3 bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05]">
            <p className="text-sm font-semibold mb-2">Tipo de venta</p>
            <div className="grid grid-cols-2 gap-2">
              {SALE_TYPES.map((type) => {
                const selected = form.saleType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSaleType(type.value)}
                    className={`
                      rounded-xl border p-2.5 text-left flex flex-col gap-0.5 transition-all
                      ${
                        selected
                          ? "border-slate-400/60 dark:border-slate-600 bg-white dark:bg-slate-900/80"
                          : "border-slate-200/40 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 hover:bg-white/50"
                      }
                    `}
                  >
                    <span className="text-sm font-semibold">{type.label}</span>
                    <span className="text-xs text-slate-500">
                      {type.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PAGOS — CONTADO */}
          {isCashSale && (
            <div className="rounded-2xl p-3 bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Pagos</p>
                {!isFullyPaid && (
                  <button
                    type="button"
                    onClick={addPayment}
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/40 hover:bg-white transition-colors"
                  >
                    <Plus size={12} /> Agregar método
                  </button>
                )}
              </div>

              {(form.payments || []).length === 0 ? (
                <p className="text-sm text-slate-400 py-1">
                  Agrega al menos un método de pago.
                </p>
              ) : (
                (form.payments || []).map((p) =>
                  renderPaymentRow(p, (form.payments || []).length > 1),
                )
              )}

              {/* barra de progreso */}
              {total > 0 && (form.payments || []).length > 0 && (
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progreso</span>
                    <span>
                      {Math.min(Math.round((totalPaid / total) * 100), 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isFullyPaid ? "bg-emerald-500" : "bg-slate-400 dark:bg-slate-500"}`}
                      style={{
                        width: `${Math.min((totalPaid / total) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* vuelto */}
              {change > 0 && hasCash && (
                <div className="rounded-xl p-2.5 border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Vuelto
                  </p>
                  <p className="text-lg font-semibold">{fmt(change)}</p>
                </div>
              )}
            </div>
          )}

          {/* CRÉDITO */}
          {isCreditSale && (
            <div className="rounded-2xl p-3 bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] space-y-3">
              <p className="text-sm font-semibold">Configuración de crédito</p>

              {/* ✅ mensaje dinámico: muestra abono y saldo pendiente real */}
              <div className="rounded-xl p-2.5 border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 flex items-start gap-2">
                <TriangleAlert
                  size={15}
                  className="text-amber-500 shrink-0 mt-0.5"
                />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Esta venta se registrará como crédito.
                  {totalPaid > 0 && (
                    <>
                      {" "}
                      Se registrará un abono inicial de{" "}
                      <strong>{fmt(totalPaid)}</strong>.
                    </>
                  )}{" "}
                  El saldo pendiente será de <strong>{fmt(pending)}</strong>.
                </p>
              </div>

              <Input
                label="Fecha de vencimiento"
                type="date"
                icon={Calendar}
                value={form.creditDueDate || ""}
                onChange={(e) => updateField("creditDueDate", e.target.value)}
              />

              {/* abono inicial opcional */}
              <div className="border-t border-slate-200/40 dark:border-slate-800/40 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">Abono inicial</p>
                    <p className="text-xs text-slate-500">Opcional</p>
                  </div>
                  <button
                    type="button"
                    onClick={addPayment}
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/40 hover:bg-white transition-colors"
                  >
                    <Plus size={12} /> Agregar abono
                  </button>
                </div>
                {(form.payments || []).map((p) => renderPaymentRow(p, true))}
              </div>
            </div>
          )}
        </div>

        {/* ── DERECHA: resumen ─────────────────────────────────────────────── */}
        <div className="lg:col-span-4">
          <div className="sticky top-0 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2">
              <Receipt size={14} />
              <p className="text-sm font-medium">Resumen</p>
            </div>

            <div className="p-4">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <SummaryRow label="Subtotal" value={fmt(subtotal)} />
                  <SummaryRow label="IGV" value={fmt(tax)} />
                  <tr className="border-t border-slate-200/50 dark:border-slate-800/50">
                    <td className="pt-2 pb-1 font-medium">Total</td>
                    <td className="pt-2 pb-1 text-right font-medium">
                      {fmt(total)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-2 mt-1">
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    <SummaryRow
                      label="Tipo"
                      value={
                        SALE_TYPES.find((t) => t.value === form.saleType)
                          ?.label || "-"
                      }
                    />
                    {(form.payments || []).map((p) => {
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
                    })}
                    {(form.payments || []).length > 0 && (
                      <SummaryRow label="Total pagado" value={fmt(totalPaid)} />
                    )}
                  </tbody>
                </table>
              </div>

              {/* estado del pago */}
              <div className="mt-3">
                {pending > 0 ? (
                  <div className="rounded-xl p-2.5 border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20">
                    <p className="text-xs text-amber-600 dark:text-amber-400 mb-0.5">
                      Saldo pendiente
                    </p>
                    <p className="text-xl font-semibold text-amber-700 dark:text-amber-300">
                      {fmt(pending)}
                    </p>
                  </div>
                ) : total > 0 ? (
                  <div className="rounded-xl p-2.5 border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 flex items-center gap-2">
                    <CheckCircle
                      size={14}
                      className="text-emerald-600 dark:text-emerald-400 shrink-0"
                    />
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      Pago completo
                    </p>
                  </div>
                ) : null}

                {change > 0 && hasCash && (
                  <div className="mt-2">
                    <SummaryRow label="Vuelto" value={fmt(change)} />
                  </div>
                )}
              </div>

              {/* ✅ indicador visual de si se puede continuar */}
              {!canSubmit && (
                <p className="mt-3 text-xs text-center text-slate-400">
                  {isCashSale
                    ? "Ingresa pagos que cubran el total para continuar."
                    : "Selecciona crédito o completa el pago para continuar."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
