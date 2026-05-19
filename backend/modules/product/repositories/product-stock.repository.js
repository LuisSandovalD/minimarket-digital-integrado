const prisma = require("../../../prisma/client");

exports.getLowStock = async (companyId) => {
  return prisma.inventory.findMany({
    where: {
      companyId,
      product: {
        isDeleted: false,
        isActive: true,
      },
    },
    include: {
      product: {
        include: {
          category: true,
          unit: true,
        },
      },
      branch: true,
    },
  });
};