const prisma = require("../../../prisma/client");

exports.create = async (data) => {
  return prisma.category.create({ data });
};

exports.update = async (id, data) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

exports.softDelete = async (id) => {
  return prisma.category.update({
    where: { id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
};
