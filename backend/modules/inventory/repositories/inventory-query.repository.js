// ========================================
// repositories/inventory-query.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// GET ALL INVENTORY
// ========================================

exports.getAllInventory = async ({
  companyId,
  branchId,
  categoryId,
  search,
  stockStatus,
  minStock,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
}) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const where = {
    companyId: Number(companyId),
  };

  // =============================
  // SUCURSAL
  // =============================

  if (branchId) {
    where.branchId = Number(branchId);
  }

  // =============================
  // FILTROS DE STOCK
  // =============================

  switch (stockStatus) {
    case "out":
      where.stock = 0;
      break;

    case "low":
      where.stock = {
        gt: 0,
        lte: Number(minStock || 5),
      };
      break;

    case "available":
      where.stock = {
        gt: Number(minStock || 5),
      };
      break;

    default:
      break;
  }

  // =============================
  // PRODUCTO
  // =============================

  where.product = {};

  // Categoría

  if (categoryId) {
    where.product.categoryId = Number(categoryId);
  }

  // Buscador

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

  // =============================
  // ORDENAMIENTO
  // =============================

  const validSorts = [
    "createdAt",
    "stock",
    "lastUpdated",
  ];

  const orderBy = validSorts.includes(sortBy)
    ? {
      [sortBy]: order === "asc" ? "asc" : "desc",
    }
    : {
      createdAt: "desc",
    };

  // =============================
  // CONSULTAS
  // =============================

  const [inventories, total] = await Promise.all([
    prisma.inventory.findMany({
      where,

      include: {
        branch: true,

        product: {
          include: {
            category: true,
            unit: true,
          },
        },
      },

      skip,
      take: limit,

      orderBy,
    }),

    prisma.inventory.count({
      where,
    }),
  ]);

  return {
    data: inventories,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
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