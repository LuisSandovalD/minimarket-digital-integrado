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
    data,
  ) => {

    return prisma.inventoryHistory.create({
      data,
    });

  };

// ========================================
// GET MOVEMENTS
// ========================================

// ========================================
// GET MOVEMENTS
// ========================================

exports.getMovements = async ({
  companyId,
  branchId,
  productId,
  type,
  search,
  page = 1,
  limit = 20,
}) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const where = {
    companyId: Number(companyId),
  };

  // ========================================
  // SUCURSAL
  // ========================================

  if (branchId) {
    where.branchId = Number(branchId);
  }

  // ========================================
  // PRODUCTO
  // ========================================

  if (productId) {
    where.productId = Number(productId);
  }

  // ========================================
  // TIPO
  // ========================================

  if (type) {
    where.type = type;
  }

  // ========================================
  // BUSCADOR
  // ========================================

  if (search) {
    where.OR = [
      {
        reason: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        reference: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        product: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        product: {
          sku: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        branch: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  // ========================================
  // CONSULTAS
  // ========================================

  const [data, total] = await Promise.all([
    prisma.inventoryHistory.findMany({
      where,

      include: {
        product: true,
        inventory: true,
        branch: true,
      },

      skip,
      take: limit,

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
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};
// ========================================
// GET PRODUCT MOVEMENTS
// ========================================

exports.getProductMovements =
  async (
    productId,
    companyId,
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
    companyId,
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
