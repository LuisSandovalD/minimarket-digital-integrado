// ========================================
// services/inventory-metrics.service.js
// ========================================

const repository =
  require("../repositories/inventory.repository");

// ========================================
// TOTAL INVENTORY VALUE
// ========================================

exports.getInventoryValue =
  async (
    companyId,
  ) => {

    return repository.getInventoryValue(
      companyId,
    );

  };

// ========================================
// TOTAL STOCK
// ========================================

exports.getTotalStock =
  async (
    companyId,
  ) => {

    return repository.getTotalStock(
      companyId,
    );

  };
