// ========================================
// features/sales/modal/steps/SummaryStep.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import {
  Banknote,
  Calendar,
  CheckCircle,
  CreditCard,
  Landmark,
  Package,
  Receipt,
  Smartphone,
  TriangleAlert,
  User,
} from "lucide-react";
import { useState } from "react";

import { SummaryRow } from "../SummaryRow";
import SaleCancelModal from "../modals/SaleCancelModal";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    Number(value || 0),
  );

const METHOD_META = {
  CASH: { label: "Efectivo", icon: Banknote },
  CARD: { label: "Tarjeta", icon: CreditCard },
  YAPE: { label: "Yape", icon: Smartphone },
  PLIN: { label: "Plin", icon: Smartphone },
  TRANSFER: { label: "Transferencia", icon: Landmark },
};

export default function SummaryStep({
  form,
  setForm,
  setStep,
  initialFormState,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const details = Array.isArray(form?.details) ? form.details : [];
  const payments = Array.isArray(form?.payments) ? form.payments : [];

  // ── MATEMÁTICA INTEGRAL: IGV ADICIONADO (PRECIOS BASE SIN IGV) ──
  // 1. El subtotal es la suma directa del valor neto de los productos escogidos
  const subtotal = details.reduce(
    (acc, item) =>
      acc +
      Number(item.quantity || 0) * Number(item.price || item.unitPrice || 0),
    0,
  );
  // 2. El impuesto se calcula incrementando el 18% a la base imponible
  const tax = subtotal * 0.18;
  // 3. El total final es la combinación del subtotal más su respectivo impuesto
  const total = subtotal + tax;

  const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const pending = Math.max(total - totalPaid, 0);

  const rawChange =
    form.saleType === "CASH_SALE" ? Math.max(totalPaid - total, 0) : 0;
  const change = Math.floor(rawChange * 10) / 10;

  const isCreditSale = form.saleType === "CREDIT_SALE";

  const handleCancelSale = () => {
    if (typeof setForm === "function" && initialFormState)
      setForm(initialFormState);
    if (typeof setStep === "function") setStep(1);
    setCancelModalOpen(false);
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ── IZQUIERDA ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-3">
          {/* CLIENTE */}
          <Card icon={User} title="Cliente">
            <div className="space-y-0.5">
              <InfoRow
                label="Nombre"
                value={form?.customer?.name || "Cliente General"}
              />
              <InfoRow
                label="Documento"
                value={form?.customer?.documentNumber || "—"}
              />
              <InfoRow label="Correo" value={form?.customer?.email || "—"} />
              <InfoRow label="Teléfono" value={form?.customer?.phone || "—"} />
            </div>
          </Card>

          {/* PRODUCTOS + PAGO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PRODUCTOS */}
            <Card icon={Package} title="Productos">
              {details.length === 0 ? (
                <p className="text-sm text-slate-500 py-1">No hay productos.</p>
              ) : (
                <div className="space-y-2">
                  <InfoRow label="Líneas" value={details.length} />
                  <InfoRow
                    label="Unidades totales"
                    value={details.reduce(
                      (acc, i) => acc + Number(i.quantity || 0),
                      0,
                    )}
                  />
                  <hr className="border-slate-100 dark:border-slate-800/40 my-1" />
                  <InfoRow
                    label="Importe (Total con IGV)"
                    className="font-semibold"
                    value={fmt(total)}
                  />
                </div>
              )}
            </Card>

            {/* PAGO */}
            <Card icon={CreditCard} title="Pago">
              <div className="space-y-2">
                <InfoRow
                  label="Tipo"
                  value={
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${isCreditSale ? "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400" : "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"}`}
                    >
                      {isCreditSale ? "Crédito" : "Contado"}
                    </span>
                  }
                />

                {payments
                  .filter((p) => Number(p.amount) > 0)
                  .map((p) => {
                    const meta = METHOD_META[p.method] ?? {
                      label: p.method,
                      icon: Banknote,
                    };
                    const Icon = meta.icon;
                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                          <Icon size={13} />
                          {meta.label}
                          {p.reference && (
                            <span className="text-xs text-slate-400">
                              #{p.reference}
                            </span>
                          )}
                        </span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {fmt(p.amount)}
                        </span>
                      </div>
                    );
                  })}

                {isCreditSale && form.creditDueDate && (
                  <InfoRow
                    label={
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Vence
                      </span>
                    }
                    value={form.creditDueDate}
                  />
                )}

                {pending > 0 && (
                  <div className="pt-1 border-t border-slate-200/40 dark:border-slate-800/40">
                    <InfoRow
                      label={
                        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                          <TriangleAlert size={12} />
                          Saldo pendiente
                        </span>
                      }
                      value={
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          {fmt(pending)}
                        </span>
                      }
                    />
                  </div>
                )}

                {change > 0 && (
                  <div className="pt-1 border-t border-slate-200/40 dark:border-slate-800/40">
                    <InfoRow label="Vuelto entregado" value={fmt(change)} />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* ── DERECHA: RESUMEN LATERAL TRANS LÚCIDO ──────────────────────── */}
        <div className="lg:col-span-4">
          <div className="sticky top-0 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2">
              <Receipt size={14} />
              <p className="text-sm font-medium">Resumen final</p>
            </div>

            <div className="p-4 space-y-3">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <SummaryRow label="Productos" value={details.length} />
                  <SummaryRow label="Subtotal" value={fmt(subtotal)} />
                  <SummaryRow label="IGV (18%)" value={fmt(tax)} />

                  <tr className="border-t border-slate-200/50 dark:border-slate-800/50">
                    <td className="pt-2 font-semibold text-slate-900 dark:text-white">
                      TOTAL
                    </td>
                    <td className="pt-2 text-right font-bold text-base text-slate-900 dark:text-white">
                      {fmt(total)}
                    </td>
                  </tr>

                  {totalPaid > 0 && (
                    <>
                      <tr className="border-t border-slate-200/50 dark:border-slate-800/50">
                        <td className="pt-1" colSpan="2" />
                      </tr>
                      <SummaryRow label="Pagado" value={fmt(totalPaid)} />
                      {pending > 0 && (
                        <SummaryRow label="Pendiente" value={fmt(pending)} />
                      )}
                      {change > 0 && (
                        <SummaryRow label="Vuelto" value={fmt(change)} />
                      )}
                    </>
                  )}
                </tbody>
              </table>

              <div className="pt-1">
                {isCreditSale || pending > 0 ? (
                  <div className="rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 p-2.5 flex items-start gap-2">
                    <TriangleAlert
                      size={14}
                      className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Quedará un saldo de <strong>{fmt(pending)}</strong>{" "}
                      pendiente de cobro.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 p-2.5 flex items-center gap-2">
                    <CheckCircle
                      size={14}
                      className="text-emerald-600 dark:text-emerald-400 shrink-0"
                    />
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      Pago completo
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <ModernButton
                  variant="primary"
                  className="!w-full"
                  text={loading ? "Procesando..." : "Emitir Comprobante"}
                  onClick={onSubmit}
                  disabled={loading}
                />
                <ModernButton
                  variant="ghost"
                  className="!w-full !text-slate-400 hover:!text-rose-500 transition-colors"
                  text="Cancelar venta"
                  onClick={() => setCancelModalOpen(true)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SaleCancelModal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelSale}
      />
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200/40 dark:border-slate-800/40 flex items-center gap-2">
        <Icon size={14} className="text-slate-400" />
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </h4>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, className = "" }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 text-sm ${className}`}
    >
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-medium text-right text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}
