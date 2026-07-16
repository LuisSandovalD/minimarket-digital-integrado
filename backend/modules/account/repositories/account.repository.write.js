const prisma = require("../../../prisma/client");

module.exports = {
  updateProfile: async (userId, data) => {
    return prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar,
      },
      include: {
        company: true,
        branch: true,
        manager: true,
        subordinates: true,
        sessions: true,
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

  updatePassword: async (userId, hashedPassword) => {
    return prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        password: hashedPassword,
        loginAttempts: 0,
      },
    });
  },

  updateSessionStatus: async (sessionId, isActive) => {
    return prisma.userSession.update({
      where: {
        id: Number(sessionId),
      },
      data: {
        isActive,
      },
    });
  },

  revokeAllUserSessions: async (userId) => {
    return prisma.userSession.updateMany({
      where: {
        userId: Number(userId),
      },
      data: {
        isActive: false,
      },
    });
  },

  update2FAStatus: async (userId, enabled) => {
    return prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        twoFactorEnabled: enabled,
      },
    });
  },

  softDeleteAccount: async (userId) => {
    return prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        isDeleted: true,
        isActive: false,
        isOnline: false,
        deletedAt: new Date(),
      },
    });
  },

  createAuditLog: async (logData) => {
    return prisma.auditLog.create({
      data: {
        action: logData.action,
        entityType: logData.entityType,
        entityId: Number(logData.entityId),
        description: logData.description,
        userId: Number(logData.userId),
        companyId: logData.companyId,
        branchId: logData.branchId,
      },
    });
  },
};
