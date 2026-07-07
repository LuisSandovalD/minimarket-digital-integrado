// ========================================
// features/payments/components/PaymentDetailModal.jsx
// ========================================

import {
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Hash,
  Receipt,
  StickyNote,
  X,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import PaymentStatusBadge from "./PaymentStatusBadge";

export default function PaymentDetailModal({ open, onClose, payment }) {
  if (!payment) return null;

  // Formateador interno rápido
  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });

  const isSale = !!payment.sale;

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <HeaderModal
        title="Detalle del Pago"
        subtitle="Información completa de la transacción registrada."
        onClose={onClose}
      />

      <div className="max-h-[72vh] overflow-y-auto space-y-8 px-6 py-6">
        {/* INFORMACIÓN GENERAL */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <Receipt className="text-slate-500" size={20} />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Información General
              </h3>
              <p className="text-xs text-slate-500">
                Datos principales del pago y montos
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* ID */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
                <Hash size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  ID del Pago
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                #{payment.id}
              </p>
            </div>

            {/* MONTO */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
                <BadgeDollarSign size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Monto
                </span>
              </div>
              <p
                className={`text-sm font-bold ${isSale ? "text-emerald-600" : "text-red-500"}`}
              >
                {isSale ? "+ " : "- "} {formatCurrency(payment.amount)}
              </p>
            </div>

            {/* MÉTODO */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
                <CreditCard size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Método de Pago
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {payment.method?.name || "No especificado"}
              </p>
            </div>
          </div>
        </section>

        {/* FLUJO Y ORIGEN */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <FileText className="text-slate-500" size={20} />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Origen y Relación
              </h3>
              <p className="text-xs text-slate-500">
                Documento comercial enlazado a esta caja
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* TIPO */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
                <Receipt size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Tipo de Flujo
                </span>
              </div>
              <span
                className={`inline-flex items-center rounded-xl px-2.5 py-0.5 text-xs font-semibold ${
                  isSale
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    : "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                }`}
              >
                {isSale
                  ? "Venta (Ingreso)"
                  : payment.purchase
                    ? "Compra (Egreso)"
                    : "General"}
              </span>
            </div>

            {/* NÚMERO DOCUMENTO */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
                <FileText size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Número de Folio / Referencia
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {(isSale
                  ? payment.sale?.saleNumber
                  : payment.purchase?.purchaseNumber) ||
                  payment.reference ||
                  "-"}
              </p>
            </div>
          </div>
        </section>

        {/* ESTADO Y AUDITORÍA */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-slate-500" size={20} />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Estado y Auditoría
              </h3>
              <p className="text-xs text-slate-500">
                Situación del pago y marcas de tiempo
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* BADGE ESTADO */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
                <CheckCircle2 size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Estado Actual
                </span>
              </div>
              <div className="mt-1">
                <PaymentStatusBadge status={payment.status} />
              </div>
            </div>

            {/* FECHA */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
                <CalendarDays size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Fecha de Registro
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {payment.createdAt
                  ? new Date(
                      payment.paidAt || payment.createdAt,
                    ).toLocaleString("es-PE")
                  : "-"}
              </p>
            </div>
          </div>
        </section>

        {/* NOTAS / GLOSA */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <StickyNote className="text-slate-500" size={20} />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Observaciones Internas
              </h3>
              <p className="text-xs text-slate-500">
                Detalles adicionales agregados en caja
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2">
              <StickyNote size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Notas
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
              {payment.notes || "Sin observaciones registradas."}
            </p>
          </div>
        </section>
      </div>

      <FooterModal>
        <div className="flex w-full items-center justify-end gap-3 pb-5">
          <ModernButton
            type="button"
            text="Cerrar"
            variant="outline"
            icon={X}
            onClick={onClose}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
