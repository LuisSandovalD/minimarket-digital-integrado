// ========================================
// services/inventory-stock.service.js
// ========================================

const prisma = require("../../../prisma/client");
const repository = require("../repositories/inventory.repository");
// Importamos tu helper de stock automáticamente
const stockHelper = require("../helpers/inventory-stock.helper");

// ========================================
// ADD STOCK
// ========================================
exports.addStock = async (inventoryId, quantity, userId, reason = "Ingreso manual") => {
  return prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventory) {
      throw new Error("Inventario no encontrado");
    }

    // Opcional: Validar que no se ingrese una cantidad negativa o cero usando tu helper
    if (quantity <= 0) {
      throw new Error("La cantidad debe ser mayor a 0");
    }

    const previousStock = inventory.stock;
    const newStock = previousStock + quantity;

    const updatedInventory = await tx.inventory.update({
      where: { id: inventoryId },
      data: {
        stock: { increment: quantity },
      },
    });

    await tx.inventoryHistory.create({
      data: {
        type: "IN",
        quantity,
        previousStock,
        newStock: newStock,
        reason,
        inventoryId,
        productId: inventory.productId,
        branchId: inventory.branchId,
        companyId: inventory.companyId,
        userId,
      },
    });

    return updatedInventory;
  });
};

// ========================================
// REMOVE STOCK
// ========================================
exports.removeStock = async (inventoryId, quantity, userId, reason = "Salida manual") => {
  return prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventory) {
      throw new Error("Inventario no encontrado");
    }

    // 🔥 AUTOMÁTICO: Usamos tu helper para validar stock real menos reservas
    stockHelper.validateStock(inventory.stock, inventory.reservedStock || 0, quantity);

    const previousStock = inventory.stock;
    const newStock = previousStock - quantity;

    const updatedInventory = await tx.inventory.update({
      where: { id: inventoryId },
      data: {
        stock: { decrement: quantity },
      },
    });

    await tx.inventoryHistory.create({
      data: {
        type: "OUT",
        quantity,
        previousStock,
        newStock: newStock,
        reason,
        inventoryId,
        productId: inventory.productId,
        branchId: inventory.branchId,
        companyId: inventory.companyId,
        userId,
      },
    });

    return updatedInventory;
  });
};

// ========================================
// RESERVE STOCK
// ========================================
exports.reserveStock = async (inventoryId, quantity) => {
  return repository.reserveStock(inventoryId, quantity);
};

// ========================================
// RELEASE RESERVED STOCK
// ========================================
exports.releaseReservedStock = async (inventoryId, quantity) => {
  return repository.releaseReservedStock(inventoryId, quantity);
};

// ========================================
// ADD DAMAGED STOCK
// ========================================
exports.addDamagedStock = async (inventoryId, quantity, userId, reason = "Producto dañado") => {
  return prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventory) {
      throw new Error("Inventario no encontrado");
    }

    // 🔥 AUTOMÁTICO: Para marcar como dañado también requerimos que haya stock libre disponible
    stockHelper.validateStock(inventory.stock, inventory.reservedStock || 0, quantity);

    const previousStock = inventory.stock;
    const newStock = previousStock - quantity;

    const updatedInventory = await tx.inventory.update({
      where: { id: inventoryId },
      data: {
        damagedStock: { increment: quantity },
        stock: { decrement: quantity },
      },
    });

    await tx.inventoryHistory.create({
      data: {
        type: "DAMAGED",
        quantity,
        previousStock,
        newStock: newStock,
        reason,
        inventoryId,
        productId: inventory.productId,
        branchId: inventory.branchId,
        companyId: inventory.companyId,
        userId,
      },
    });

    return updatedInventory;
  });
};