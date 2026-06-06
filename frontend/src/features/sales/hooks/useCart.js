// ========================================
// features/sales/hooks/useCart.js
// ========================================

export function useCart(form, setForm) {
  const details = Array.isArray(form?.details) ? form.details : [];

  const getQty = (productId) =>
    details.find((item) => item.productId === productId)?.quantity ?? 0;

  const addToCart = (product) => {
    const stock = Number(product.totalStock ?? product.stock ?? 0);

    const unitPrice = Number(product.salePrice || 0);

    const exists = details.find((item) => item.productId === product.id);

    if (exists) {
      if (exists.quantity >= stock) return;

      setForm((prev) => ({
        ...prev,

        details: prev.details.map((item) =>
          item.productId !== product.id
            ? item
            : {
                ...item,

                quantity: item.quantity + 1,

                subtotal: (item.quantity + 1) * item.unitPrice,
              },
        ),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,

      details: [
        ...(prev.details ?? []),

        {
          productId: product.id,

          productName: product.name,

          sku: product.sku || "",

          stock,

          quantity: 1,

          unitPrice,

          subtotal: unitPrice,
        },
      ],
    }));
  };

  const updateQty = (productId, delta) => {
    setForm((prev) => ({
      ...prev,

      details: prev.details
        .map((item) => {
          if (item.productId !== productId) return item;

          const quantity = Math.max(
            0,
            Math.min(item.stock, item.quantity + delta),
          );

          return {
            ...item,

            quantity,

            subtotal: quantity * item.unitPrice,
          };
        })
        .filter((item) => item.quantity > 0),
    }));
  };

  const removeItem = (productId) => {
    setForm((prev) => ({
      ...prev,

      details: prev.details.filter((item) => item.productId !== productId),
    }));
  };

  const totalUnits = details.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0,
  );

  const totalAmount = details.reduce(
    (acc, item) => acc + Number(item.subtotal || 0),
    0,
  );

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
