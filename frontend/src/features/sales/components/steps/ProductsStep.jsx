// ========================================
// features/sales/modal/steps/ProductsStep.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { Plus, Search, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
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

  // =========================================================================
  // 🔥 PUENTE DE SINCRONIZACIÓN CON EL BACKEND (IGV Adicionado - UI Transparente)
  // =========================================================================
  useEffect(() => {
    if (cart?.details && Array.isArray(cart.details)) {
      const detailsParaBackend = cart.details.map((item) => {
        const precioUnitario = Number(item.unitPrice || item.price || 0);
        const productoOriginal = products.find(
          (p) => Number(p.id) === Number(item.productId),
        );
        const nombreDetectado =
          item.productName || item.name || productoOriginal?.name || "Producto";

        return {
          productId: Number(item.productId),
          quantity: Number(item.quantity || 1),
          price: precioUnitario,
          productName: nombreDetectado,
          name: nombreDetectado,
          unitPrice: precioUnitario,
          stock:
            item.stock ||
            productoOriginal?.stock ||
            productoOriginal?.totalStock ||
            999,
        };
      });

      // 1. El acumulado directo de los ítems es el Subtotal (Valor Venta Neto)
      const subtotalCalculado = cart.details.reduce((acc, item) => {
        const q = Number(item.quantity || 0);
        const p = Number(item.unitPrice || item.price || 0);
        return acc + q * p;
      }, 0);

      // 2. Calculamos el impuesto (18%) de manera ascendente
      const taxCalculado = subtotalCalculado * 0.18;

      // 3. El total real que pagará el cliente incluye el IGV adicionado
      const totalAmountCalculado = subtotalCalculado + taxCalculado;

      setForm((prev) => {
        const estructuraIdentica =
          JSON.stringify(prev.details) === JSON.stringify(detailsParaBackend);
        const totalesIdenticos =
          prev.total === Number(totalAmountCalculado.toFixed(2));

        if (estructuraIdentica && totalesIdenticos) {
          return prev;
        }

        return {
          ...prev,
          details: detailsParaBackend,
          subtotal: Number(subtotalCalculado.toFixed(2)),
          tax: Number(taxCalculado.toFixed(2)),
          total: Number(totalAmountCalculado.toFixed(2)),
        };
      });
    }
  }, [cart?.details, products, setForm]);

  // Forzamos el conteo de unidades directo desde el estado del formulario para blindar la UI
  const totalUnidadesForm =
    form?.details?.reduce((acc, item) => acc + Number(item.quantity || 0), 0) ||
    0;
  const totalMontoForm = Number(form?.total || 0);

  return (
    <div className="flex-1 h-full max-h-[65vh] overflow-hidden flex flex-col relative">
      {/* SEARCH */}
      <div className="p-4 flex-shrink-0">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 pointer-events-none"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto por nombre o SKU..."
            className="w-full h-11 rounded-xl pl-10 pr-4 text-[13.5px] outline-none bg-white/85 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.07] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 backdrop-blur-xl"
          />
        </div>
      </div>

      <div className="h-px bg-black/[0.05] dark:bg-white/[0.05] flex-shrink-0" />

      {/* PRODUCT LIST */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-1.5 custom-scrollbar">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const qty = cart.getQty(product.id);
            const stock = Number(product.totalStock ?? product.stock ?? 0);
            const remaining = stock - qty;
            const isLow = stock <= 10;

            return (
              <div
                key={product.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] bg-white/80 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.05] backdrop-blur-md transition-all duration-200 hover:bg-white dark:hover:bg-white/[0.05]"
              >
                {/* INFO */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-slate-900 dark:text-slate-100 truncate">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5">
                    {product.sku}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">
                      {fmt(product.salePrice)}{" "}
                      <span className="text-[10px] font-normal text-slate-400 lowercase">
                        + igv
                      </span>
                    </span>

                    <span
                      className={`text-[11px] font-medium px-1.5 py-px rounded-full ${isLow ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"}`}
                    >
                      {remaining} en stock
                    </span>

                    {qty > 0 && (
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                        ×{qty}
                      </span>
                    )}
                  </div>
                </div>

                {/* ADD BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    const nombreFijo =
                      product.name || product.productName || "Producto";
                    cart.addToCart({
                      productId: product.id,
                      productName: nombreFijo,
                      name: nombreFijo,
                      unitPrice: product.salePrice,
                      price: product.salePrice,
                      quantity: 1,
                      stock: stock,
                    });
                  }}
                  disabled={remaining <= 0}
                  className={`w-[30px] h-[30px] rounded-[8px] flex-shrink-0 flex items-center justify-center text-white transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none ${qty > 0 ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  <Plus size={14} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-sm text-slate-400 dark:text-slate-600">
            No se encontraron productos.
          </div>
        )}
      </div>

      <div className="h-px bg-black/[0.05] dark:bg-white/[0.05] flex-shrink-0" />

      {/* FOOTER GENERAL (Monto enlazado al formulario reactivo con valor TOTAL) */}
      <div className="mb-25 flex justify-between px-10 py-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Total (con IGV)
          </p>
          <p className="font-mono text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            {fmt(totalMontoForm)}
          </p>
        </div>

        {/* BOTÓN DEL CARRITO COMPLETAMENTE INTEGRADO */}
        <ModernButton
          type="button"
          variant="primary"
          onClick={() => setCartOpen(true)}
          icon={ShoppingCart}
          text={
            <div className="flex items-center gap-2">
              <span>Carrito</span>
              <span className="bg-white text-blue-600 dark:bg-slate-900 dark:text-blue-400 text-[11px] font-extrabold w-5 h-5 rounded-md flex items-center justify-center shadow-sm">
                {totalUnidadesForm}
              </span>
            </div>
          }
        />
      </div>
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        details={form?.details || []}
        products={products}
        totalUnits={totalUnidadesForm}
        totalAmount={totalMontoForm}
        updateQty={cart.updateQty}
        removeItem={cart.removeItem}
        fmt={fmt}
      />
    </div>
  );
}
