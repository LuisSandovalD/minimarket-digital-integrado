const prisma = require("../../../prisma/client");

module.exports = {

  getAll: async (companyId) => {

    return prisma.unit.findMany({
      where: {
        companyId,
        isActive: true
      },
      orderBy: {
        name: "asc"
      }
    });

  },

  getById: async (id, companyId) => {

    return prisma.unit.findFirst({
      where: {
        id,
        companyId
      }
    });

  },

  create: async (data) => {

    return prisma.unit.create({
      data
    });

  },

  update: async (id, data) => {

    return prisma.unit.update({
      where: {
        id
      },
      data
    });

  },

  delete: async (id) => {

    return prisma.unit.update({
      where: {
        id
      },
      data: {
        isActive: false
      }
    });

  }

};