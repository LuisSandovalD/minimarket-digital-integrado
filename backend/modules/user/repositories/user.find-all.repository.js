// ========================================
// repositories/user.find-all.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

const baseInclude = {

  branch: true,

  manager: {

    select: {

      id: true,
      name: true,
      role: true,

    },

  },

};

const findAll = async (
  companyId
) => {

  return prisma.user.findMany({

    where: {

      companyId,
      isDeleted: false,

    },

    include: {

      ...baseInclude,

      subordinates: {

        where: {
          isDeleted: false,
        },

        include: {
          branch: true,
        },

      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

module.exports = {

  findAll,

};