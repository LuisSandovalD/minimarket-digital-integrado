// ========================================
// FEATURES / SALES / HOOKS / useCart.js
// ========================================

export function useCart(form, setForm) {
  const details = Array.isArray(form?.details) ? form.details : [];

  const getQty = (productId) => details.find((item) => item.productId === productId)?.quantity ?? 0;

  // 🧮 MATEMÁTICA PURA Y REDONDEOS SEGUROS
  const actualizarTotalesGlobales = (prevForm, nuevosDetails) => {
    const subtotalCalculado = nuevosDetails.reduce((acc, item) => acc + Number(item.subtotal || 0), 0);

    // Evitamos decimales fantasma mediante redondeo matemático estándar
    const subtotal = Math.round(subtotalCalculado * 100) / 100;
    const tax = Math.round(subtotal * 0.18 * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    return {
      ...prevForm,
      details: nuevosDetails,
      subtotal,
      tax,
      total,
    };
  };

  const addToCart = (product) => {
    if (!product) return;

    const currentId = Number(product.productId || product.id || product.item?.id);
    const productName =
      product.productName || product.name || product.description || product.item?.name || "Producto sin nombre";

    const stock = Number(product.totalStock ?? product.stock ?? product.currentStock ?? 0);

    const price = Number(
      product.salePrice || product.price || product.unitPrice || product.precio || product.item?.price || 0,
    );

    const exists = details.find((item) => item.productId === currentId);

    if (exists) {
      if (exists.quantity >= stock) return;

      setForm((prev) => {
        const nextDetails = prev.details.map((item) =>
          item.productId !== currentId
            ? item
            : {
                ...item,
                quantity: item.quantity + 1,
                price: price,
                unitPrice: price,
                subtotal: Math.round((item.quantity + 1) * price * 100) / 100,
              },
        );

        return actualizarTotalesGlobales(prev, nextDetails);
      });
      return;
    }

    setForm((prev) => {
      const nextDetails = [
        ...(prev.details ?? []),
        {
          productId: currentId,
          name: productName,
          productName: productName,
          sku: product.sku || product.code || "",
          stock,
          quantity: 1,
          price: price,
          unitPrice: price,
          subtotal: price,
        },
      ];

      return actualizarTotalesGlobales(prev, nextDetails);
    });
  };

  const updateQty = (productId, delta) => {
    setForm((prev) => {
      const nextDetails = prev.details
        .map((item) => {
          if (item.productId !== productId) return item;

          const currentPrice = Number(item.price || item.unitPrice || 0);
          const quantity = Math.max(0, Math.min(item.stock, item.quantity + delta));

          return {
            ...item,
            quantity,
            subtotal: Math.round(quantity * currentPrice * 100) / 100,
          };
        })
        .filter((item) => item.quantity > 0);

      return actualizarTotalesGlobales(prev, nextDetails);
    });
  };

  const removeItem = (productId) => {
    setForm((prev) => {
      const nextDetails = prev.details.filter((item) => item.productId !== productId);
      return actualizarTotalesGlobales(prev, nextDetails);
    });
  };

  const totalUnits = details.reduce((acc, item) => acc + Number(item.quantity || 0), 0);

  // 🟢 CORREGIDO: Lee directamente el total del formulario centralizado evitando la doble imposición del 1.18
  const totalAmount = Number(form?.total || 0);

  return {
    details,
    getQty,
    addToCart,
    updateQty,
    removeItem,
    totalUnits,
    totalAmount,
  };
}
