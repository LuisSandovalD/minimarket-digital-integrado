// ========================================
// helpers/inventory-metrics.helper.js
// ========================================

// ========================================
// INVENTORY VALUE
// ========================================

exports.calculateInventoryValue =
  (
    stock,
    costPrice
  ) => {

    return (
      stock * costPrice
    );

  };

// ========================================
// PROFIT MARGIN
// ========================================

exports.calculateProfitMargin =
  (
    costPrice,
    salePrice
  ) => {

    if (costPrice <= 0) {

      return 0;

    }

    return (
      (
        (salePrice - costPrice) /
        costPrice
      ) * 100
    );

  };

// ========================================
// STOCK PERCENTAGE
// ========================================

exports.calculateStockPercentage =
  (
    stock,
    maxStock
  ) => {

    if (!maxStock) {

      return 0;

    }

    return (
      (stock / maxStock) * 100
    );

  };