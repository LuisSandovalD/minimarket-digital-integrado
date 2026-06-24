// ============================================================================
// features/purchase/hooks/usePurchaseProductsStep.js
// HOOK DE CONTROL: Gestiona la lógica del carrito de compras y datos de insumos
// ============================================================================

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
      // Si ya existe, incrementamos de 1 en 1 de forma segura
      setForm((prev) => ({
        ...prev,
        details: prev.details.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item,
        ),
      }));
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
          batchNumber: "", // Inicializado para evitar componentes descontrolados
          expirationDate: "", // Inicializado para evitar componentes descontrolados
        },
      ],
    }));
  };

  // ========================================
  // REMOVE ITEM
  // ========================================
  const removeItem = (productId) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details.filter((item) => item.productId !== productId),
    }));
  };

  // ========================================
  // UPDATE QTY (Corregido para manejar asignación directa desde inputs)
  // ========================================
  const updateQty = (productId, valueOrChange) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details.map((item) => {
        if (item.productId !== productId) return item;

        // Validamos si la modal envía un cambio relativo (+1/-1) o el valor absoluto del input
        let newQty = Number(valueOrChange);
        if (valueOrChange === 1 || valueOrChange === -1) {
          newQty = Number(item.quantity) + valueOrChange;
        }

        return {
          ...item,
          quantity: Math.max(1, newQty),
        };
      }),
    }));
  };

  // ========================================
  // UPDATE COST PRICE
  // ========================================
  const updateCostPrice = (productId, value) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details.map((item) => {
        if (item.productId !== productId) return item;
        return {
          ...item,
          costPrice: Math.max(0, Number(value) || 0),
        };
      }),
    }));
  };

  // ========================================
  // EXTENSIONES REQUERIDAS POR LA COMPRA MODAL
  // ========================================
  const updateBatchNumber = (productId, value) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details.map((item) =>
        item.productId === productId ? { ...item, batchNumber: value } : item,
      ),
    }));
  };

  const updateExpirationDate = (productId, value) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details.map((item) =>
        item.productId === productId
          ? { ...item, expirationDate: value }
          : item,
      ),
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
  // CART API (Contrato de enlace con PurchaseCartModal)
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
    updateBatchNumber, // Añadido para estabilizar la modal
    updateExpirationDate, // Añadido para estabilizar la modal
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
