// ========================================
// features/product/components/ProductStockBadge.jsx
// ========================================

export default function ProductStockBadge({ stock = 0, minStock = 0 }) {
  const isLow = stock <= minStock;
  const isOut = stock <= 0;

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium

        ${
          isOut
            ? "bg-red-500/15 text-red-500"
            : isLow
              ? "bg-yellow-500/15 text-yellow-500"
              : "bg-emerald-500/15 text-emerald-500"
        }
      `}
    >
      {stock} unidades
    </span>
  );
}
