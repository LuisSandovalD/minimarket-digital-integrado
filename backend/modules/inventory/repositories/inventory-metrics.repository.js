// ========================================
// repositories/inventory-metrics.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// TOTAL INVENTORY VALUE
// ========================================

exports.getInventoryValue =
  async (
    companyId,
  ) => {

    const inventories =
      await prisma.inventory.findMany({

        where: {
          companyId,
        },

        include: {
          product: true,
        },
      });

    return inventories.reduce(
      (acc, item) => {

        return (
          acc +
          (
            item.stock *
            Number(item.product.costPrice)
          )
        );

      },
      0,
    );

  };

// ========================================
// TOTAL STOCK
// ========================================

exports.getTotalStock =
  async (
    companyId,
  ) => {

    const result =
      await prisma.inventory.aggregate({

        where: {
          companyId,
        },

        _sum: {
          stock: true,
        },
      });

    return result._sum.stock || 0;

  };
