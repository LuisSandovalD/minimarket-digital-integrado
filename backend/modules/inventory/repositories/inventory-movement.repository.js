// ========================================
// repositories/inventory-movement.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// CREATE MOVEMENT
// ========================================

exports.createMovement =
  async (
    data
  ) => {

    return prisma.inventoryHistory.create({
      data,
    });

  };

// ========================================
// GET MOVEMENTS
// ========================================

exports.getMovements =
  async ({
    companyId,
    branchId,
    productId,
    type,
    page = 1,
    limit = 20,
  }) => {

    const skip =
      (page - 1) * limit;

    const where = {
      companyId,
    };

    if (branchId) {
      where.branchId =
        Number(branchId);
    }

    if (productId) {
      where.productId =
        Number(productId);
    }

    if (type) {
      where.type = type;
    }

    const [data, total] =
      await Promise.all([

        prisma.inventoryHistory.findMany({

          where,

          include: {

            product: true,

            inventory: true,

            branch: true,
          },

          skip,

          take: Number(limit),

          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.inventoryHistory.count({
          where,
        }),

      ]);

    return {

      data,

      pagination: {

        total,

        page: Number(page),

        limit: Number(limit),

        totalPages:
          Math.ceil(total / limit),
      },
    };

  };

// ========================================
// GET PRODUCT MOVEMENTS
// ========================================

exports.getProductMovements =
  async (
    productId,
    companyId
  ) => {

    return prisma.inventoryHistory.findMany({

      where: {
        productId,
        companyId,
      },

      include: {
        branch: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  };

// ========================================
// GET BRANCH MOVEMENTS
// ========================================

exports.getBranchMovements =
  async (
    branchId,
    companyId
  ) => {

    return prisma.inventoryHistory.findMany({

      where: {
        branchId,
        companyId,
      },

      include: {
        product: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  };