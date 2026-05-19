// ========================================
// repositories/inventory-query.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// GET ALL
// ========================================

exports.getAll =
  async (
    companyId
  ) => {

    return prisma.inventory.findMany({

      where: {
        companyId,
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
// GET BY ID
// ========================================

exports.getById =
  async (
    inventoryId,
    companyId
  ) => {

    return prisma.inventory.findFirst({

      where: {

        id:
          inventoryId,

        companyId,
      },

      include: {

        product: true,

        branch: true,
      },
    });

  };

// ========================================
// GET BY PRODUCT
// ========================================

exports.getByProduct =
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

        product: true,

        branch: true,
      },
    });

  };

// ========================================
// GET BY BRANCH
// ========================================

exports.getByBranch =
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
        product: true,
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
// GET DAMAGED STOCK
// ========================================

exports.getDamagedStock =
  async (
    companyId
  ) => {

    return prisma.inventory.findMany({

      where: {

        companyId,

        damagedStock: {
          gt: 0,
        },
      },

      include: {

        product: true,

        branch: true,
      },
    });

  };