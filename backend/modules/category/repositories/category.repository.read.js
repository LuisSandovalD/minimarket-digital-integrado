const prisma = require("../../../prisma/client");

exports.getAll = async ({ companyId, search = "", page = 1, limit = 10 }) => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (parsedPage - 1) * parsedLimit;

  const whereClause = {
    companyId,
    isDeleted: false,
  };

  if (search && search.trim() !== "") {
    whereClause.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Ejecutamos en paralelo
  const [categories, totalItems] = await Promise.all([
    prisma.category.findMany({
      where: whereClause,
      include: {
        parent: { select: { id: true, name: true } },
        children: {
          where: { isDeleted: false },
          select: { id: true, name: true },
        },
        _count: { select: { products: true, children: true } },
      },
      // CORRECCIÓN CLAVE: Primero las que NO tienen parentId (id: desc o name: asc)
      // para obligar a Prisma a mandar las raíces a la primera página.
      orderBy: [
        { parentId: { sort: "asc", nulls: "first" } },
        { name: "asc" },
      ],
      skip: skip,
      take: parsedLimit,
    }),
    prisma.category.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalItems / parsedLimit);

  return {
    categories,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      totalItems,
      totalPages,
      hasNextPage: parsedPage < totalPages,
      hasPrevPage: parsedPage > 1,
    },
  };
};
exports.getById = async (id, companyId) => {
  return prisma.category.findFirst({
    where: { id, companyId, isDeleted: false },
    include: {
      parent: { select: { id: true, name: true } },
      children: { where: { isDeleted: false } },
      products: {
        where: { isDeleted: false },
        select: { id: true, name: true, price: true, stock: true },
      },
      _count: { select: { children: true, products: true } },
    },
  });
};

exports.exists = async (id, companyId) => {
  return prisma.category.findFirst({
    where: { id, companyId, isDeleted: false },
    select: { id: true },
  });
};

exports.hasChildren = async (id) => {
  const count = await prisma.category.count({
    where: { parentId: id, isDeleted: false },
  });
  return count > 0;
};

exports.hasProducts = async (id) => {
  const count = await prisma.product.count({
    where: { categoryId: id, isDeleted: false },
  });
  return count > 0;
};
