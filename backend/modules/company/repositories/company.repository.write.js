const prisma = require("../../../prisma/client");

// CREAR EMPRESA
exports.create = (data) => {
  return prisma.company.create({
    data,
  });
};

// ACTUALIZAR EMPRESA
exports.update = (id, data) => {
  return prisma.company.update({
    where: {
      id,
    },
    data,
  });
};

// ELIMINAR EMPRESA (SOFT DELETE)
exports.softDelete = (id) => {
  return prisma.company.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });
};
