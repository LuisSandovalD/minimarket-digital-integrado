// ========================================
// repositories/user/user.repository.js
// ========================================

const prisma = require("../../../prisma/client");

/* ======================================
 * FIND USER BY EMAIL
 * ==================================== */
const findUserByEmail = async (email, tx = null) => {
  const client = tx || prisma;
  return client.user.findFirst({
    where: {
      email: email.trim().toLowerCase(),
      isDeleted: false,
    },
    include: {
      company: true,
      branch: true,
      employeeProfile: true,
    },
  });
};

/* ======================================
 * FIND USER BY ID
 * ==================================== */
const findUserById = async (id, tx = null) => {
  const client = tx || prisma;
  return client.user.findUnique({
    where: { id },
    include: {
      company: true,
      branch: true,
      employeeProfile: true,
    },
  });
};

/* ======================================
 * FIND USER WITH RELATIONS AND STATS
 * ==================================== */
const findUserWithRelationsAndStats = async (id, tx = null) => {
  const client = tx || prisma;
  return client.user.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      company: true,
      branch: true,
      employeeProfile: true,
      manager: true,
      subordinates: {
        where: { isDeleted: false },
      },
      _count: {
        select: {
          sales: true,
          purchases: true,
          supportTickets: true,
          assignedTickets: true,
          notifications: true,
        },
      },
    },
  });
};

// Manejo de estado de login exitoso
const handleSuccessfulLoginState = async (id, tx = null) => {
  const client = tx || prisma;
  return client.user.update({
    where: { id },
    data: {
      isOnline: true,
      lastLogin: new Date(),
      loginAttempts: 0,
      lockedUntil: null,
    },
  });
};

/* ======================================
 * CREATE USER (Limpio y compatible con tu esquema actual)
 * ==================================== */
const createUser = async (data, tx = null) => {
  const client = tx || prisma;
  return client.user.create({
    data,
    include: {
      company: true,
      branch: true,
    },
  });
};

/* ======================================
 * UPDATE USER
 * ==================================== */
const updateUser = async (id, data, tx = null) => {
  const client = tx || prisma;
  return client.user.update({
    where: { id },
    data,
  });
};

// NOTA: "findUserBySlug" ha sido removido completamente de aquí
module.exports = {
  findUserByEmail,
  findUserById,
  findUserWithRelationsAndStats,
  createUser,
  updateUser,
  handleSuccessfulLoginState,
};
