import { SearchInput } from "@/components/forms/";
import { Box, Layers, Plus, ShoppingCart, Tag } from "lucide-react";
import { usePurchaseProductsStep } from "../../hooks/usePurchaseProductsStep.js";
import PurchaseCartModal from "../modals/PurchaseCartModal.jsx";

export default function ProductsStep({ products = [], form, setForm }) {
  const { search, setSearch, cartOpen, setCartOpen, filteredProducts, cart, fmt } = usePurchaseProductsStep({
    products,
    form,
    setForm,
  });

  return (
    <div className="w-full flex-1 flex flex-col bg-transparent min-h-0 overflow-hidden">
      {/* ========================================
       * SEARCH BAR — Contenedor translúcido y limpio
       * ====================================== */}
      <div className=" flex flex-col gap-4lg:flex-row ">
        <SearchInput
          placeholder="Buscar insumos o productos por nombre o SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ========================================
       * PRODUCTS LIST / GRID CONTAINER — Scroll Transparente
       * ====================================== */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className=" space-y-3 pb-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const qty = cart.getQty(product.id);
              const stock = Number(product.totalStock ?? product.stock ?? 0);

              return (
                <div
                  key={product.id}
                  className="group relative border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 flex items-center justify-between gap-4 bg-white/60 dark:bg-slate-950/40 backdrop-blur-sm shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80"
                >
                  {/* PRODUCT INFORMATION */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 dark:text-slate-500">
                      <Tag size={12} className="opacity-70" />
                      <span>SKU: {product.sku || "Sin código"}</span>
                    </div>

                    {/* STATUS PILLS ROW */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-blue-50/60 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/30 dark:border-blue-500/10">
                        Costo: {fmt(product.purchasePrice)}
                      </span>

                      <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-50/50 text-slate-600 dark:bg-white/[0.02] dark:text-slate-400 border border-slate-200/40 dark:border-white/[0.04]">
                        Venta: {fmt(product.salePrice)}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-lg border ${
                          stock <= 5
                            ? "bg-amber-50/60 text-amber-700 border-amber-200/40 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/10"
                            : "bg-slate-50/50 text-slate-600 border-slate-200/40 dark:bg-white/[0.02] dark:text-slate-400 dark:border-white/[0.04]"
                        }`}
                      >
                        <Layers size={11} className="opacity-70" />
                        Stock: {stock}
                      </span>

                      {qty > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-emerald-50/80 text-emerald-700 border border-emerald-200/40 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/10 animate-in scale-in duration-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          En Carrito: {qty}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ADD TO CART ACTION */}
                  <button
                    type="button"
                    onClick={() => cart.addProduct(product)}
                    className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center transition-all duration-200 hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.98] shadow-sm shadow-blue-500/10 dark:shadow-none shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              );
            })
          ) : (
            /* EMPTY STATE VIEW */
            <div className="py-14 text-center border border-dashed border-slate-200/80 dark:border-slate-800/80 rounded-2xl bg-white/30 dark:bg-slate-950/10 backdrop-blur-xs max-w-2xl mx-auto">
              <Box size={28} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No se encontraron artículos</p>
              <p className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">
                Intenta buscar con otros términos o códigos de barra.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
       * FLOATING CART ACTIONS BAR — Integración fluida inferior
       * ====================================== */}
      <div className="border-t border-slate-200/60 dark:border-slate-800/60 py-4 bg-transparent">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Unidades Solicitadas
            </p>
            <p className="font-bold text-xl text-slate-800 dark:text-slate-100 mt-0.5">
              {cart.totalUnits} <span className="text-xs font-normal text-slate-400 dark:text-slate-500">und.</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-5 h-11 rounded-xl bg-blue-600 text-white font-medium text-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98]"
          >
            <ShoppingCart size={16} />
            <span>Revisar Carrito</span>
            <span className="h-5 min-w-[20px] px-1.5 rounded-lg bg-white text-blue-600 text-xs font-bold flex items-center justify-center shadow-sm ml-0.5">
              {cart.totalUnits}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================
       * CART MODAL WINDOW
       * ====================================== */}
      <PurchaseCartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        details={cart.details}
        totalAmount={cart.totalAmount}
        totalUnits={cart.totalUnits}
        updateQty={cart.updateQty}
        updateCostPrice={cart.updateCostPrice}
        updateBatchNumber={cart.updateBatchNumber}
        updateExpirationDate={cart.updateExpirationDate}
        removeItem={cart.removeItem}
        fmt={fmt}
      />
    </div>
  );
}
