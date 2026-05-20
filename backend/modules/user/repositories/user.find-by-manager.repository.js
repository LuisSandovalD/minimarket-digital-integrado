// ========================================
// repositories/user.find-by-manager.repository.js
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

const findByManager = async (
  managerId,
  companyId
) => {

  return prisma.user.findMany({

    where: {

      managerId,
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
      createdAt: "asc",
    },

  });

};

module.exports = {

  findByManager,

};