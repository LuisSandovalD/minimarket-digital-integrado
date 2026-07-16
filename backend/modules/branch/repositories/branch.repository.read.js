const prisma = require("../../../prisma/client");

exports.findAll = async (companyId, options = {}) => {
  const { search, city, country, isActive, page = 1, limit = 10 } = options;

  const where = {
    companyId: Number(companyId),
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { address: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (city) {
    where.city = { contains: city, mode: "insensitive" };
  }

  if (country) {
    where.country = { contains: country, mode: "insensitive" };
  }

  if (typeof isActive === "boolean") {
    where.isActive = isActive;
  }

  const skip = (page - 1) * limit;

  const [total, branches] = await prisma.$transaction([
    prisma.branch.count({ where }),
    prisma.branch.findMany({
      where,
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    branches,
  };
};

exports.findById = (id, companyId) => {
  return prisma.branch.findFirst({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null,
    },
  });
};
