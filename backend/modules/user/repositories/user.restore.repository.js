// ========================================
// repositories/user.restore.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

const restore = async (
  id,
  companyId
) => {

  return prisma.user.updateMany({

    where: {

      id,
      companyId,

    },

    data: {

      isDeleted: false,

      deletedAt: null,

    },

  });

};

module.exports = {

  restore,

};