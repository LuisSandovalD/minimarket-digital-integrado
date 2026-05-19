// ========================================
// services/product-delete.service.js
// ========================================

const repository = require("../repositories/product.repository");

const prisma = require("../../../prisma/client");

// ========================================
// SOFT DELETE
// ========================================

exports.softDelete = async (id, user) => {

  // ========================================
  // 1. GET PRODUCT (MULTI-EMPRESA OK)
  // ========================================

  const product = await repository.getById(id, user.companyId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  // ========================================
  // 2. VALIDATE STOCK (MEJORADO)
  // ========================================

  const inventories = await prisma.inventory.findMany({
    where: {
      productId: id,
      companyId: user.companyId,
    },
  });

  const totalStock = inventories.reduce((acc, item) => {
    return (
      acc +
      (item.stock || 0) +
      (item.reservedStock || 0) +
      (item.damagedStock || 0)
    );
  }, 0);

  if (totalStock > 0) {
    throw new Error(
      `No se puede eliminar el producto porque tiene stock disponible (${totalStock})`
    );
  }

  // ========================================
  // 3. VALIDATE SALES (MEJORADO MULTIEMPRESA)
  // ========================================

  const sales = await prisma.saleDetail.count({
    where: {
      productId: id,
      companyId: user.companyId, // 🔥 IMPORTANTE
    },
  });

  if (sales > 0) {
    throw new Error(
      "No se puede eliminar el producto porque tiene ventas registradas"
    );
  }

  // ========================================
  // 4. VALIDATE PURCHASES (MEJORADO MULTIEMPRESA)
  // ========================================

  const purchases = await prisma.purchaseDetail.count({
    where: {
      productId: id,
      companyId: user.companyId, // 🔥 IMPORTANTE
    },
  });

  if (purchases > 0) {
    throw new Error(
      "No se puede eliminar el producto porque tiene compras registradas"
    );
  }

  // ========================================
  // 5. TRANSACTION
  // ========================================

  const result = await prisma.$transaction(async (tx) => {

    // ========================================
    // SOFT DELETE PRODUCT
    // ========================================

    const deletedProduct = await tx.product.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        isActive: false,
        deletedAt: new Date(),
      },
    });

    // ========================================
    // DISABLE INVENTORY (YA EN TX)
    // ========================================

    await tx.inventory.updateMany({
      where: {
        productId: id,
        companyId: user.companyId, // 🔥 IMPORTANTE
      },
      data: {
        stock: 0,
        reservedStock: 0,
        damagedStock: 0,
      },
    });

    // ========================================
    // AUDIT LOG
    // ========================================

    await tx.auditLog.create({
      data: {
        action: "SOFT_DELETE",
        entityType: "Product",
        entityId: deletedProduct.id,
        description: `Producto ${deletedProduct.name} eliminado correctamente`,
        companyId: user.companyId,
        userId: user.id,
      },
    });

    return deletedProduct;
  });

  return result;
};

// ========================================
// RESTORE
// ========================================

exports.restore = async (id, user) => {

  // ========================================
  // 1. GET PRODUCT
  // ========================================

  const product = await repository.getById(id, user.companyId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  // ========================================
  // 2. RESTORE PRODUCT
  // ========================================

  const restored = await prisma.product.update({
    where: {
      id,
    },
    data: {
      isDeleted: false,
      isActive: true,
      deletedAt: null,
    },
  });

  // ========================================
  // 3. AUDIT LOG (EN TX PARA CONSISTENCIA)
  // ========================================

  await prisma.auditLog.create({
    data: {
      action: "RESTORE",
      entityType: "Product",
      entityId: restored.id,
      description: `Producto ${restored.name} restaurado`,
      companyId: user.companyId,
      userId: user.id,
    },
  });

  return restored;
};