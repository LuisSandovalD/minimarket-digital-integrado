const prisma = require("../../../prisma/client");

const getTopCustomers = async (
  companyId,
  dateFilter,
  limit = 10,
) => {

  return prisma.customer.findMany({
    where: {
      companyId,
    },

    include: {
      sales: {
        where: {
          createdAt: dateFilter,
        },
      },
    },

    take: limit,
  });
};

const getCustomerCount = async (
  companyId,
) => {

  return prisma.customer.count({
    where: {
      companyId,
    },
  });
};

module.exports = {
  getTopCustomers,
  getCustomerCount,
};
