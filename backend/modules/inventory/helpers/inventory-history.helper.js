// ========================================
// helpers/inventory-history.helper.js
// ========================================

const {
  generateMovementReference,
} = require(
  "../utils/inventory-reference.util",
);

const MOVEMENTS =
  require(
    "../constants/inventory-movement.constants",
  );

// ========================================
// BUILD MOVEMENT DATA
// ========================================

exports.buildMovementData =
  ({
    type,
    quantity,
    previousStock,
    newStock,
    reason,
    inventoryId,
    productId,
    branchId,
    companyId,
    userId,
    reference = null,
  }) => {

    return {

      type,

      quantity,

      previousStock,

      newStock,

      reason,

      reference,

      inventoryId,

      productId,

      branchId,

      companyId,

      userId,
    };

  };

// ========================================
// GENERATE REFERENCE
// ========================================

exports.generateReference =
  generateMovementReference;

// ========================================
// MOVEMENT LABEL
// ========================================

exports.getMovementLabel =
  (
    type,
  ) => {

    const labels = {

      [MOVEMENTS.IN]:
        "Ingreso",

      [MOVEMENTS.OUT]:
        "Salida",

      [MOVEMENTS.DAMAGED]:
        "Producto Dañado",

      [MOVEMENTS.TRANSFER_IN]:
        "Transferencia Entrante",

      [MOVEMENTS.TRANSFER_OUT]:
        "Transferencia Saliente",
    };

    return (
      labels[type] || type
    );

  };
