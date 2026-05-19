const prisma =
  require("../../../prisma/client");

async function searchSuppliers(companyId, search) {
  return prisma.supplier.findMany({
    where: {
      companyId: Number(companyId),
      deletedAt: null,

      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          ruc: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          email: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          contactPerson: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ]
    },

    orderBy: {
      name: 'asc'
    },

    take: 20
  })
}

module.exports = {
  searchSuppliers
}