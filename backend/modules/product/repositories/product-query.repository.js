const prisma = require("../../../prisma/client");

const baseInclude = {
  category: true,
  unit: true,
  inventory: true,
};

const baseWhere = (companyId) => ({
  companyId,
  isDeleted: false,
});

exports.getAll = async (companyId) => {
  return prisma.product.findMany({
    where: baseWhere(companyId),
    include: baseInclude,
    orderBy: { createdAt: "desc" },
  });
};

exports.getById = async (id, companyId) => {
  return prisma.product.findFirst({
    where: {
      ...baseWhere(companyId),
      id,
    },
    include: {
      ...baseInclude,
      notifications: true,
    },
  });
};

exports.getFeatured = async (companyId) => {
  return prisma.product.findMany({
    where: {
      ...baseWhere(companyId),
      isFeatured: true,
    },
  });
};