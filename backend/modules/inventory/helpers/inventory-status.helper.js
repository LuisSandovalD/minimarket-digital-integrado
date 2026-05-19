// ========================================
// helpers/inventory-status.helper.js
// ========================================

// ========================================
// INVENTORY STATUS
// ========================================

exports.getInventoryStatus =
  (
    stock,
    minStock,
    maxStock
  ) => {

    if (stock <= 0) {

      return "OUT_OF_STOCK";

    }

    if (stock <= minStock) {

      return "LOW_STOCK";

    }

    if (
      maxStock &&
      stock >= maxStock
    ) {

      return "OVERSTOCK";

    }

    return "NORMAL";

  };