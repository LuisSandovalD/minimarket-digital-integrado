// ============================================================================
// features/purchase/components/modals/PurchaseCartModal.jsx
// MODERNO Y OPTIMIZADO: Agregado soporte para Lote y Fecha de Vencimiento
// ============================================================================

import {
  Calendar,
  DollarSign,
  Layers,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

export default function PurchaseCartModal({
  open,
  onClose,
  details = [],
  totalAmount = 0,
  totalUnits = 0,
  updateQty,
  updateCostPrice,
  updateBatchNumber, // <-- Nueva Prop
  updateExpirationDate, // <-- Nueva Prop
  removeItem,
  fmt,
}) {
  return (
    <Modal open={open} onClose={onClose} size="xl">
      <HeaderModal
        title="Productos de la Compra"
        subtitle={`${totalUnits} productos agregados`}
        onClose={onClose}
      />

      <div className="min-h-[500px] max-h-[65vh] overflow-y-auto p-6 bg-slate-50/30 dark:bg-slate-900/10">
        {details.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <ShoppingCart size={28} className="text-slate-400" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">
              Sin productos
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Agrega productos para continuar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {details.map((item) => (
              <div
                key={item.productId}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 bg-white dark:bg-slate-950 shadow-sm"
              >
                {/* HEADER DEL PRODUCTO */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {item.productName}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      SKU: {item.sku || "-"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* FILA 1: CANTIDAD, COSTO Y SUBTOTAL */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* CANTIDAD */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Cantidad
                    </label>
                    <div className="mt-1 flex items-center border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-11 bg-white dark:bg-slate-950">
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, -1)}
                        className="px-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 h-full transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="flex-1 text-center font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {item.quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, 1)}
                        className="px-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 h-full transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* COSTO */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Costo Compra
                    </label>
                    <div className="relative mt-1">
                      <DollarSign
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.costPrice || ""}
                        onChange={(e) =>
                          updateCostPrice(item.productId, e.target.value)
                        }
                        className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-9 pr-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* SUBTOTAL */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Subtotal
                    </label>
                    <div className="h-11 mt-1 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 flex items-center px-4 font-bold text-sm text-slate-700 dark:text-slate-300">
                      {fmt(
                        Number(item.quantity || 0) *
                          Number(item.costPrice || 0),
                      )}
                    </div>
                  </div>
                </div>

                {/* FILA 2 (NUEVA): LOTE Y VENCIMIENTO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-dashed border-slate-100 dark:border-slate-900">
                  {/* NÚMERO DE LOTE */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Layers size={12} className="opacity-70" />
                      Número de Lote
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: LOT-2026-X98"
                      value={item.batchNumber || ""}
                      onChange={(e) =>
                        updateBatchNumber(item.productId, e.target.value)
                      }
                      className="w-full h-11 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-blue-500 transition-all uppercase"
                    />
                  </div>

                  {/* FECHA DE VENCIMIENTO */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Calendar size={12} className="opacity-70" />
                      Fecha de Vencimiento
                    </label>
                    <input
                      type="date"
                      value={item.expirationDate || ""}
                      onChange={(e) =>
                        updateExpirationDate(item.productId, e.target.value)
                      }
                      className="w-full h-11 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* DETALLES DE STOCK */}
                <div className="mt-3.5 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <Package size={13} />
                  <span>Stock actual en sistema:</span>
                  <strong className="text-slate-600 dark:text-slate-400">
                    {item.stock || 0} und.
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterModal>
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Compra
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {fmt(totalAmount)}
            </p>
          </div>
          <ModernButton text="Continuar" onClick={onClose} />
        </div>
      </FooterModal>
    </Modal>
  );
}
