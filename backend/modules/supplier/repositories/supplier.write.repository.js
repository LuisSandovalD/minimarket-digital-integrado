const prisma = require("../../../prisma/client");

exports.create = (data) => {
  return prisma.supplier.create({
    data,
  });
};

exports.update = (id, companyId, data) => {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null,
    },
    data,
  });
};

exports.softDelete = (id, companyId) => {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null,
    },
    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });
};

exports.restore = (id, companyId) => {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId),
    },
    data: {
      isActive: true,
      deletedAt: null,
    },
  });
};

exports.updateDebt = (id, companyId, amount) => {
  return prisma.supplier.updateMany({
    where: {
      id: Number(id),
      companyId: Number(companyId),
      deletedAt: null,
    },
    data: {
      currentDebt: amount,
    },
  });
};
