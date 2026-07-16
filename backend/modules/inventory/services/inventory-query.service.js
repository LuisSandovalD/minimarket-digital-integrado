// ========================================
// repositories/inventory-query.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// GET ALL
// ========================================

exports.getAll = async ({
  companyId,
  page = 1,
  limit = 10,
  search,
  branchId,
  categoryId,
  stockStatus,
  minStock = 5,
  sortBy = "createdAt",
  order = "desc",
}) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const where = {
    companyId: Number(companyId),
  };

  // ==========================
  // SUCURSAL
  // ==========================

  if (branchId) {
    where.branchId = Number(branchId);
  }

  // ==========================
  // PRODUCTO
  // ==========================

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

  // ==========================
  // FILTROS DE STOCK
  // ==========================

  switch (stockStatus) {
  case "out":
    where.stock = 0;
    break;

  case "low":
    where.stock = {
      gt: 0,
      lte: Number(minStock),
    };
    break;

  case "available":
    where.stock = {
      gt: Number(minStock),
    };
    break;

  default:
    break;
  }

  // ==========================
  // ORDENAMIENTO
  // ==========================

  const allowedSort = [
    "createdAt",
    "stock",
    "lastUpdated",
  ];

  const orderBy = allowedSort.includes(sortBy)
    ? {
      [sortBy]: order === "asc" ? "asc" : "desc",
    }
    : {
      createdAt: "desc",
    };

  // ==========================
  // CONSULTAS
  // ==========================

  const [data, total] = await Promise.all([
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
      take: limit,

      orderBy,
    }),

    prisma.inventory.count({
      where,
    }),
  ]);

  return {
    data,

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
// GET BY ID
// ========================================

exports.getById =
  async (
    inventoryId,
    companyId,
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
    companyId,
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
    companyId,
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
    threshold = 5,
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
    companyId,
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
    companyId,
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
