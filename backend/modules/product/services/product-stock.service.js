// ========================================
// repositories/product-stock.repository.js
// ========================================

const prisma = require("../../../prisma/client");

// ========================================
// LOW STOCK (MEJORADO)
// ========================================

exports.getLowStock = async (companyId) => {
  return prisma.inventory.findMany({
    where: {
      companyId,

      // 🔥 stock real (más preciso ERP)
      OR: [
        {
          stock: { lte: 5 },
        },
        {
          AND: [
            { stock: { lte: 5 } },
            { reservedStock: { lte: 2 } },
          ],
        },
      ],

      product: {
        isDeleted: false,
        isActive: true,
        companyId, // 🔥 importante para multiempresa
      },
    },

    include: {
      product: {
        include: {
          category: true,
          unit: true,
        },
      },
      branch: true,
    },

    orderBy: {
      stock: "asc",
    },
  });
};

// ========================================
// EXPIRING PRODUCTS (MEJORADO)
// ========================================

exports.getExpiring = async (companyId, next30Days) => {
  return prisma.product.findMany({
    where: {
      companyId,
      isDeleted: false,
      isActive: true,

      expirationDate: {
        not: null,
        lte: next30Days,
      },

      // 🔥 evita productos sin inventario real
      inventory: {
        some: {
          stock: { gt: 0 },
          companyId,
        },
      },
    },

    include: {
      category: true,
      unit: true,

      inventory: {
        where: {
          companyId,
        },
        include: {
          branch: true,
        },
      },
    },

    orderBy: {
      expirationDate: "asc",
    },
  });
};