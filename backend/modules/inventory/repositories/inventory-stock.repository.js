// ========================================
// repositories/inventory-stock.repository.js
// ========================================

const prisma = require("../../../prisma/client");

// ========================================
// CREATE
// ========================================
exports.create = async (data) => {
  return prisma.inventory.create({
    data,
  });
};

// ========================================
// UPDATE STOCK (GENERICO)
// ========================================
exports.updateStock = async (inventoryId, data) => {
  return prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data,
  });
};

// ========================================
// INCREMENT STOCK
// ========================================
exports.incrementStock = async (inventoryId, quantity) => {
  return prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data: {
      stock: {
        increment: quantity,
      },
    },
  });
};

// ========================================
// DECREMENT STOCK
// ========================================
exports.decrementStock = async (inventoryId, quantity) => {
  return prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  });
};

// ========================================
// RESERVE STOCK
// ========================================
exports.reserveStock = async (inventoryId, quantity) => {
  return prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data: {
      reservedStock: {
        increment: quantity,
      },
    },
  });
};

// ========================================
// RELEASE RESERVED STOCK
// ========================================
exports.releaseReservedStock = async (inventoryId, quantity) => {
  return prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data: {
      reservedStock: {
        decrement: quantity,
      },
    },
  });
};

// ========================================
// ADD DAMAGED STOCK
// ========================================
exports.addDamagedStock = async (inventoryId, quantity) => {
  return prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data: {
      damagedStock: {
        increment: quantity,
      },
      stock: {
        decrement: quantity,
      },
    },
  });
};

// ========================================
// DELETE INVENTORY
// ========================================
exports.deleteInventory = async (inventoryId) => {
  return prisma.inventory.delete({
    where: {
      id: inventoryId,
    },
  });
};

// ========================================
// METODOS POR PRODUCTO (Para compatibilidad)
// ========================================
exports.decreaseStockByProduct = async (productId, quantity, tx = prisma) => {
  return tx.inventory.updateMany({
    where: {
      productId,
    },
    data: {
      stock: {
        decrement: Number(quantity),
      },
    },
  });
};

exports.increaseStockByProduct = async (productId, quantity, tx = prisma) => {
  return tx.inventory.updateMany({
    where: {
      productId,
    },
    data: {
      stock: {
        increment: Number(quantity),
      },
    },
  });
};