import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

import { ModernButton } from "@/components/buttons";

export default function PaymentDetailModal({ open, onClose, payment }) {
  if (!payment) return null;

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <HeaderModal title="Detalle de Pago" onClose={onClose} />

      <div className="p-6 space-y-3">
        <p>
          <b>ID:</b> {payment.id}
        </p>

        <p>
          <b>Monto:</b> S/ {payment.amount}
        </p>

        <p>
          <b>Estado:</b> {payment.status}
        </p>

        <p>
          <b>Método:</b> {payment.method?.name}
        </p>

        <p>
          <b>Venta:</b> {payment.sale?.saleNumber}
        </p>

        <p>
          <b>Referencia:</b> {payment.reference || "-"}
        </p>

        <p>
          <b>Notas:</b> {payment.notes || "-"}
        </p>
      </div>

      <FooterModal>
        <ModernButton text="Cerrar" onClick={onClose} />
      </FooterModal>
    </Modal>
  );
}
