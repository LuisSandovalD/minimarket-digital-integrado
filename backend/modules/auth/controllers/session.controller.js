// ========================================
// controllers/session.controller.js
// ========================================

const authService = require("../services/auth.service");
const { clearAuthCookie } = require("../helpers/auth.cookies");
const { successResponse, errorResponse } = require("../responses/auth.response");

/* ======================================
 * LOGOUT
 * ==================================== */
const logout = async (req, res) => {
  try {
    const token = req.cookies?.access_token || req.headers.authorization?.split(" ")[1];
    const data = await authService.logout({
      user: req.user,
      token: token,
    });

    clearAuthCookie(res);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* ======================================
 * LOGOUT ALL
 * ==================================== */
const logoutAll = async (req, res) => {
  try {
    const data = await authService.terminateAllUserSessions(req.user.id);
    clearAuthCookie(res);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* ======================================
 * GET SESSIONS
 * ==================================== */
const getSessions = async (req, res) => {
  try {
    const sessions = await authService.getUserSessionsList(req.user.id);
    return successResponse(res, { sessions });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* ======================================
 * REVOKE SESSION (CORREGIDO PARA PRISMA INT)
 * ==================================== */
const revokeSession = async (req, res) => {
  try {
    // 1. Extraemos "id" porque mapea con la ruta /sessions/:id
    // 2. Agregamos el "+" para transformar el string "11" en el número 11 inmediatamente
    const sessionId = +req.params.id;

    // Validación de seguridad por si no viene o el cast falla (NaN)
    if (!sessionId || isNaN(sessionId)) {
      return errorResponse(res, new Error("ID de sesión inválido o requerido en la URL"));
    }

    // Pasamos el ID numérico limpio al servicio de autenticación
    const data = await authService.revokeSingleSession(sessionId, req.user.id);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// EXPORTACIÓN UNIFICADA BLINDADA: Cero mutaciones y compatibilidad total con destructuraciones
module.exports = {
  logout,
  logoutAll,
  getSessions,
  revokeSession
};