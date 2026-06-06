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

      OR: [
        {
          stock: {
            lte: 5,
          },
        },
        {
          AND: [
            {
              stock: {
                lte: 5,
              },
            },
            {
              reservedStock: {
                lte: 2,
              },
            },
          ],
        },
      ],

      product: {
        companyId,
        isActive: true,
        isDeleted: false,
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

exports.getLowStock = async (companyId) => {
  return prisma.inventory.findMany({
    where: {
      companyId,

      product: {
        companyId,
        isDeleted: false,
        isActive: true,
      },

      OR: [
        {
          stock: {
            lte: 5,
          },
        },
        {
          AND: [
            {
              stock: {
                lte: 5,
              },
            },
            {
              reservedStock: {
                lte: 2,
              },
            },
          ],
        },
      ],
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

exports.getExpiring = async (
  companyId,
  next30Days
) => {
  return prisma.productBatch.findMany({
    where: {
      companyId,

      isActive: true,

      expirationDate: {
        not: null,
        lte: next30Days,
      },

      currentQuantity: {
        gt: 0,
      },

      product: {
        companyId,
        isDeleted: false,
        isActive: true,
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

      purchaseDetail: {
        include: {
          purchase: {
            include: {
              supplier: true,
            },
          },
        },
      },
    },

    orderBy: {
      expirationDate: "asc",
    },
  });
};