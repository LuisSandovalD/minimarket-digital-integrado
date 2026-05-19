// ========================================
// repositories/user.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// BASE INCLUDE
// ========================================

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

// ========================================
// FIND ALL
// ========================================

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

// ========================================
// FIND BY ID
// ========================================

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

// ========================================
// FIND HIERARCHY
// ========================================

const findHierarchy = async (
  companyId
) => {

  return prisma.user.findMany({

    where: {

      companyId,
      isDeleted: false,
      managerId: null,

    },

    include: {

      ...baseInclude,

      subordinates: {

        where: {
          isDeleted: false,
        },

        include: {

          ...baseInclude,

          branch: true,

          subordinates: {

            where: {
              isDeleted: false,
            },

            include: {

              ...baseInclude,

              branch: true,

              subordinates: {

                where: {
                  isDeleted: false,
                },

                include: {
                  branch: true,
                },

              },

            },

          },

        },

      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

// ========================================
// FIND USERS BY MANAGER
// ========================================

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

// ========================================
// CREATE
// ========================================

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

// ========================================
// UPDATE
// ========================================

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

// ========================================
// TOGGLE STATUS
// ========================================

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

// ========================================
// SOFT DELETE
// ========================================

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

// ========================================
// RESTORE
// ========================================

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

  findAll,

  findById,

  findHierarchy,

  findByManager,

  create,

  update,

  toggleStatus,

  softDelete,

  restore,

};