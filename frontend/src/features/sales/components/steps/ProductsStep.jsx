// ========================================
// features/sales/modal/steps/ProductsStep.jsx
// ========================================

import { Plus, Search, ShoppingCart } from "lucide-react";
import { useProductsStep } from "../../hooks/useProductsStep";
import CartModal from "../modals/CartModal";

export default function ProductsStep({ products = [], form, setForm }) {
  const {
    search,
    setSearch,
    cartOpen,
    setCartOpen,
    filteredProducts,
    fmt,
    cart,
  } = useProductsStep({ products, form, setForm });

  return (
    <div className="flex-1 overflow-hidden flex flex-col relative">
      {/* ========================================
       * SEARCH
       * ====================================== */}
      <div className="p-4 flex-shrink-0">
        <div className="relative">
          <Search
            size={15}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-slate-400
              dark:text-slate-600
              pointer-events-none
            "
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto por nombre o SKU..."
            className="
              w-full
              h-11
              rounded-xl
              pl-10
              pr-4
              text-[13.5px]
              outline-none
              bg-white/85
              dark:bg-white/[0.05]
              border
              border-black/[0.08]
              dark:border-white/[0.07]
              text-slate-900
              dark:text-slate-100
              placeholder:text-slate-400
              dark:placeholder:text-slate-600
              backdrop-blur-xl
            "
          />
        </div>
      </div>

      <div className="h-px bg-black/[0.05] dark:bg-white/[0.05] flex-shrink-0" />

      {/* ========================================
       * PRODUCT LIST
       * ====================================== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
        {filteredProducts.map((product) => {
          const qty = cart.getQty(product.id);
          const stock = Number(product.totalStock ?? product.stock ?? 0);
          const remaining = stock - qty;
          const isLow = stock <= 10;

          return (
            <div
              key={product.id}
              className="
                flex
                items-center
                gap-3
                px-3
                py-2.5
                rounded-[10px]
                bg-white/80
                dark:bg-white/[0.03]
                border
                border-black/[0.06]
                dark:border-white/[0.05]
                backdrop-blur-md
                transition-all
                duration-200
                hover:bg-white
                dark:hover:bg-white/[0.05]
              "
            >
              {/* INFO */}
              <div className="flex-1 min-w-0">
                <p
                  className="
                    text-[13px]
                    font-medium
                    text-slate-900
                    dark:text-slate-100
                    truncate
                  "
                >
                  {product.name}
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-400
                    dark:text-slate-600
                    mt-0.5
                  "
                >
                  {product.sku}
                </p>

                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="
                      text-[13px]
                      font-semibold
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {fmt(product.salePrice)}
                  </span>

                  <span
                    className={`
                      text-[11px]
                      font-medium
                      px-1.5
                      py-px
                      rounded-full
                      ${
                        isLow
                          ? `
                            bg-orange-50
                            text-orange-600
                            dark:bg-orange-500/10
                            dark:text-orange-400
                          `
                          : `
                            bg-emerald-50
                            text-emerald-600
                            dark:bg-emerald-500/10
                            dark:text-emerald-400
                          `
                      }
                    `}
                  >
                    {remaining} en stock
                  </span>

                  {qty > 0 && (
                    <span
                      className="
                        text-[11px]
                        font-semibold
                        text-blue-600
                        dark:text-blue-400
                      "
                    >
                      ×{qty}
                    </span>
                  )}
                </div>
              </div>

              {/* ADD BUTTON */}
              <button
                type="button"
                onClick={() => cart.addToCart(product)}
                disabled={remaining <= 0}
                className={`
                  w-[30px]
                  h-[30px]
                  rounded-[8px]
                  flex-shrink-0
                  flex
                  items-center
                  justify-center
                  text-white
                  transition-all
                  active:scale-95
                  disabled:opacity-30
                  disabled:pointer-events-none
                  ${
                    qty > 0
                      ? `
                        bg-emerald-600
                        hover:bg-emerald-700
                      `
                      : `
                        bg-blue-600
                        hover:bg-blue-700
                      `
                  }
                `}
              >
                <Plus size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* ========================================
       * FOOTER
       * ====================================== */}
      <div
        className="
          px-4
          py-3
          border-t
          border-black/[0.05]
          dark:border-white/[0.05]
          flex
          items-center
          justify-between
          flex-shrink-0
        "
      >
        <div>
          <p
            className="
              text-[11px]
              text-slate-400
              dark:text-slate-600
            "
          >
            Total
          </p>

          <p
            className="
              text-[16px]
              font-semibold
              text-slate-900
              dark:text-slate-100
            "
          >
            {fmt(cart.totalAmount)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            text-[13px]
            font-medium
            transition-colors
          "
        >
          <ShoppingCart size={15} />
          Carrito
          <span
            className="
              bg-white
              text-blue-600
              text-[11px]
              font-bold
              w-[18px]
              h-[18px]
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {cart.totalUnits}
          </span>
        </button>
      </div>

      {/* ========================================
       * CART MODAL
       * ====================================== */}
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        details={cart.details}
        totalUnits={cart.totalUnits}
        totalAmount={cart.totalAmount}
        updateQty={cart.updateQty}
        removeItem={cart.removeItem}
        fmt={fmt}
      />
    </div>
  );
}
