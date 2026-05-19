// ========================================
// services/inventory-movement.service.js
// ========================================

const repository =
  require("../repositories/inventory.repository");

// ========================================
// GET MOVEMENTS
// ========================================

exports.getMovements =
  async (
    filters
  ) => {

    return repository.getMovements(
      filters
    );

  };

// ========================================
// GET PRODUCT MOVEMENTS
// ========================================

exports.getProductMovements =
  async (
    productId,
    companyId
  ) => {

    return repository.getProductMovements(
      productId,
      companyId
    );

  };

// ========================================
// GET BRANCH MOVEMENTS
// ========================================

exports.getBranchMovements =
  async (
    branchId,
    companyId
  ) => {

    return repository.getBranchMovements(
      branchId,
      companyId
    );

  };