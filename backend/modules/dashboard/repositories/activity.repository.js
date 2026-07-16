const prisma = require("../../../prisma/client");

const getRecentActivity = async (
  companyId,
  limit = 20,
) => {

  return prisma.auditLog.findMany({
    where: {
      companyId,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: limit,
  });
};

const getUserSessions = async (
  companyId,
) => {

  return prisma.userSession.findMany({

    where: {
      user: {
        companyId,
      },
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  getRecentActivity,
  getUserSessions,
};
