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

// ─── helpers ─────────────────────────────────────────────────────────────────

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

// ─── componente principal ─────────────────────────────────────────────────────

export default function SummaryStep({
  form,
  subtotal = 0,
  tax = 0,
  total = 0,
  setForm,
  setStep,
  initialFormState,
  onClose,
}) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const details = Array.isArray(form?.details) ? form.details : [];
  const payments = Array.isArray(form?.payments) ? form.payments : [];

  const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const pending = Math.max(total - totalPaid, 0);
  const change =
    form.saleType === "CASH_SALE" ? Math.max(totalPaid - total, 0) : 0;

  const isCreditSale = form.saleType === "CREDIT_SALE";

  const handleCancelSale = () => {
    if (typeof setForm === "function" && initialFormState)
      setForm(initialFormState);
    if (typeof setStep === "function") setStep(0);
    setCancelModalOpen(false);
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ── IZQUIERDA ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-4">
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

          {/* PRODUCTOS + PAGO en fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PRODUCTOS */}
            <Card icon={Package} title="Productos">
              {details.length === 0 ? (
                <p className="text-sm text-slate-500">No hay productos.</p>
              ) : (
                <div className="space-y-3">
                  <InfoRow label="Líneas" value={details.length} />
                  <InfoRow
                    label="Unidades totales"
                    value={details.reduce(
                      (acc, i) => acc + Number(i.quantity || 0),
                      0,
                    )}
                  />
                  <InfoRow
                    label="Importe"
                    value={fmt(
                      details.reduce(
                        (acc, i) =>
                          acc +
                          Number(i.quantity || 0) * Number(i.unitPrice || 0),
                        0,
                      ),
                    )}
                  />
                </div>
              )}
            </Card>

            {/* PAGO */}
            <Card icon={CreditCard} title="Pago">
              <div className="space-y-3">
                {/* tipo de venta */}
                <InfoRow
                  label="Tipo"
                  value={
                    <span
                      className={`
                        text-xs font-semibold px-2 py-0.5 rounded-lg
                        ${
                          isCreditSale
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        }
                      `}
                    >
                      {isCreditSale ? "Crédito" : "Contado"}
                    </span>
                  }
                />

                {/* desglose de pagos */}
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
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Icon size={13} />
                          {meta.label}
                          {p.reference && (
                            <span className="text-xs text-slate-400">
                              #{p.reference}
                            </span>
                          )}
                        </span>
                        <span className="text-sm font-medium">
                          {fmt(p.amount)}
                        </span>
                      </div>
                    );
                  })}

                {/* fecha de vencimiento si es crédito */}
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

                {/* saldo pendiente / vuelto */}
                {pending > 0 && (
                  <div className="pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
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
                  <div className="pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
                    <InfoRow label="Vuelto" value={fmt(change)} />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* ── DERECHA ────────────────────────────────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* RESUMEN FINAL */}
          <div
            className="
              rounded-3xl
              bg-white/80 dark:bg-white/[0.03]
              border border-black/[0.06] dark:border-white/[0.05]
              backdrop-blur-md
              overflow-hidden
            "
          >
            <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
              <Receipt size={18} />
              <h3 className="font-semibold">Resumen final</h3>
            </div>

            <div className="p-5 space-y-3">
              <SummaryRow label="Productos" value={details.length} />
              <SummaryRow label="Subtotal" value={fmt(subtotal)} />
              <SummaryRow label="IGV" value={fmt(tax)} />

              <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
                <SummaryRow label="TOTAL" value={fmt(total)} bold />
              </div>

              {totalPaid > 0 && (
                <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-3 space-y-2">
                  <SummaryRow label="Pagado" value={fmt(totalPaid)} />
                  {pending > 0 && (
                    <SummaryRow label="Pendiente" value={fmt(pending)} />
                  )}
                  {change > 0 && (
                    <SummaryRow label="Vuelto" value={fmt(change)} />
                  )}
                </div>
              )}

              {/* estado del pago */}
              <div className="pt-1">
                {isCreditSale || pending > 0 ? (
                  <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 p-3 flex items-start gap-2">
                    <TriangleAlert
                      size={15}
                      className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Quedará un saldo de{" "}
                      <strong>
                        {fmt(isCreditSale && totalPaid === 0 ? total : pending)}
                      </strong>{" "}
                      pendiente de cobro.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 p-3 flex items-center gap-2">
                    <CheckCircle
                      size={15}
                      className="text-emerald-600 dark:text-emerald-400 shrink-0"
                    />
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      Pago completo
                    </p>
                  </div>
                )}
              </div>

              {/* aviso final */}
              <div className="w-full">
                {/* CANCELAR */}
                <ModernButton
                  variant="danger"
                  className="!w-full"
                  text="Cancelar venta"
                  onClick={() => setCancelModalOpen(true)}
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

// ─── subcomponentes ───────────────────────────────────────────────────────────

function Card({ icon: Icon, title, children }) {
  return (
    <div
      className="
        rounded-3xl
        bg-white/80 dark:bg-white/[0.03]
        border border-black/[0.06] dark:border-white/[0.05]
        backdrop-blur-md
        overflow-hidden
      "
    >
      <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <Icon size={18} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}
