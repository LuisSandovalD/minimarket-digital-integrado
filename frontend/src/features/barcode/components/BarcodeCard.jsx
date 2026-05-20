import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Check, Tag, Package, DollarSign, Barcode } from "lucide-react";

export default function BarcodeCard({ product, selected, onSelect }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !product?.barcode) return;

    JsBarcode(svgRef.current, product.barcode, {
      format: "CODE128",
      width: 2,
      height: 60,
      displayValue: false,
      margin: 8,
      background: "transparent",
      lineColor: "#e5e7eb",
    });
  }, [product]);

  return (
    <div
      onClick={onSelect}
      className={`
        group cursor-pointer relative
        rounded-xl border-2
        transition-all duration-300
        overflow-hidden

        ${
          selected
            ? "border-gray-500/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 shadow-lg shadow-gray-500/20"
            : "border-gray-700/50 bg-gradient-to-br from-gray-900/30 to-gray-800/20 hover:border-gray-600/80 hover:shadow-md hover:shadow-gray-900/50"
        }
      `}
    >
      {/* GRADIENT BACKGROUND SUBTLE */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-blue-500/5" />
      </div>

      <div className="relative p-6 space-y-5">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white truncate">
              {product.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              {product.description || "Producto en catálogo"}
            </p>
          </div>

          {/* CHECKBOX */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`
              flex-shrink-0 mt-1
              w-5 h-5 rounded border
              transition-all duration-200
              flex items-center justify-center

              ${
                selected
                  ? "bg-gray-500 border-gray-400 shadow-lg shadow-gray-500/50"
                  : "border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50"
              }
            `}
          >
            {selected && (
              <Check size={14} className="text-white" strokeWidth={3} />
            )}
          </button>
        </div>

        {/* INFO ITEMS GRID */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <InfoItem icon={Tag} label="SKU" value={product.sku} />
          <InfoItem
            icon={Package}
            label="CATEGORÍA"
            value={product.category?.name || "—"}
          />
          <InfoItem
            icon={Package}
            label="STOCK"
            value={`${product.availableStock}`}
          />
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700/50" />

        {/* PRICE SECTION */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Precio venta
            </span>
          </div>
          <strong className="text-lg font-bold text-transparent bg-gradient-to-r from-gray-400 to-blue-400 bg-clip-text">
            S/ {product.salePrice}
          </strong>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700/50" />

        {/* BARCODE SECTION */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Barcode size={14} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Código de barras
            </span>
          </div>

          <div className="flex justify-center py-4 px-3 bg-gray-900/80 rounded-lg border border-gray-700/50 backdrop-blur-sm">
            <svg ref={svgRef} className="scale-95" />
          </div>

          <p className="text-xs text-center text-gray-500 font-mono tracking-widest">
            {product.barcode}
          </p>
        </div>
      </div>

      {/* SELECTED INDICATOR LINE */}
      {selected && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-500 via-gray-500 to-transparent" />
      )}
    </div>
  );
}

// REUSABLE INFO ITEM
function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Icon size={13} className="text-gray-500 flex-shrink-0" />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-200 pl-5">{value}</p>
    </div>
  );
}
