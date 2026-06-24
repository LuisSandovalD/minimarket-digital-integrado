// ========================================
// repositories/session.repository.js
// ========================================

const prisma = require("../../../prisma/client");

/* ======================================
 * CREATE SESSION
 * ==================================== */
/**
 * Inserta de forma automática un nuevo registro de sesión activa en la base de datos
 * mapeando todas las propiedades de auditoría del dispositivo conectado.
 */
const createSession = async (data, tx = null) => {
  const client = tx || prisma;
  return client.userSession.create({
    data: {
      userId: data.userId,
      token: data.token,
      refreshToken: data.refreshToken,
      ipAddress: data.ipAddress || null,
      userAgent: data.userAgent || null,
      expiresAt: data.expiresAt,
      refreshExpiresAt: data.refreshExpiresAt,
      isActive: data.isActive !== undefined ? data.isActive : true
    }
  });
};

/* ======================================
 * FIND SESSION BY TOKEN
 * ==================================== */
const findSessionByToken = async (token, tx = null) => {
  const client = tx || prisma;
  return client.userSession.findFirst({
    where: {
      token,
      isActive: true
    }
  });
};

/* ======================================
 * FIND SESSION BY REFRESH TOKEN
 * ==================================== */
/**
 * Utilizado por el flujo de rotación de tokens (/refresh) para validar 
 * la autenticidad y el estado del Refresh Token.
 */
const findSessionByRefreshToken = async (refreshToken, tx = null) => {
  const client = tx || prisma;
  return client.userSession.findFirst({
    where: {
      refreshToken,
      isActive: true
    }
  });
};

/* ======================================
 * FIND SESSION BY ID
 * ==================================== */
const findSessionById = async (id, tx = null) => {
  const client = tx || prisma;
  return client.userSession.findUnique({
    where: { id }
  });
};

/* ======================================
 * FIND ALL ACTIVE SESSIONS
 * ==================================== */
const findAllActiveSessions = async (userId, tx = null) => {
  const client = tx || prisma;
  return client.userSession.findMany({
    where: {
      userId,
      isActive: true
    },
    orderBy: {
      createdAt: "desc"
    },
  });
};

/* ======================================
 * DEACTIVATE SESSION BY TOKEN
 * ==================================== */
const deactivateSessionByToken = async (token, tx = null) => {
  const client = tx || prisma;
  return client.userSession.updateMany({
    where: {
      token,
      isActive: true
    },
    data: {
      isActive: false
    },
  });
};

/* ======================================
 * DEACTIVATE SESSION BY ID
 * ==================================== */
const deactivateSessionById = async (id, tx = null) => {
  const client = tx || prisma;
  return client.userSession.update({
    where: { id },
    data: {
      isActive: false
    },
  });
};

/* ======================================
 * DEACTIVATE ALL SESSIONS
 * ==================================== */
const deactivateAllSessions = async (userId, tx = null) => {
  const client = tx || prisma;
  return client.userSession.updateMany({
    where: {
      userId,
      isActive: true
    },
    data: {
      isActive: false
    },
  });
};

/* ======================================
 * UPDATE SESSION TOKEN (ROTACIÓN DE REFRESH)
 * ==================================== */
/**
 * Al renovar los tokens, este método actualiza atómicamente el par de llaves 
 * en la fila correspondiente de la sesión junto con sus nuevas expiraciones.
 */
const updateSessionToken = async ({ id, newToken, newRefreshToken, newExpiresAt, newRefreshExpiresAt }, tx = null) => {
  const client = tx || prisma;
  return client.userSession.update({
    where: { id },
    data: {
      token: newToken,
      refreshToken: newRefreshToken,
      expiresAt: newExpiresAt,
      refreshExpiresAt: newRefreshExpiresAt
    }
  });
};

// EXPORTACIÓN UNIFICADA BLINDADA
module.exports = {
  createSession,
  findSessionByToken,
  findSessionByRefreshToken, // Añadido para dar soporte completo a la columna indexada única
  findSessionById,
  findAllActiveSessions,
  deactivateSessionByToken,
  deactivateSessionById,
  deactivateAllSessions,
  updateSessionToken
};