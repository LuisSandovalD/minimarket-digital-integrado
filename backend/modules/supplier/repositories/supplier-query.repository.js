const prisma =
  require("../../../prisma/client");
async function findById(id, companyId) {
  return prisma.supplier.findFirst({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null
    }
  })
}

async function findByName(name, companyId) {
  return prisma.supplier.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      },
      companyId: Number(companyId),
      deletedAt: null
    }
  })
}

async function findByRuc(ruc, companyId) {
  return prisma.supplier.findFirst({
    where: {
      ruc,
      companyId: Number(companyId),
      deletedAt: null
    }
  })
}

async function getAll(companyId, filters = {}) {
  const {
    search,
    isActive,
    page = 1,
    limit = 10
  } = filters

  const skip = (page - 1) * limit

  return prisma.supplier.findMany({
    where: {
      companyId: Number(companyId),
      deletedAt: null,

      ...(typeof isActive === 'boolean' && {
        isActive
      }),

      ...(search && {
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
      })
    },

    skip: Number(skip),
    take: Number(limit),

    orderBy: {
      createdAt: 'desc'
    }
  })
}

async function count(companyId, filters = {}) {
  const {
    search,
    isActive
  } = filters

  return prisma.supplier.count({
    where: {
      companyId: Number(companyId),
      deletedAt: null,

      ...(typeof isActive === 'boolean' && {
        isActive
      }),

      ...(search && {
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
      })
    }
  })
}

module.exports = {
  findById,
  findByName,
  findByRuc,
  getAll,
  count
}