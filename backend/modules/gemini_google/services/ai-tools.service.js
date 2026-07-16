const prisma = require("../../../prisma/client");
;

const getTopProducts = async (
  companyId,
  limit = 10,
) => {
  const products =
        await prisma.saleDetail.groupBy({
          by: ["productId"],

          _sum: {
            quantity: true,
            subtotal: true,
          },

          orderBy: {
            _sum: {
              quantity: "desc",
            },
          },

          take: limit,
        });

  return products;
};

const getLowStockProducts = async (
  companyId,
) => {
  return prisma.inventory.findMany({
    where: {
      companyId,
      stock: {
        lte: 10,
      },
    },

    include: {
      product: true,
    },
  });
};

const getTopCategories = async (
  companyId,
) => {
  return prisma.category.findMany({
    where: {
      companyId,
    },

    include: {
      products: true,
    },
  });
};

module.exports = {
  getTopProducts,
  getLowStockProducts,
  getTopCategories,
};
