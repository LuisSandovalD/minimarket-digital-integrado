// ========================================
// services/account.service.js
// ========================================

const bcrypt =
  require("bcryptjs");

const prisma =
  require("../../../prisma/client");

const mapper =
  require("../utils/account.mapper");

const {

  updateProfileValidation,

  changePasswordValidation,

  deleteAccountValidation,

} = require(
  "../validations/account.validation"
);

/* ======================================
 * GET MY ACCOUNT
 * ==================================== */

exports.getMyAccount =
  async (userId) => {

    const user =
      await prisma.user.findUnique({

        where: {
          id: Number(userId),
        },

        include: {

          /* ======================================
           * COMPANY
           * ==================================== */

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

          /* ======================================
           * BRANCH
           * ==================================== */

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

          /* ======================================
           * MANAGER
           * ==================================== */

          manager: {

            select: {

              id: true,

              name: true,

              email: true,

              role: true,

            },

          },

          /* ======================================
           * SUBORDINATES
           * ==================================== */

          subordinates: {

            select: {

              id: true,

              name: true,

              email: true,

              role: true,

              avatar: true,

            },

          },

          /* ======================================
           * SESSIONS
           * ==================================== */

          sessions: {

            where: {
              isActive: true,
            },

            orderBy: {
              createdAt: "desc",
            },

            take: 10,

          },

          /* ======================================
           * COUNTS
           * ==================================== */

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

    if (!user) {

      throw new Error(
        "Usuario no encontrado"
      );

    }

    return mapper(user);

  };

/* ======================================
 * UPDATE PROFILE
 * ==================================== */

exports.updateMyAccount =
  async (userId, data) => {

    updateProfileValidation(
      data
    );

    /* ======================================
     * VERIFY EMAIL
     * ==================================== */

    const exists =
      await prisma.user.findFirst({

        where: {

          email: data.email,

          NOT: {
            id: Number(userId),
          },

        },

      });

    if (exists) {

      throw new Error(
        "El correo ya está en uso"
      );

    }

    /* ======================================
     * UPDATE USER
     * ==================================== */

    const updated =
      await prisma.user.update({

        where: {
          id: Number(userId),
        },

        data: {

          name:
            data.name,

          email:
            data.email,

          phone:
            data.phone,

          avatar:
            data.avatar,

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

    /* ======================================
     * AUDIT LOG
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "UPDATE",

        entityType: "USER",

        entityId: updated.id,

        description:
          "Actualización de perfil",

        userId: updated.id,

        companyId:
          updated.companyId,

        branchId:
          updated.branchId,

      },

    });

    return mapper(updated);

  };

/* ======================================
 * UPDATE PASSWORD
 * ==================================== */

exports.updatePassword =
  async (userId, data) => {

    changePasswordValidation(
      data
    );

    const user =
      await prisma.user.findUnique({

        where: {
          id: Number(userId),
        },

      });

    if (!user) {

      throw new Error(
        "Usuario no encontrado"
      );

    }

    /* ======================================
     * VERIFY PASSWORD
     * ==================================== */

    const valid =
      await bcrypt.compare(
        data.currentPassword,
        user.password
      );

    if (!valid) {

      throw new Error(
        "Contraseña actual incorrecta"
      );

    }

    /* ======================================
     * HASH PASSWORD
     * ==================================== */

    const hashed =
      await bcrypt.hash(
        data.newPassword,
        10
      );

    /* ======================================
     * UPDATE PASSWORD
     * ==================================== */

    await prisma.user.update({

      where: {
        id: Number(userId),
      },

      data: {

        password: hashed,

        loginAttempts: 0,

      },

    });

    /* ======================================
     * AUDIT LOG
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "UPDATE",

        entityType: "PASSWORD",

        entityId:
          Number(userId),

        description:
          "Cambio de contraseña",

        userId:
          Number(userId),

        companyId:
          user.companyId,

        branchId:
          user.branchId,

      },

    });

  };

/* ======================================
 * GET ACTIVE SESSIONS
 * ==================================== */

exports.getSessions =
  async (userId) => {

    return prisma.userSession.findMany({

      where: {

        userId:
          Number(userId),

        isActive: true,

      },

      orderBy: {
        createdAt: "desc",
      },

    });

  };

/* ======================================
 * REVOKE SESSION
 * ==================================== */

exports.revokeSession =
  async (userId, sessionId) => {

    const session =
      await prisma.userSession.findFirst({

        where: {

          id:
            Number(sessionId),

          userId:
            Number(userId),

        },

      });

    if (!session) {

      throw new Error(
        "Sesión no encontrada"
      );

    }

    await prisma.userSession.update({

      where: {
        id:
          Number(sessionId),
      },

      data: {
        isActive: false,
      },

    });

  };

/* ======================================
 * ENABLE 2FA
 * ==================================== */

exports.enable2FA =
  async (userId) => {

    await prisma.user.update({

      where: {
        id: Number(userId),
      },

      data: {
        twoFactorEnabled: true,
      },

    });

  };

/* ======================================
 * DISABLE 2FA
 * ==================================== */

exports.disable2FA =
  async (userId) => {

    await prisma.user.update({

      where: {
        id: Number(userId),
      },

      data: {
        twoFactorEnabled: false,
      },

    });

  };

/* ======================================
 * DELETE ACCOUNT
 * ==================================== */

exports.deleteMyAccount =
  async (userId, data) => {

    deleteAccountValidation(
      data
    );

    const user =
      await prisma.user.findUnique({

        where: {
          id: Number(userId),
        },

      });

    if (!user) {

      throw new Error(
        "Usuario no encontrado"
      );

    }

    /* ======================================
     * VERIFY PASSWORD
     * ==================================== */

    const valid =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!valid) {

      throw new Error(
        "Contraseña incorrecta"
      );

    }

    /* ======================================
     * SOFT DELETE
     * ==================================== */

    await prisma.user.update({

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

    /* ======================================
     * CLOSE SESSIONS
     * ==================================== */

    await prisma.userSession.updateMany({

      where: {
        userId:
          Number(userId),
      },

      data: {
        isActive: false,
      },

    });

    /* ======================================
     * AUDIT LOG
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "SOFT_DELETE",

        entityType: "USER",

        entityId:
          Number(userId),

        description:
          "Eliminación de cuenta",

        userId:
          Number(userId),

        companyId:
          user.companyId,

        branchId:
          user.branchId,

      },

    });

  };

  /* ======================================
 * TOGGLE 2FA
 * ==================================== */

exports.toggleTwoFactor =
  async (
    userId,
    enabled
  ) => {

    const updatedUser =
      await prisma.user.update({

        where: {
          id: Number(userId),
        },

        data: {

          twoFactorEnabled:
            enabled,

        },

      });

    /* ======================================
     * AUDIT LOG
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "UPDATE",

        entityType: "USER_2FA",

        entityId:
          updatedUser.id,

        description:
          enabled
            ? "2FA activado"
            : "2FA desactivado",

        userId:
          updatedUser.id,

        companyId:
          updatedUser.companyId,

        branchId:
          updatedUser.branchId,

      },

    });

    return {

      enabled,

    };

  };