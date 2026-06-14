// ========================================
// features/purchase/hooks/usePurchaseProductsStep.js
// ========================================

import { useMemo, useState } from "react";

export function usePurchaseProductsStep({ products = [], form, setForm }) {
  const [search, setSearch] = useState("");

  const [cartOpen, setCartOpen] = useState(false);

  // ========================================
  // FORMAT
  // ========================================

  const fmt = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));

  // ========================================
  // FILTER PRODUCTS
  // ========================================

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();

    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(term) ||
        product.sku?.toLowerCase().includes(term),
    );
  }, [products, search]);

  // ========================================
  // DETAILS
  // ========================================

  const details = Array.isArray(form?.details) ? form.details : [];

  // ========================================
  // ADD PRODUCT
  // ========================================

  const addProduct = (product) => {
    const exists = details.find(
      (item) => Number(item.productId) === Number(product.id),
    );

    if (exists) {
      updateQty(product.id, 1);
      return;
    }

    setForm((prev) => ({
      ...prev,

      details: [
        ...details,

        {
          productId: product.id,

          productName: product.name,

          sku: product.sku,

          quantity: 1,

          costPrice: Number(product.purchasePrice) || 0,

          stock: Number(product.totalStock ?? product.stock ?? 0),
        },
      ],
    }));
  };

  // ========================================
  // REMOVE
  // ========================================

  const removeItem = (productId) => {
    setForm((prev) => ({
      ...prev,

      details: prev.details.filter((item) => item.productId !== productId),
    }));
  };

  // ========================================
  // UPDATE QTY
  // ========================================

  const updateQty = (productId, change) => {
    setForm((prev) => ({
      ...prev,

      details: prev.details.map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        return {
          ...item,

          quantity: Math.max(1, Number(item.quantity) + change),
        };
      }),
    }));
  };

  // ========================================
  // UPDATE COST
  // ========================================

  const updateCostPrice = (productId, value) => {
    setForm((prev) => ({
      ...prev,

      details: prev.details.map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        return {
          ...item,

          costPrice: Number(value) || 0,
        };
      }),
    }));
  };

  // ========================================
  // TOTALS
  // ========================================

  const totalUnits = details.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0,
  );

  const totalAmount = details.reduce(
    (acc, item) =>
      acc + Number(item.quantity || 0) * Number(item.costPrice || 0),
    0,
  );

  // ========================================
  // HELPERS
  // ========================================

  const getQty = (productId) => {
    const item = details.find((d) => Number(d.productId) === Number(productId));

    return item?.quantity || 0;
  };

  // ========================================
  // CART API
  // ========================================

  const cart = {
    details,

    totalUnits,

    totalAmount,

    getQty,

    addProduct,

    removeItem,

    updateQty,

    updateCostPrice,
  };

  return {
    search,
    setSearch,

    cartOpen,
    setCartOpen,

    filteredProducts,

    fmt,

    cart,
  };
}
