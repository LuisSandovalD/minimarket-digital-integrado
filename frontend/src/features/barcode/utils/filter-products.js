// ========================================
// features/barcodes/utils/filter-products.js
// ========================================

export function filterProducts(products, search) {
  const value = search.toLowerCase();

  return products.filter(
    (product) =>
      product.name?.toLowerCase().includes(value) ||
      product.sku?.toLowerCase().includes(value) ||
      product.barcode?.toLowerCase().includes(value) ||
      product.category?.name?.toLowerCase().includes(value),
  );
}
