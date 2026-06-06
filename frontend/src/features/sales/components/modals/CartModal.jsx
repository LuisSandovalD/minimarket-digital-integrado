// ========================================
// features/sales/components/modals/CartModal.jsx
// ========================================

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

import { ModernButton } from "@/components/buttons";

export default function CartModal({
  open,
  onClose,

  details = [],

  totalAmount = 0,
  totalUnits = 0,

  updateQty,
  removeItem,

  fmt,
}) {
  return (
    <Modal open={open} onClose={onClose} size="lg">
      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal
        title="Carrito"
        subtitle={`${totalUnits} productos seleccionados`}
        onClose={onClose}
      />

      {/* ========================================
       * CONTENT
       * ====================================== */}

      <div className="min-h-[450px] max-h-[60vh] overflow-y-auto p-6">
        {details.length === 0 ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center

              h-full

              text-center
            "
          >
            <div
              className="
                h-16
                w-16

                rounded-2xl

                flex
                items-center
                justify-center

                bg-slate-100
                dark:bg-slate-900
              "
            >
              <ShoppingCart
                size={28}
                className="
                  text-slate-400
                "
              />
            </div>

            <h3
              className="
                mt-4

                text-base
                font-semibold

                text-slate-800
                dark:text-slate-200
              "
            >
              Carrito vacío
            </h3>

            <p
              className="
                mt-2

                text-sm

                text-slate-500
              "
            >
              Agrega productos para continuar.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {details.map((item) => (
              <div
                key={item.productId}
                className="
                  flex
                  items-center
                  gap-4

                  rounded-2xl

                  border
                  border-slate-200/80
                  dark:border-slate-800

                  bg-white/70
                  dark:bg-slate-950/60

                  backdrop-blur-xl

                  p-4
                "
              >
                {/* INFO */}

                <div className="flex-1 min-w-0">
                  <p
                    className="
                      text-sm
                      font-semibold

                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {item.productName}
                  </p>

                  <p
                    className="
                      mt-1

                      text-xs

                      text-slate-500
                    "
                  >
                    {fmt(item.unitPrice)} c/u
                  </p>
                </div>

                {/* QTY */}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQty(item.productId, -1)}
                    className="
                      h-8
                      w-8

                      rounded-xl

                      border
                      border-slate-200
                      dark:border-slate-700

                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Minus size={14} />
                  </button>

                  <span
                    className="
                      min-w-[28px]

                      text-center
                      font-medium
                    "
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQty(item.productId, 1)}
                    disabled={item.quantity >= item.stock}
                    className="
                      h-8
                      w-8

                      rounded-xl

                      border
                      border-slate-200
                      dark:border-slate-700

                      flex
                      items-center
                      justify-center

                      disabled:opacity-30
                    "
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* SUBTOTAL */}

                <div
                  className="
                    w-28

                    text-right

                    font-semibold

                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  {fmt(item.subtotal)}
                </div>

                {/* DELETE */}

                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="
                    h-9
                    w-9

                    rounded-xl

                    flex
                    items-center
                    justify-center

                    text-red-500

                    hover:bg-red-50
                    dark:hover:bg-red-950/30
                  "
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================
       * FOOTER
       * ====================================== */}

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
              Total
            </p>

            <p
              className="
                text-2xl
                font-bold

                text-slate-900
                dark:text-white
              "
            >
              {fmt(totalAmount)}
            </p>
          </div>

          <ModernButton text="Cerrar" onClick={onClose} />
        </div>
      </FooterModal>
    </Modal>
  );
}
