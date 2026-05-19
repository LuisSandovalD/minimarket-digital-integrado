const prisma =
  require("../../../prisma/client");

async function create(data) {
  return prisma.supplier.create({
    data
  })
}

async function update(id, companyId, data) {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null
    },
    data
  })
}

async function softDelete(id, companyId) {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null
    },
    data: {
      isActive: false,
      deletedAt: new Date()
    }
  })
}

async function restore(id, companyId) {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId)
    },
    data: {
      isActive: true,
      deletedAt: null
    }
  })
}

async function updateDebt(id, companyId, amount) {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null
    },
    data: {
      currentDebt: amount
    }
  })
}

module.exports = {
  create,
  update,
  softDelete,
  restore,
  updateDebt
}