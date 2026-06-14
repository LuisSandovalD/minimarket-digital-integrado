// ========================================
// features/purchase/components/steps/PurchaseProductsStep.jsx
// ========================================

import { Plus, Search, ShoppingCart } from "lucide-react";

import { usePurchaseProductsStep } from "../../hooks/usePurchaseProductsStep.js";

import PurchaseCartModal from "../modals/CartModal.jsx";

export default function ProductsStep({ products = [], form, setForm }) {
  const {
    search,
    setSearch,

    cartOpen,
    setCartOpen,

    filteredProducts,

    cart,

    fmt,
  } = usePurchaseProductsStep({
    products,
    form,
    setForm,
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ========================================
       * SEARCH
       * ====================================== */}

      <div className="p-5">
        <div className="relative">
          <Search
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto por nombre o SKU..."
            className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-950
              pl-10
              pr-4
              text-sm
              outline-none
            "
          />
        </div>
      </div>

      {/* ========================================
       * PRODUCTS
       * ====================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-5
          pb-5
          space-y-3
        "
      >
        {filteredProducts.map((product) => {
          const qty = cart.getQty(product.id);

          const stock = Number(product.totalStock ?? product.stock ?? 0);

          return (
            <div
              key={product.id}
              className="
                border
                rounded-2xl
                p-4
                flex
                items-center
                justify-between
                gap-4
                bg-white
                dark:bg-slate-950
              "
            >
              {/* INFO */}

              <div className="flex-1 min-w-0">
                <h4
                  className="
                    font-semibold
                    text-sm
                    truncate
                  "
                >
                  {product.name}
                </h4>

                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-1
                  "
                >
                  SKU: {product.sku || "-"}
                </p>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    mt-3
                  "
                >
                  <span
                    className="
                      text-xs
                      px-2
                      py-1
                      rounded-full
                      bg-blue-50
                      text-blue-600
                    "
                  >
                    Compra: {fmt(product.purchasePrice)}
                  </span>

                  <span
                    className="
                      text-xs
                      px-2
                      py-1
                      rounded-full
                      bg-green-50
                      text-green-600
                    "
                  >
                    Venta: {fmt(product.salePrice)}
                  </span>

                  <span
                    className="
                      text-xs
                      px-2
                      py-1
                      rounded-full
                      bg-slate-100
                      text-slate-600
                    "
                  >
                    Stock: {stock}
                  </span>

                  {qty > 0 && (
                    <span
                      className="
                        text-xs
                        px-2
                        py-1
                        rounded-full
                        bg-indigo-50
                        text-indigo-600
                        font-semibold
                      "
                    >
                      Seleccionado: {qty}
                    </span>
                  )}
                </div>
              </div>

              {/* ADD */}

              <button
                type="button"
                onClick={() => cart.addProduct(product)}
                className="
                  h-10
                  w-10
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <Plus size={18} />
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
          border-t
          px-5
          py-4
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              text-slate-500
            "
          >
            Productos agregados
          </p>

          <p
            className="
              font-semibold
              text-lg
            "
          >
            {cart.totalUnits}
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
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
          "
        >
          <ShoppingCart size={16} />
          Carrito
          <span
            className="
              h-5
              min-w-[20px]
              px-1
              rounded-full
              bg-white
              text-blue-600
              text-xs
              font-bold
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
       * CART
       * ====================================== */}

      <PurchaseCartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        details={cart.details}
        totalAmount={cart.totalAmount}
        totalUnits={cart.totalUnits}
        updateQty={cart.updateQty}
        updateCostPrice={cart.updateCostPrice}
        removeItem={cart.removeItem}
        fmt={fmt}
      />
    </div>
  );
}
