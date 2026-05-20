// ========================================
// features/product/hooks/useProductStats.js
// ========================================

import { useMemo } from "react";

export default function useProductStats(products = []) {
  const stats = useMemo(() => {
    const totalProducts = products.length;

    const activeProducts = products.filter((p) => p.isActive).length;

    const lowStockProducts = products.filter(
      (p) => p.stock <= p.minStock,
    ).length;

    const featuredProducts = products.filter((p) => p.isFeatured).length;

    const inventoryValue = products.reduce(
      (acc, product) => acc + Number(product.costPrice) * Number(product.stock),
      0,
    );

    return {
      totalProducts,

      activeProducts,

      lowStockProducts,

      featuredProducts,

      inventoryValue,
    };
  }, [products]);

  return stats;
}
