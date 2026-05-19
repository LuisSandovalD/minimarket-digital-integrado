// ========================================
// services/inventory-validation.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// VALIDATE STOCK
// ========================================

exports.validateStock =
  async (
    inventoryId,
    quantity
  ) => {

    const inventory =
      await prisma.inventory.findUnique({

        where: {
          id: inventoryId,
        },
      });

    if (!inventory) {

      throw new Error(
        "Inventario no encontrado"
      );

    }

    if (
      inventory.stock <
      quantity
    ) {

      throw new Error(
        "Stock insuficiente"
      );

    }

    return inventory;

  };