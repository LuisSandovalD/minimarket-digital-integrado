// ========================================
// repositories/user.soft-delete.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

const softDelete = async (
  id,
  companyId
) => {

  return prisma.user.updateMany({

    where: {

      id,
      companyId,

    },

    data: {

      isDeleted: true,

      deletedAt:
        new Date(),

    },

  });

};

module.exports = {

  softDelete,

};