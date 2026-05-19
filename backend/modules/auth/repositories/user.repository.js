// ========================================
// repositories/user.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

/* ======================================
 * FIND USER BY EMAIL
 * ==================================== */

exports.findUserByEmail =
  async (email) => {

    return prisma.user.findFirst({

      where: {

        email,

        isDeleted: false,

      },

      include: {

        company: true,

        branch: true,

      },

    });

  };

/* ======================================
 * FIND USER BY ID
 * ==================================== */

exports.findUserById =
  async (id) => {

    return prisma.user.findUnique({

      where: {
        id,
      },

      include: {

        company: true,

        branch: true,

      },

    });

  };

/* ======================================
 * CREATE USER
 * ==================================== */

exports.createUser =
  async (data) => {

    return prisma.user.create({

      data,

      include: {

        company: true,

        branch: true,

      },

    });

  };