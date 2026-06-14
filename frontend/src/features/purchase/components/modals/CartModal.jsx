// ========================================
// features/purchase/components/modals/PurchaseCartModal.jsx
// ========================================

import {
  DollarSign,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

import { ModernButton } from "@/components/buttons";

export default function PurchaseCartModal({
  open,
  onClose,

  details = [],

  totalAmount = 0,
  totalUnits = 0,

  updateQty,
  updateCostPrice,
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

      <div className="min-h-[500px] max-h-[65vh] overflow-y-auto p-6">
        {details.length === 0 ? (
          <div
            className="
              h-full
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <div
              className="
                h-16
                w-16
                rounded-2xl
                bg-slate-100
                dark:bg-slate-900
                flex
                items-center
                justify-center
              "
            >
              <ShoppingCart size={28} className="text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold">Sin productos</h3>

            <p className="text-sm text-slate-500 mt-2">
              Agrega productos para continuar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {details.map((item) => (
              <div
                key={item.productId}
                className="
                  rounded-2xl
                  border
                  p-4
                  bg-white
                  dark:bg-slate-950
                "
              >
                {/* HEADER */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div className="flex-1">
                    <h4
                      className="
                        font-semibold
                        text-sm
                      "
                    >
                      {item.productName}
                    </h4>

                    <p
                      className="
                        text-xs
                        text-slate-500
                        mt-1
                      "
                    >
                      SKU: {item.sku || "-"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="
                      text-red-500
                      hover:opacity-70
                    "
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* CONTROLS */}

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                    mt-4
                  "
                >
                  {/* CANTIDAD */}

                  <div>
                    <label
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Cantidad
                    </label>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        border
                        rounded-xl
                        overflow-hidden
                      "
                    >
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, -1)}
                        className="
                          px-3
                          py-2
                        "
                      >
                        <Minus size={14} />
                      </button>

                      <div
                        className="
                          flex-1
                          text-center
                          font-semibold
                        "
                      >
                        {item.quantity}
                      </div>

                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, 1)}
                        className="
                          px-3
                          py-2
                        "
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* COSTO */}

                  <div>
                    <label
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Costo Compra
                    </label>

                    <div className="relative mt-1">
                      <DollarSign
                        size={14}
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.costPrice}
                        onChange={(e) =>
                          updateCostPrice(item.productId, e.target.value)
                        }
                        className="
                          w-full
                          h-11
                          rounded-xl
                          border
                          pl-9
                          pr-3
                          text-sm
                          outline-none
                        "
                      />
                    </div>
                  </div>

                  {/* SUBTOTAL */}

                  <div>
                    <label
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Subtotal
                    </label>

                    <div
                      className="
                        h-11
                        mt-1
                        rounded-xl
                        border
                        flex
                        items-center
                        px-4
                        font-semibold
                      "
                    >
                      {fmt(Number(item.quantity) * Number(item.costPrice))}
                    </div>
                  </div>
                </div>

                {/* STOCK */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-slate-500
                  "
                >
                  <Package size={13} />
                  Stock actual:
                  <strong>{item.stock || 0}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterModal>
        <div
          className="
            flex
            items-center
            justify-between
            w-full
          "
        >
          <div>
            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Total Compra
            </p>

            <p
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              {fmt(totalAmount)}
            </p>
          </div>

          <ModernButton text="Continuar" onClick={onClose} />
        </div>
      </FooterModal>
    </Modal>
  );
}
