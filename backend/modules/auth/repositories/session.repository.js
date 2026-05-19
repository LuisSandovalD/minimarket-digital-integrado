// ========================================
// repositories/session.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

/* ======================================
 * UPDATE LAST LOGIN
 * ==================================== */

exports.updateLastLogin =
  async (id) => {

    return prisma.user.update({

      where: {
        id,
      },

      data: {

        isOnline: true,

        lastLogin:
          new Date(),

      },

    });

  };

/* ======================================
 * UPDATE LOGOUT
 * ==================================== */

exports.updateLogout =
  async (id) => {

    return prisma.user.update({

      where: {
        id,
      },

      data: {

        isOnline: false,

        lastLogout:
          new Date(),

      },

    });

  };