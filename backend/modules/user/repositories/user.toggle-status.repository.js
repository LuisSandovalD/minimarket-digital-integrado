// ========================================
// repositories/user.toggle-status.repository.js
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

const toggleStatus = async (
  id,
  companyId
) => {

  const user =
    await prisma.user.findFirst({

      where: {

        id,
        companyId,
        isDeleted: false,

      },

    });

  if (!user) {

    throw new Error(
      "Usuario no encontrado"
    );

  }

  return prisma.user.update({

    where: {
      id,
    },

    data: {
      isActive:
        !user.isActive,
    },

    include: {

      ...baseInclude,

    },

  });

};

module.exports = {

  toggleStatus,

};