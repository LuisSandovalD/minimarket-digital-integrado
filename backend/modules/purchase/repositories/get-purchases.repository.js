const prisma =
  require("../../../prisma/client");

const {
  purchaseInclude,
} = require("../includes/purchase.include");

async function getPurchasesRepository({

  page = 1,
  limit = 10,

  where = {},

  sortBy = "createdAt",
  sortOrder = "desc",

}) {

  const skip = (page - 1) * limit;

  const [total, purchases] = await prisma.$transaction([

    prisma.purchase.count({
      where,
    }),

    prisma.purchase.findMany({

      where,

      include: purchaseInclude,

      orderBy: {
        [sortBy]: sortOrder,
      },

      skip,

      take: limit,

    }),

  ]);

  return {

    data: purchases,

    pagination: {

      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),

      hasNext: page < Math.ceil(total / limit),

      hasPrevious: page > 1,

    },

  };

}

module.exports = {
  getPurchasesRepository,
};
