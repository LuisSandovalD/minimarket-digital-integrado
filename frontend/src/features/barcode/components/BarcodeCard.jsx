import JsBarcode from "jsbarcode";
import { Barcode, Check, DollarSign, Package, Tag } from "lucide-react";
import { useEffect, useRef } from "react";

export default function BarcodeCard({ product, selected, onSelect }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !product?.barcode) {
      return;
    }

    JsBarcode(svgRef.current, product.barcode, {
      format: "CODE128",
      width: 2,
      height: 60,
      displayValue: false,
      margin: 8,
      background: "transparent",
      lineColor: "#0f172a",
    });
  }, [product]);

  return (
    <article
      onClick={onSelect}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 ${
        selected
          ? "border-primary/40 bg-primary/5 shadow-lg"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-medium text-slate-900 dark:text-slate-100">{product.name}</h3>

            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
              {product.description || "Producto registrado"}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`flex h-6 w-6 items-center justify-center rounded-md border transition-all ${
              selected
                ? "border-primary bg-primary text-white"
                : "border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900"
            }`}
          >
            {selected && <Check size={14} strokeWidth={3} />}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Tag size={13} />
              <span>SKU</span>
            </div>

            <p className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {product.sku || "—"}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Package size={13} />
              <span>Categoría</span>
            </div>

            <p className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {product.category?.name || "—"}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Package size={13} />
              <span>Stock</span>
            </div>

            <p className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {product.availableStock ?? 0}
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <DollarSign size={15} />
            <span>Precio de venta</span>
          </div>

          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            S/ {Number(product.salePrice || 0).toFixed(2)}
          </span>
        </div>

        <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Barcode size={15} />
            <span>Código de barras</span>
          </div>

          <div className="flex justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-100">
            <svg ref={svgRef} />
          </div>

          <p className="mt-3 text-center font-mono text-xs tracking-wider text-slate-500 dark:text-slate-400">
            {product.barcode}
          </p>
        </div>
      </div>

      {selected && <div className="absolute inset-x-0 top-0 h-1 bg-primary" />}
    </article>
  );
}
