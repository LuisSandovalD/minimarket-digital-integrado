const {
  getPurchasesRepository,
} = require("../repositories/get-purchases.repository");

async function getPurchasesService(filters = {}) {

  const {

    page = 1,
    limit = 10,

    search,
    status,
    supplierId,
    buyerId,
    branchId,

    startDate,
    endDate,

    sortBy = "createdAt",
    sortOrder = "desc",

  } = filters;

  const where = {};

  // ==========================
  // Búsqueda
  // ==========================

  if (search) {

    where.OR = [

      {
        purchaseNumber: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        notes: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        supplier: {
          is: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },

    ];

  }

  // ==========================
  // Estado
  // ==========================

  if (status) {

    where.status = status;

  }

  // ==========================
  // Proveedor
  // ==========================

  if (supplierId) {

    where.supplierId = Number(supplierId);

  }

  // ==========================
  // Comprador
  // ==========================

  if (buyerId) {

    where.buyerId = Number(buyerId);

  }

  // ==========================
  // Sucursal
  // ==========================

  if (branchId) {

    where.branchId = Number(branchId);

  }

  // ==========================
  // Fechas
  // ==========================

  if (startDate || endDate) {

    where.createdAt = {};

    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }

    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }

  }

  return getPurchasesRepository({

    page: Number(page),
    limit: Number(limit),

    where,

    sortBy,
    sortOrder,

  });

}

module.exports = {
  getPurchasesService,
};
