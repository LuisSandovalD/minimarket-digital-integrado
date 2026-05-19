// ========================================
// services/inventory-history.service.js
// ========================================

const repository =
  require("../repositories/inventory.repository");

// ========================================
// GET HISTORY BY INVENTORY
// ========================================

exports.getHistoryByInventory =
  async (
    inventoryId
  ) => {

    return repository.getHistoryByInventory(
      inventoryId
    );

  };

// ========================================
// GET HISTORY BY DATE RANGE
// ========================================

exports.getHistoryByDateRange =
  async (
    companyId,
    startDate,
    endDate
  ) => {

    return repository.getHistoryByDateRange(
      companyId,
      startDate,
      endDate
    );

  };