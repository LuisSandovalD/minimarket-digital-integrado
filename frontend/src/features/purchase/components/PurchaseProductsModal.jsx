// ========================================
// features/purchase/components/PurchaseProductsModal.jsx
// ========================================

import { Barcode, Boxes, DollarSign, Package, X } from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

export default function PurchaseProductsModal({ open, onClose, purchase }) {
  const details = Array.isArray(purchase?.details) ? purchase.details : [];

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));
  };

  return (
    <Modal open={open} onClose={onClose} size="lg">
      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal
        title="Productos de la Compra"
        subtitle={purchase?.purchaseNumber || "Detalle completo"}
        onClose={onClose}
      />

      {/* ========================================
       * BODY
       * ====================================== */}

      <div
        className="
          px-6
          py-6
          max-h-[70vh]
          overflow-y-auto
          space-y-4
        "
      >
        {details.length > 0 ? (
          details.map((detail) => (
            <div
              key={detail.id}
              className="
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-950
                p-5
                shadow-sm
              "
            >
              {/* PRODUCT */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div className="flex gap-3">
                  <div
                    className="
                      h-12
                      w-12
                      rounded-xl
                      bg-slate-100
                      dark:bg-slate-800
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Package size={20} className="text-slate-500" />
                  </div>

                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                        dark:text-white
                      "
                    >
                      {detail.product?.name || "Producto"}
                    </h3>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      <Barcode size={13} />
                      SKU: {detail.product?.sku || "-"}
                    </div>
                  </div>
                </div>

                <div
                  className="
                    text-right
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Subtotal
                  </p>

                  <p
                    className="
                      text-lg
                      font-bold
                      text-blue-600
                    "
                  >
                    {formatPrice(
                      Number(detail.quantity || 0) * Number(detail.price || 0),
                    )}
                  </p>
                </div>
              </div>

              {/* INFO */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-4
                "
              >
                {/* QUANTITY */}

                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-slate-500
                      mb-2
                    "
                  >
                    <Boxes size={14} />

                    <span className="text-xs">Cantidad</span>
                  </div>

                  <p
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    {detail.quantity}
                  </p>
                </div>

                {/* PRICE */}

                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-slate-500
                      mb-2
                    "
                  >
                    <DollarSign size={14} />

                    <span className="text-xs">Precio Compra</span>
                  </div>

                  <p
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    {formatPrice(detail.price)}
                  </p>
                </div>

                {/* STOCK */}

                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-slate-500
                      mb-2
                    "
                  >
                    <Package size={14} />

                    <span className="text-xs">Stock Actual</span>
                  </div>

                  <p
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    {detail.quantity || 0}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="
              py-16
              text-center
              text-slate-400
            "
          >
            No hay productos registrados
          </div>
        )}
      </div>

      {/* ========================================
       * FOOTER
       * ====================================== */}

      <FooterModal>
        <div className="flex justify-end w-full">
          <ModernButton
            type="button"
            text="Cerrar"
            icon={X}
            onClick={onClose}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
