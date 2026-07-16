// ========================================
// repositories/inventory-history.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// GET HISTORY BY INVENTORY
// ========================================

exports.getHistoryByInventory =
  async (
    inventoryId,
  ) => {

    return prisma.inventoryHistory.findMany({

      where: {
        inventoryId,
      },

      include: {

        product: true,

        branch: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  };

// ========================================
// GET HISTORY BY DATE RANGE
// ========================================

exports.getHistoryByDateRange =
  async (
    companyId,
    startDate,
    endDate,
  ) => {

    return prisma.inventoryHistory.findMany({

      where: {

        companyId,

        createdAt: {

          gte: startDate,

          lte: endDate,
        },
      },

      include: {

        product: true,

        branch: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  };

// ========================================
// DELETE HISTORY
// ========================================

exports.deleteHistory =
  async (
    id,
  ) => {

    return prisma.inventoryHistory.delete({

      where: {
        id,
      },
    });

  };
