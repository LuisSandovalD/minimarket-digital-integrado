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
// GET ALL (EN TU SERVICIO)
// ========================================

exports.getAll = async (companyId, query = {}) => {
  // 1. Extraemos los filtros con valores por defecto limpios
  const { page = 1, limit = 10, search = "", categoryId = "", status = "", sortBy = "createdAt", sortOrder = "desc" } = query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search: search.trim(),
    categoryId,
    status,
    sortBy,
    sortOrder: sortOrder.toLowerCase() === "asc" ? "asc" : "desc"
  };

  // 2. Llamamos al nuevo repositorio adaptado a Prisma con estas opciones
  const { data: products, total } = await repository.getAll(companyId, options);

  // 3. Mapeamos los productos agregando los calculados de stock y retornamos la metadata
  return {
    data: products.map((product) => {
      const stock = calculateInventoryStock(product.inventory);
      return {
        ...product,
        totalStock: stock.total,
        reservedStock: stock.reserved,
        damagedStock: stock.damaged,
        availableStock: stock.total - stock.reserved - stock.damaged,
      };
    }),
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      itemsPerPage: options.limit,
      hasNextPage: options.page * options.limit < total,
      hasPrevPage: options.page > 1
    }
  };
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