// ========================================
// features/purchase/utils/purchase-stats.util.js
// ========================================

export function getPurchaseStats(purchases = []) {
  // ========================================
  // SAFE ARRAY
  // ========================================

  const safePurchases = Array.isArray(purchases) ? purchases : [];

  // ========================================
  // STATUS COUNTS
  // ========================================

  const pending = safePurchases.filter(
    (purchase) => purchase.status === "PENDING",
  ).length;

  const completed = safePurchases.filter(
    (purchase) => purchase.status === "COMPLETED",
  ).length;

  const cancelled = safePurchases.filter(
    (purchase) => purchase.status === "CANCELLED",
  ).length;

  // ========================================
  // TOTAL MONEY
  // ========================================

  const totalAmount = safePurchases.reduce((acc, purchase) => {
    return acc + Number(purchase.total || 0);
  }, 0);

  // ========================================
  // TOTAL PRODUCTS
  // ========================================

  const totalProducts = safePurchases.reduce((acc, purchase) => {
    const details = Array.isArray(purchase.details) ? purchase.details : [];

    const quantity = details.reduce((sum, item) => {
      return sum + Number(item.quantity || 0);
    }, 0);

    return acc + quantity;
  }, 0);

  // ========================================
  // RETURN
  // ========================================

  return {
    total: safePurchases.length,

    pending,

    completed,

    cancelled,

    totalAmount,

    totalProducts,
  };
}
