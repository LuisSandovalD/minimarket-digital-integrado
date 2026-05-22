const prisma = require("../../../prisma/client");

const findByCompany = async (companyId) => {
  return prisma.configuration.findUnique({
    where: {
      companyId,
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          ruc: true,
          email: true,
        },
      },
    },
  });
};

const createConfiguration = async (data) => {
  return prisma.configuration.create({
    data,
  });
};

const updateConfiguration = async (
  companyId,
  data
) => {
  return prisma.configuration.update({
    where: {
      companyId,
    },
    data,
    include: {
      company: {
        select: {
          id: true,
          name: true,
          ruc: true,
        },
      },
    },
  });
};

module.exports = {
  findByCompany,
  createConfiguration,
  updateConfiguration,
};