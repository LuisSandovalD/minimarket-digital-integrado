// ========================================
// features/sales/components/SaleCancelModal.jsx
// ========================================

import { AlertTriangle, ArrowLeft, X } from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

export default function SaleCancelModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <HeaderModal
        icon={AlertTriangle}
        title="Cancelar Venta"
        subtitle="Confirma la acción para limpiar la orden de venta."
        onClose={onClose}
      />

      {/* CONTENEDOR PRINCIPAL CON ESPACIADO EQUILIBRADO Y SUAVE */}
      <div className="px-6 py-6 text-slate-800 dark:text-slate-100">
        <div className="rounded-2xl border border-amber-200/60 dark:border-amber-500/10 bg-amber-50/50 dark:bg-amber-500/5 p-5 flex items-start gap-4">
          {/* CONTENEDOR DEL ÍCONO DE ALERTA */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
            <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />
          </div>

          {/* CONTENIDO DEL TEXTO */}
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              ¿Seguro que deseas cancelar la venta actual?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Si continúas, se vaciará por completo el carrito de compras, se descartarán los datos del cliente y
              cualquier información de pago registrada hasta el momento.
            </p>
          </div>
        </div>
      </div>

      {/* PIE DE PÁGINA */}
      <FooterModal>
        <div className="flex w-full items-center justify-end gap-3 pb-3 pt-1">
          <ModernButton
            type="button"
            text="Continuar venta"
            variant="outline"
            icon={ArrowLeft}
            onClick={onClose}
            size="sm"
          />
          <ModernButton
            type="button"
            variant="danger" // Variante destructiva roja para la confirmación
            text="Sí, cancelar venta"
            icon={X}
            onClick={onConfirm}
            size="sm"
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
