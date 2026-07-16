const prisma = require("../../../prisma/client");

module.exports = {
  create: async (data) => {
    return prisma.unit.create({
      data,
    });
  },

  update: async (id, data) => {
    return prisma.unit.update({
      where: {
        id,
      },
      data,
    });
  },

  delete: async (id) => {
    return prisma.unit.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  },
};
