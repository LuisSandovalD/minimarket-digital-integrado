// ========================================
// components/BarcodeGrid.jsx
// ========================================

import BarcodeCard
  from "./BarcodeCard";

export default function BarcodeGrid({

  products,

  selectedProducts,

  onToggle,

}) {

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-4
      "
    >

      {products.map(product => (

        <BarcodeCard
          key={product.id}
          product={product}
          selected={
            selectedProducts.some(
              item =>
                item.id ===
                product.id
            )
          }
          onSelect={() =>
            onToggle(product)
          }
        />

      ))}

    </div>
  );
}