import { AlertTriangle } from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

export default function SaleCancelModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="sm">
      <HeaderModal title="Cancelar Venta" onClose={onClose} />

      <div className="p-6">
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              justify-center

              h-10
              w-10

              rounded-xl

              bg-amber-100
              dark:bg-amber-500/10
            "
          >
            <AlertTriangle
              size={20}
              className="
                text-amber-600
              "
            />
          </div>

          <div>
            <h4
              className="
                font-semibold
                mb-1
              "
            >
              ¿Cancelar venta actual?
            </h4>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Se perderán los productos agregados, los datos del cliente y la
              información de pago registrada.
            </p>
          </div>
        </div>
      </div>

      <FooterModal>
        <div className="flex justify-end gap-2">
          <ModernButton text="Continuar venta" onClick={onClose} />

          <ModernButton
            variant="danger"
            text="Sí, cancelar"
            onClick={onConfirm}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
