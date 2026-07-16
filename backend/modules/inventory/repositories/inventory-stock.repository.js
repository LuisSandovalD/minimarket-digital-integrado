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
        increment: Number(quantity),
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
        decrement: Number(quantity),
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
        increment: Number(quantity),
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
        decrement: Number(quantity),
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
        increment: Number(quantity),
      },
      stock: {
        decrement: Number(quantity),
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
// STOCK POR PRODUCTO
// ========================================

exports.decreaseStockByProduct = async (
  productId,
  quantity,
  tx = prisma,
) => {
  return tx.inventory.updateMany({
    where: {
      productId: Number(productId),
    },
    data: {
      stock: {
        decrement: Number(quantity),
      },
    },
  });
};

exports.increaseStockByProduct = async (
  productId,
  quantity,
  tx = prisma,
) => {
  return tx.inventory.updateMany({
    where: {
      productId: Number(productId),
    },
    data: {
      stock: {
        increment: Number(quantity),
      },
    },
  });
};

// ========================================
// COMPATIBILIDAD SALES MODULE
// ========================================

exports.decreaseStock = async (
  productId,
  quantity,
  tx = prisma,
) => {
  return exports.decreaseStockByProduct(
    productId,
    quantity,
    tx,
  );
};

exports.increaseStock = async (
  productId,
  quantity,
  tx = prisma,
) => {
  return exports.increaseStockByProduct(
    productId,
    quantity,
    tx,
  );
};
