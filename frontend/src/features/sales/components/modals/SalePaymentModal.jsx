// ========================================
// features/sales/components/modals/SalePaymentModal.jsx
// ========================================

import {
  ArrowRight,
  Banknote,
  CheckCircle,
  CreditCard,
  Landmark,
  Plus,
  Receipt,
  Smartphone,
  Trash2,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { Input } from "@/components/forms";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { useSalePayment } from "../../hooks/useSalePayment";
import { SummaryRow } from "../SummaryRow";

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

const NEED_REFERENCE = ["CARD", "YAPE", "PLIN", "TRANSFER"];

const fmt = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(value || 0));

export default function SalePaymentModal({ open, onClose, sale, onSubmit }) {
  // Orquestación directa con el Hook de abonos limpios
  const {
    form,
    changeDue,
    pendingDebt,
    totalPaidInModal,
    addPaymentRow,
    removePaymentRow,
    updatePaymentRow,
    handleSubmit,
  } = useSalePayment({ sale, onSubmit, onClose });

  const isVisible = open && sale;

  // Captura de saldos actuales de la venta en BD
  const totalHistorico = sale ? Number(sale.total || 0) : 0;
  const deudaPendienteActual = sale ? Number(sale.pendingDebt !== undefined ? sale.pendingDebt : sale.total || 0) : 0;

  // 🛡️ VALIDACIÓN COHERENTE PARA ABONOS
  const canSubmit = totalPaidInModal > 0;

  const hasCash = form.payments?.some((p) => Number(p.paymentMethodId) === 1);

  return (
    <Modal open={isVisible} onClose={onClose} size="xl">
      {sale && (
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
          <HeaderModal title={`Amortización / Pago de Deuda - Venta #${sale.id || ""}`} onClose={onClose} />

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* COLUMNA IZQUIERDA: GESTIÓN DE DINERO RECIBIDO */}
              <div className="lg:col-span-8 space-y-3">
                {/* BANNER INFORMATIVO DE SALDO DEUDOR */}
                <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300">
                        Estado de la Cuenta por Cobrar
                      </h4>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                        Esta orden presents un saldo en deuda de{" "}
                        <strong className="font-bold">{fmt(deudaPendienteActual)}</strong>. Introduce los montos de
                        amortización que el cliente va a cancelar en caja.
                      </p>
                    </div>
                  </div>
                </div>

                {/* DESGLOSE DE MÉTODOS MIXTOS */}
                <div className="rounded-2xl p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Medios de Pago Recibidos</p>
                    {totalPaidInModal < deudaPendienteActual && (
                      <button
                        type="button"
                        onClick={addPaymentRow}
                        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
                      >
                        <Plus size={12} /> Agregar método mixto
                      </button>
                    )}
                  </div>

                  {!form.payments || form.payments.length === 0 ? (
                    <p className="text-sm text-slate-400 py-1">
                      Agrega al menos un método de pago para registrar el ingreso.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {form.payments.map((p) => (
                        <PaymentRow
                          key={p.id}
                          payment={p}
                          canRemove={form.payments.length > 1}
                          onUpdate={updatePaymentRow}
                          onRemove={removePaymentRow}
                        />
                      ))}
                    </div>
                  )}

                  {/* VUELTO ESTIMADO (Solo si usa efectivo) */}
                  {Number(changeDue) > 0 && hasCash && (
                    <div className="rounded-xl p-2.5 border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/10 flex items-center justify-between">
                      <p className="text-sm text-emerald-800 dark:text-emerald-400">
                        Vuelto estimado a entregar al cliente
                      </p>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{fmt(changeDue)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* COLUMNA DERECHA: PANEL DE CONTROL FINANCIERO */}
              <div className="lg:col-span-4">
                <div className="sticky top-0 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2">
                    <Receipt size={14} className="text-slate-500" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Resumen de la Deuda</p>
                  </div>

                  <div className="p-4 space-y-3">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <SummaryRow label="Total Histórico Venta" value={fmt(totalHistorico)} />
                        <SummaryRow label="Deuda Pendiente Inicial" value={fmt(deudaPendienteActual)} />
                        <tr className="border-t border-slate-200/50 dark:border-slate-800/50">
                          <td className="pt-2 pb-1 font-semibold text-slate-900 dark:text-white">
                            Total Abonado Ahora
                          </td>
                          <td className="pt-2 pb-1 text-right font-black text-base text-blue-600 dark:text-blue-400">
                            {fmt(totalPaidInModal)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* BANNER DINÁMICO DE IMPACTO EN BD */}
                    <div className="border-t border-slate-200/50 pt-2.5">
                      {Number(pendingDebt) > 0 ? (
                        <div className="rounded-xl p-2.5 border border-blue-200 bg-blue-50/40">
                          <p className="text-[11px] text-blue-600 mb-0.5 font-medium">
                            Saldo Restante Post-Pago (Seguirá en Crédito)
                          </p>
                          <p className="text-xl font-bold text-blue-600">{fmt(pendingDebt)}</p>
                        </div>
                      ) : (
                        <div className="rounded-xl p-2.5 border border-emerald-200 bg-emerald-50/40 flex items-center gap-2">
                          <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-emerald-700">¡Deuda Liquidada por completo!</p>
                            <p className="text-[10px] text-emerald-600">
                              El estado de la venta cambiará a PAGADO automáticamente.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FooterModal>
            <ModernButton type="button" variant="outline" onClick={onClose}>
              Cancelar
            </ModernButton>
            <ModernButton type="submit" disabled={!canSubmit} variant="primary" icon={ArrowRight}>
              Registrar Amortización
            </ModernButton>
          </FooterModal>
        </form>
      )}
    </Modal>
  );
}

// ── COMPONENTE HIJO OPTIMIZADO PARA LA FILA DE PAGOS ──
function PaymentRow({ payment, canRemove, onUpdate, onRemove }) {
  const currentMethodObj =
    PAYMENT_METHODS.find((m) => m.backendMethodId === Number(payment.paymentMethodId)) || PAYMENT_METHODS[0];

  const needsRef = NEED_REFERENCE.includes(currentMethodObj.value);

  return (
    <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-2.5 flex flex-col md:flex-row items-stretch md:items-start gap-2 bg-white dark:bg-slate-900">
      {/* Botones selectores de tipo de pago */}
      <div className="grid grid-cols-5 gap-1 flex-1">
        {PAYMENT_METHODS.map((m) => {
          const MIcon = m.icon;
          const sel = Number(payment.paymentMethodId) === m.backendMethodId;
          return (
            <button
              key={m.backendMethodId}
              type="button"
              onClick={() => onUpdate(payment.id, "paymentMethodId", m.backendMethodId)}
              className={`h-11 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all ${
                sel
                  ? "border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                  : "border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <MIcon size={14} />
              <span className="text-[9px] leading-none">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Inputs de montos y referencias de transacciones bancarias */}
      <div className="w-full md:w-44 shrink-0 flex flex-col gap-1.5">
        <Input
          label="Monto Abonado (S/)"
          type="number"
          min="0.01"
          step="any" // 🎯 OPTIMIZACIÓN: Permite cualquier cantidad de céntimos sin romper la validación HTML5
          value={payment.amount ?? ""}
          onChange={(e) => onUpdate(payment.id, "amount", e.target.value)}
          required
        />
        {needsRef && (
          <Input
            label="N° Operación / Ref"
            type="text"
            placeholder="Ej. 20193821"
            value={payment.reference || ""}
            onChange={(e) => onUpdate(payment.id, "reference", e.target.value)}
            required
          />
        )}
      </div>

      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(payment.id)}
          className="md:mt-5 h-9 w-full md:w-9 shrink-0 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
