// ========================================
// features/sales/components/modals/SaleReturnModal.jsx
// ========================================

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

export default function SaleReturnModal({ open, onClose, sale, onSubmit }) {
  const [quantitiesToReturn, setQuantitiesToReturn] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Inicializar o resetar las cantidades a devolver al abrir el modal con una venta
  useEffect(() => {
    if (sale?.details) {
      const initialQuantities = {};
      sale.details.forEach((item) => {
        // Por defecto sugerimos 0 para que el usuario elija proactivamente cuánto devolver
        initialQuantities[item.id] = 0;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuantitiesToReturn(initialQuantities);
    }
  }, [sale, open]);

  // Protección crítica de renderizado asíncrono
  if (!open || !sale) return null;

  const handleQuantityChange = (itemId, maxQty, value) => {
    const qty = Math.max(0, Math.min(maxQty, Number(value || 0)));
    setQuantitiesToReturn((prev) => ({
      ...prev,
      [itemId]: qty,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Estructurar los ítems filtrando solo los que tienen una cantidad a devolver mayor a cero
    const itemsToReturn = sale.details
      .map((item) => ({
        saleDetailId: item.id,
        productId: item.product?.id,
        quantity: quantitiesToReturn[item.id] || 0,
      }))
      .filter((item) => item.quantity > 0);

    if (itemsToReturn.length === 0) {
      alert(
        "Por favor, selecciona al menos un producto con una cantidad mayor a 0 para devolver.",
      );
      return;
    }

    try {
      setLoadingSubmit(true);
      await onSubmit?.({
        saleId: sale.id,
        items: itemsToReturn,
      });
      onClose();
    } catch (error) {
      console.error("Error al procesar la devolución:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="xl">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <HeaderModal
          title={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                <RotateCcw size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Procesar Devolución
                </h3>
                <p className="text-xs text-slate-500">
                  Documento Origen:{" "}
                  <span className="font-mono font-medium">
                    {sale.saleNumber}
                  </span>
                </p>
              </div>
            </div>
          }
          onClose={onClose}
          customHeader
          subtitle=""
        />

        {/* LISTADO DE PRODUCTOS ELEGIBLES PARA DEVOLVER */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-slate-500 mb-2">
            Especifica las cantidades exactas que deseas retornar al inventario.
          </p>

          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/60 bg-white dark:divide-slate-900 dark:border-slate-800 dark:bg-slate-950">
            {sale.details?.map((item) => {
              const maxAvailable = Number(item.quantity || 0);
              const currentReturnQty = quantitiesToReturn[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/10"
                >
                  {/* Detalles del Producto */}
                  <div className="space-y-0.5">
                    <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                      {item.product?.name}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span>{item.product?.sku || "Sin SKU"}</span>
                      <span>•</span>
                      <span className="font-sans">
                        Comprado:{" "}
                        <strong className="text-slate-600 dark:text-slate-300">
                          {maxAvailable}{" "}
                          {item.product?.unit?.abbreviation || "Und"}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Input Control de Cantidad */}
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <label className="text-xs text-slate-400 font-medium whitespace-nowrap">
                      Cant. a Devolver:
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        max={maxAvailable}
                        value={currentReturnQty}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            maxAvailable,
                            e.target.value,
                          )
                        }
                        className="w-24 rounded-lg border border-slate-200 px-3 py-1.5 text-center font-mono text-sm font-bold text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PIE DE ACCIONES */}
        <FooterModal>
          <div className="flex justify-end gap-3">
            <ModernButton
              text="Cancelar"
              variant="ghost"
              onClick={onClose}
              type="button"
            />
            <ModernButton
              text={loadingSubmit ? "Registrando..." : "Confirmar Devolución"}
              variant="warning" // Asumiendo variante ámbar/naranja para el flujo de re-ingreso/devolución
              loading={loadingSubmit}
              type="submit"
            />
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
