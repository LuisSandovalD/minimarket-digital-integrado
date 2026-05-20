// ========================================
// repositories/user.create.repository.js
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

const create = async (
  data
) => {

  return prisma.user.create({

    data,

    include: {

      ...baseInclude,

      subordinates: true,

    },

  });

};

module.exports = {

  create,

};