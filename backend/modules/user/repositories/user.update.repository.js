// ========================================
// repositories/user.update.repository.js
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

const update = async (
  id,
  companyId,
  data
) => {

  return prisma.user.update({

    where: {
      id,
      companyId,
    },

    data,

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

  });

};

module.exports = {

  update,

};