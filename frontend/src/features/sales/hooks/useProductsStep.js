// ========================================
// features/sales/modal/hooks/useProductsStep.js
// ========================================

import { useMemo, useState } from "react";
import { useCart } from "./useCart";

export function useProductsStep({ products = [], form, setForm }) {
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Consumo y puente de la lógica central del carrito
  const {
    details,
    getQty,
    addToCart,
    updateQty,
    removeItem,
    totalUnits,
    totalAmount,
  } = useCart(form, setForm);

  // Filtrado reactivo en tiempo real por Nombre, SKU o Código de Barras (Escáner)
  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    if (!search.trim()) return safeProducts;

    const q = search.toLowerCase().trim();

    return safeProducts.filter((p) => {
      const name = p.name ? String(p.name).toLowerCase() : "";
      const sku = p.sku ? String(p.sku).toLowerCase() : "";
      const barcode = p.barcode ? String(p.barcode).toLowerCase() : "";

      return name.includes(q) || sku.includes(q) || barcode.includes(q);
    });
  }, [products, search]);

  // Formateador de moneda local para Perú (Soles)
  const fmt = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));

  return {
    search,
    setSearch,
    cartOpen,
    setCartOpen,
    filteredProducts,
    fmt,
    // Propiedades y métodos del carrito expuestos ordenadamente hacia la UI
    cart: {
      details,
      getQty,
      addToCart,
      updateQty,
      removeItem,
      totalUnits,
      totalAmount,
    },
  };
}
