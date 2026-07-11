// ========================================
// features/inventory/components/StockAdjustmentModal.jsx
// ========================================

import { Box, FileText, Layers, Store, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton, SubmitButton } from "@/components/buttons";
import { Input } from "@/components/forms/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

export default function StockAdjustmentModal({
  isOpen,
  onClose,
  type, // "ADD" | "REMOVE" | "DAMAGED"
  inventoryItem, // El objeto de inventario seleccionado de la fila
  onSubmit, // Función del hook que llamará al servicio correspondiente
  actionLoading = false,
}) {
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  // Reiniciar el formulario cada vez que se abre para un item diferente
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setReason("");
    }
  }, [isOpen, inventoryItem]);

  if (!isOpen || !inventoryItem) return null;

  // Configuration map dinámico según el tipo de ajuste
  const config =
    {
      ADD: {
        title: "Agregar Stock",
        subtitle: "Incrementa las unidades físicas disponibles en el almacén.",
        submitLabel: "Incrementar Stock",
      },
      REMOVE: {
        title: "Remover Stock",
        subtitle:
          "Descuenta unidades del inventario por ajuste manual o merma.",
        submitLabel: "Descontar Stock",
      },
      DAMAGED: {
        title: "Registrar Stock Dañado",
        subtitle:
          "Mueve unidades del stock disponible al registro de mermas/daños.",
        submitLabel: "Reportar Daño",
      },
    }[type] || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity <= 0) return;

    onSubmit(inventoryItem.id, {
      quantity: Number(quantity),
      reason: reason.trim() || `Ajuste manual de ${type.toLowerCase()}`,
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      {/* HEADER DEL MODAL COMPARTIDO (Limbo) */}
      <HeaderModal
        title={config.title}
        subtitle={config.subtitle}
        onClose={onClose}
      />

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="max-h-[72vh] overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* INFORMACIÓN DEL ITEM (Sin contenedor visual, patrón lineal) */}
            <div className="space-y-5">
              <Input
                label="Producto Afectado"
                value={inventoryItem.product?.name || ""}
                readOnly
                disabled
                icon={Box}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  label="Sucursal"
                  value={inventoryItem.branch?.name || ""}
                  readOnly
                  disabled
                  icon={Store}
                />

                <Input
                  label="Stock Actual Físico"
                  value={`${inventoryItem.stock || 0} u.`}
                  readOnly
                  disabled
                  icon={Layers}
                  // Puedes añadir una clase específica para resaltar el stock si tu componente Input lo permite,
                  // ej: className="font-bold text-slate-950 dark:text-white"
                />
              </div>
            </div>

            {/* SEPARADOR LINEAL (Opcional, si quieres marcar una división sutil) */}
            <hr className="border-slate-200/60 dark:border-slate-800/60" />

            {/* CAMPOS DE FORMULARIO (Patrón lineal directo) */}
            <div className="space-y-5">
              {/* CANTIDAD */}
              <Input
                type="number"
                label="Cantidad de unidades"
                name="quantity"
                min="1"
                required
                disabled={actionLoading}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Ej: 10"
                icon={Layers}
              />

              {/* MOTIVO / JUSTIFICACIÓN */}
              <div className="flex flex-col">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <FileText size={13} className="text-slate-400" />
                  Motivo / Justificación
                </label>
                <textarea
                  required
                  rows="3"
                  disabled={actionLoading}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="
                    w-full rounded-2xl border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white
                    focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400
                    disabled:opacity-50 transition-colors resize-none shadow-sm
                  "
                  placeholder="Describa el motivo del ajuste para el historial de auditoría..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER DEL MODAL COMPARTIDO */}
        <FooterModal>
          <div className="flex w-full items-center justify-between gap-4 pb-5">
            <div className="hidden text-xs text-slate-500 sm:block">
              Esta acción genera un movimiento inmediato en la bitácora física.
            </div>

            <div className="ml-auto flex items-center gap-3">
              <ModernButton
                type="button"
                text="Cancelar"
                variant="outline"
                icon={X}
                onClick={onClose}
                disabled={actionLoading}
              />

              <SubmitButton
                text={config.submitLabel}
                loading={actionLoading}
                disabled={quantity <= 0}
              />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
