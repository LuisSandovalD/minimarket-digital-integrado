// ========================================
// services/auth/session.service.js
// ========================================

// Importamos de manera explícita los repositorios especializados necesarios
const sessionRepository = require("../repositories/session.repository");
const userRepository = require("../repositories/user.repository");
const auditRepository = require("../repositories/audit.repository");

/* ======================================
 * LOGOUT
 * ==================================== */
const logout = async ({ user, token }) => {

  if (token) {
    await sessionRepository.deactivateSessionByToken(token);
  }

  if (user?.id) {
    // Actualizamos el estado de conexión del usuario
    await userRepository.updateUser(
      user.id,
      { isOnline: false },
    );

    // Registramos la acción en la bitácora de auditoría
    await auditRepository.createAuditLog({
      userId: user.id,
      companyId: user.companyId,
      action: "LOGOUT",
      entityType: "USER",
      entityId: user.id,
      description: "Sesión cerrada explícitamente por el usuario",
    });
  }

  return {
    success: true,
    message: "Sesión finalizada correctamente",
  };
};

/* ======================================
 * TERMINATE ALL SESSIONS
 * ==================================== */
const terminateAllUserSessions = async (userId) => {

  if (!userId) {
    throw new Error("ID de usuario mandatorio");
  }

  // Buscamos datos del usuario para obtener el companyId requerido por la auditoría
  const user = await userRepository.findUserById(userId);

  // Desactivamos todas las sesiones
  await sessionRepository.deactivateAllSessions(userId);

  // Cambiamos el estado en línea
  await userRepository.updateUser(
    userId,
    { isOnline: false },
  );

  // Registramos la revocación forzada
  await auditRepository.createAuditLog({
    userId,
    companyId: user?.companyId,
    action: "LOGOUT",
    entityType: "USER",
    entityId: userId,
    description: "Revocación forzada de todos los dispositivos activos",
  });

  return {
    success: true,
    message: "Se han cerrado todas las sesiones activas en otros dispositivos",
  };
};

/* ======================================
 * GET USER SESSIONS
 * ==================================== */
const getUserSessionsList = async (userId) => {
  return sessionRepository.findAllActiveSessions(userId);
};

/* ======================================
 * REVOKE SINGLE SESSION
 * ==================================== */
const revokeSingleSession = async (sessionId, userId) => {

  const session = await sessionRepository.findSessionById(sessionId);

  if (!session || session.userId !== userId) {
    throw new Error("La sesión no existe o no pertenece a tu cuenta");
  }

  await sessionRepository.deactivateSessionById(sessionId);

  return {
    success: true,
    message: "Dispositivo revocado exitosamente",
  };
};

module.exports = {
  logout,
  terminateAllUserSessions,
  getUserSessionsList,
  revokeSingleSession,
};
