// ========================================
// features/sales/modal/hooks/useProductsStep.js
// ========================================

import { useMemo, useState } from "react";
import { useCart } from "./useCart";

export function useProductsStep({ products, form, setForm }) {
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

  // Filtrado reactivo en tiempo real por Nombre o SKU
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    const q = search.toLowerCase();

    return products.filter((p) =>
      `${p.name || ""} ${p.sku || ""}`.toLowerCase().includes(q),
    );
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
    // Propiedades y métodos del carrito expuestos ordenadamente
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
