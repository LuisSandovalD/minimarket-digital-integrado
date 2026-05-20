// ========================================
// repositories/user.find-by-id.repository.js
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

const findById = async (
  id,
  companyId
) => {

  return prisma.user.findFirst({

    where: {

      id,
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

      sales: true,

      purchases: true,

    },

  });

};

module.exports = {

  findById,

};