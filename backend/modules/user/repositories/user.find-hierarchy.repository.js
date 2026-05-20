// ========================================
// repositories/user.find-hierarchy.repository.js
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

module.exports = {

  findHierarchy,

};