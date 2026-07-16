// ========================================
// repositories/inventory-transfer.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// TRANSFER STOCK
// ========================================

exports.transferStock =
  async ({
    fromInventoryId,
    toInventoryId,
    quantity,
  }) => {

    return prisma.$transaction([

      prisma.inventory.update({

        where: {
          id: fromInventoryId,
        },

        data: {

          stock: {
            decrement: quantity,
          },
        },
      }),

      prisma.inventory.update({

        where: {
          id: toInventoryId,
        },

        data: {

          stock: {
            increment: quantity,
          },
        },
      }),

    ]);

  };
