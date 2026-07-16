const prisma = require("../../../prisma/client");

exports.create = (data) => {
  return prisma.branch.create({
    data: {
      name: data.name,
      code: data.code,
      address: data.address,
      phone: data.phone,
      email: data.email,
      logo: data.logo,
      description: data.description,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
      companyId: Number(data.companyId),
    },
  });
};

exports.update = (id, data) => {
  const { id: _, companyId: __, createdAt, ...updateData } = data;

  return prisma.branch.update({
    where: {
      id: Number(id),
    },
    data: {
      ...updateData,
      updatedAt: new Date(),
    },
  });
};

exports.softDelete = (id) => {
  return prisma.branch.update({
    where: {
      id: Number(id),
    },
    data: {
      deletedAt: new Date(),
    },
  });
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

exports.getBranches = async (companyId, options = {}) => {
  const { search, city, country, isActive, page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  const where = {
    companyId: Number(companyId),
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
    ];
  }

  if (city) where.city = city;
  if (country) where.country = country;
  if (isActive !== undefined) where.isActive = isActive;

  const [total, branches] = await prisma.$transaction([
    prisma.branch.count({ where }),
    prisma.branch.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
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
