const prisma = require("../../../prisma/client");

const {
  customerSelect,
} = require("../includes/customer.include");

// ==========================================
// OBTENER TODOS LOS CLIENTES
// ==========================================
exports.getAll = async (companyId, query = {}) => {
  const {
    page = 1,
    limit = 10,
    search,
    city,
    isActive,
  } = query;

  const currentPage = Number(page);
  const pageSize = Number(limit);
  const skip = (currentPage - 1) * pageSize;

  const where = {
    companyId,
    deletedAt: null,

    ...(city && {
      city: {
        contains: city,
        mode: "insensitive",
      },
    }),

    ...(typeof isActive === "boolean" && {
      isActive,
    }),

    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          documentNumber: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),
  };

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      select: customerSelect,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    }),

    prisma.customer.count({
      where,
    }),
  ]);

  return {
    data: customers,
    pagination: {
      page: currentPage,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      hasNextPage: currentPage < Math.ceil(total / pageSize),
      hasPreviousPage: currentPage > 1,
    },
  };
};

// ==========================================
// OBTENER CLIENTE POR ID
// ==========================================

exports.getById = (id, companyId) => {
  return prisma.customer.findFirst({
    where: {
      id,
      companyId,
      deletedAt: null,
    },
    select: customerSelect,
  });
};
