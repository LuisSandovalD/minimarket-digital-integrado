// ========================================
// services/product-query.service.js
// ========================================

const repository = require("../repositories/product.repository");

// ========================================
// INTERNAL HELPER
// ========================================

const calculateInventoryStock = (inventory = []) => {
  return inventory.reduce(
    (acc, item) => {
      acc.total += item.stock || 0;
      acc.reserved += item.reservedStock || 0;
      acc.damaged += item.damagedStock || 0;
      return acc;
    },
    {
      total: 0,
      reserved: 0,
      damaged: 0,
    }
  );
};

// ========================================
// GET ALL
// ========================================

exports.getAll = async (companyId) => {

  const products = await repository.getAll(companyId);

  return products.map((product) => {
    const stock = calculateInventoryStock(product.inventory);

    return {
      ...product,
      totalStock: stock.total,
      reservedStock: stock.reserved,
      damagedStock: stock.damaged,
      availableStock:
        stock.total - stock.reserved - stock.damaged,
    };
  });
};

// ========================================
// GET BY ID
// ========================================

exports.getById = async (id, companyId) => {

  const product = await repository.getById(id, companyId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  const stock = calculateInventoryStock(product.inventory);

  return {
    ...product,
    totalStock: stock.total,
    reservedStock: stock.reserved,
    damagedStock: stock.damaged,
    availableStock:
      stock.total - stock.reserved - stock.damaged,
  };
};

// ========================================
// FEATURED
// ========================================

exports.getFeatured = async (companyId) => {
  return repository.getFeatured(companyId);
};