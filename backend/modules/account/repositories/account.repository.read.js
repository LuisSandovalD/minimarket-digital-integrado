const prisma = require("../../../prisma/client");

module.exports = {
  getByIdWithRelations: async (userId) => {
    return prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            email: true,
            phone: true,
            website: true,
            subscriptionTier: true,
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
            code: true,
            logo: true,
            address: true,
            city: true,
            state: true,
            country: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        subordinates: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
          },
        },
        sessions: {
          where: {
            isActive: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        _count: {
          select: {
            sales: true,
            purchases: true,
            supportTickets: true,
            notifications: true,
            sessions: true,
          },
        },
      },
    });
  },

  getByIdBasic: async (userId) => {
    return prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
  },

  checkEmailDuplicate: async (userId, email) => {
    return prisma.user.findFirst({
      where: {
        email: email,
        NOT: {
          id: Number(userId),
        },
      },
    });
  },

  getActiveSessions: async (userId) => {
    return prisma.userSession.findMany({
      where: {
        userId: Number(userId),
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getSessionByIdAndUser: async (userId, sessionId) => {
    return prisma.userSession.findFirst({
      where: {
        id: Number(sessionId),
        userId: Number(userId),
      },
    });
  },
};
