// ========================================
// repositories/inventory-query.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// GET ALL INVENTORY
// ========================================

exports.getAllInventory =
  async ({
    companyId,
    branchId,
    categoryId,
    search,
    lowStock,
    outOfStock,
    page = 1,
    limit = 10,
  }) => {

    const skip =
      (page - 1) * limit;

    const where = {
      companyId,
    };

    // BRANCH

    if (branchId) {

      where.branchId =
        Number(branchId);

    }

    // OUT OF STOCK

    if (outOfStock === "true") {

      where.stock = 0;

    }

    // LOW STOCK

    if (lowStock === "true") {

      where.stock = {
        lte: 5,
      };

    }

    // PRODUCT FILTERS

    where.product = {};

    // CATEGORY

    if (categoryId) {

      where.product.categoryId =
        Number(categoryId);

    }

    // SEARCH

    if (search) {

      where.product.OR = [

        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          sku: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          barcode: {
            contains: search,
            mode: "insensitive",
          },
        },

      ];

    }

    const [data, total] =
      await Promise.all([

        prisma.inventory.findMany({

          where,

          include: {

            product: {

              include: {

                category: true,

                unit: true,
              },
            },

            branch: true,
          },

          skip,

          take: Number(limit),

          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.inventory.count({
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
// GET INVENTORY BY ID
// ========================================

exports.getInventoryById =
  async (
    inventoryId,
    companyId
  ) => {

    return prisma.inventory.findFirst({

      where: {

        id: inventoryId,

        companyId,
      },

      include: {

        product: {

          include: {

            category: true,

            unit: true,
          },
        },

        branch: true,

        movements: {

          orderBy: {
            createdAt: "desc",
          },

          take: 20,
        },
      },
    });

  };

// ========================================
// GET INVENTORY BY PRODUCT
// ========================================

exports.getInventoryByProduct =
  async (
    productId,
    companyId
  ) => {

    return prisma.inventory.findMany({

      where: {

        productId,

        companyId,
      },

      include: {
        branch: true,
      },
    });

  };

// ========================================
// GET INVENTORY BY BRANCH
// ========================================

exports.getInventoryByBranch =
  async (
    branchId,
    companyId
  ) => {

    return prisma.inventory.findMany({

      where: {

        branchId,

        companyId,
      },

      include: {

        product: {

          include: {

            category: true,

            unit: true,
          },
        },
      },
    });

  };

// ========================================
// GET LOW STOCK
// ========================================

exports.getLowStock =
  async (
    companyId,
    threshold = 5
  ) => {

    return prisma.inventory.findMany({

      where: {

        companyId,

        stock: {
          lte: threshold,
        },
      },

      include: {

        product: true,

        branch: true,
      },

      orderBy: {
        stock: "asc",
      },
    });

  };

// ========================================
// GET OUT OF STOCK
// ========================================

exports.getOutOfStock =
  async (
    companyId
  ) => {

    return prisma.inventory.findMany({

      where: {

        companyId,

        stock: 0,
      },

      include: {

        product: true,

        branch: true,
      },
    });

  };

// ========================================
// CHECK STOCK AVAILABILITY
// ========================================

exports.checkStockAvailability =
  async (
    inventoryId,
    quantity
  ) => {

    const inventory =
      await prisma.inventory.findUnique({

        where: {
          id: inventoryId,
        },
      });

    if (!inventory) {
      return false;
    }

    return inventory.stock >= quantity;

  };