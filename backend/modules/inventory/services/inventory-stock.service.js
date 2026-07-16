// ========================================
// services/inventory-stock.service.js
// ========================================

const prisma = require("../../../prisma/client");
const repository = require("../repositories/inventory.repository");

// ========================================
// ADD STOCK
// ========================================
exports.addStock = async (
  inventoryId,
  quantity,
  userId,
  reason = "Ingreso manual",
) => {
  return prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findUnique({
      where: {
        id: Number(inventoryId),
      },
    });

    if (!inventory) {
      throw new Error("Inventario no encontrado");
    }

    const previousStock = Number(inventory.stock);
    const newStock = previousStock + Number(quantity);

    const updatedInventory = await tx.inventory.update({
      where: {
        id: Number(inventoryId),
      },
      data: {
        stock: {
          increment: Number(quantity),
        },
      },
    });

    await tx.inventoryHistory.create({
      data: {
        type: "IN",
        quantity: Number(quantity),
        previousStock,
        newStock: newStock,
        reason,
        inventoryId: Number(inventoryId),
        productId: Number(inventory.productId),
        branchId: inventory.branchId ? Number(inventory.branchId) : null,
        companyId: inventory.companyId ? Number(inventory.companyId) : null,
        // 🛡️ Corregido: Se remueve userId por no existir en el esquema de InventoryHistory
      },
    });

    return updatedInventory;
  });
};

// ========================================
// REMOVE STOCK
// ========================================
exports.removeStock = async (
  inventoryId,
  quantity,
  userId,
  reason = "Salida manual",
) => {
  return prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findUnique({
      where: {
        id: Number(inventoryId),
      },
    });

    if (!inventory) {
      throw new Error("Inventario no encontrado");
    }

    if (Number(inventory.stock) < Number(quantity)) {
      throw new Error("Stock insuficiente");
    }

    const previousStock = Number(inventory.stock);
    const newStock = previousStock - Number(quantity);

    const updatedInventory = await tx.inventory.update({
      where: {
        id: Number(inventoryId),
      },
      data: {
        stock: {
          decrement: Number(quantity),
        },
      },
    });

    await tx.inventoryHistory.create({
      data: {
        type: "OUT",
        quantity: Number(quantity),
        previousStock,
        newStock: newStock,
        reason,
        inventoryId: Number(inventoryId),
        productId: Number(inventory.productId),
        branchId: inventory.branchId ? Number(inventory.branchId) : null,
        companyId: inventory.companyId ? Number(inventory.companyId) : null,
        // 🛡️ Corregido: Se remueve userId por no existir en el esquema de InventoryHistory
      },
    });

    return updatedInventory;
  });
};

// ========================================
// RESERVE STOCK
// ========================================
exports.reserveStock = async (inventoryId, quantity) => {
  return repository.reserveStock(Number(inventoryId), Number(quantity));
};

// ========================================
// RELEASE RESERVED STOCK
// ========================================
exports.releaseReservedStock = async (inventoryId, quantity) => {
  return repository.releaseReservedStock(Number(inventoryId), Number(quantity));
};

// ========================================
// ADD DAMAGED STOCK
// ========================================
exports.addDamagedStock = async (
  inventoryId,
  quantity,
  userId,
  reason = "Producto dañado",
) => {
  return prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findUnique({
      where: {
        id: Number(inventoryId),
      },
    });

    if (!inventory) {
      throw new Error("Inventario no encontrado");
    }

    if (Number(inventory.stock) < Number(quantity)) {
      throw new Error("Stock insuficiente");
    }

    const previousStock = Number(inventory.stock);
    const newStock = previousStock - Number(quantity);

    const updatedInventory = await tx.inventory.update({
      where: {
        id: Number(inventoryId),
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

    await tx.inventoryHistory.create({
      data: {
        type: "DAMAGED",
        quantity: Number(quantity),
        previousStock,
        newStock: newStock,
        reason,
        inventoryId: Number(inventoryId),
        productId: Number(inventory.productId),
        branchId: inventory.branchId ? Number(inventory.branchId) : null,
        companyId: inventory.companyId ? Number(inventory.companyId) : null,
        // 🛡️ Corregido: Se remueve userId por no existir en el esquema de InventoryHistory
      },
    });

    return updatedInventory;
  });
};
