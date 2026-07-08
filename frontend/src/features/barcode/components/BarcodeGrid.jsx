import BarcodeCard from "./BarcodeCard";

export default function BarcodeGrid({ products, selectedProducts, onToggle }) {
  if (!products.length) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <BarcodeCard
          key={product.id}
          product={product}
          selected={selectedProducts.some((item) => item.id === product.id)}
          onSelect={() => onToggle(product)}
        />
      ))}
    </div>
  );
}
