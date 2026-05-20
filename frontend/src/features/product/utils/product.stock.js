// ========================================
// GET STOCK STATUS
// ========================================

export const getStockStatus = (stock, minStock) => {
  if (stock <= 0) {
    return "OUT_OF_STOCK";
  }

  if (stock <= minStock) {
    return "LOW_STOCK";
  }

  return "NORMAL";
};

// ========================================
// STOCK PERCENTAGE
// ========================================

export const getStockPercentage = (stock, maxStock) => {
  if (!maxStock) {
    return 0;
  }

  return Math.min((stock / maxStock) * 100, 100);
};

// ========================================
// IS LOW STOCK
// ========================================

export const isLowStock = (stock, minStock) => {
  return stock <= minStock;
};
