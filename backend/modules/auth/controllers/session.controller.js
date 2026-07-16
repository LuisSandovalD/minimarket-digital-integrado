const authService = require("../services/auth.service");
const { clearAuthCookie } = require("../helpers/auth.cookies");
const { successResponse, errorResponse } = require("../responses/auth.response");

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

const logoutAll = async (req, res) => {
  try {
    const data = await authService.terminateAllUserSessions(req.user.id);
    clearAuthCookie(res);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await authService.getUserSessionsList(req.user.id);
    return successResponse(res, { sessions });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const revokeSession = async (req, res) => {
  try {
    const sessionId = parseInt(req.params.sessionId, 10);

    if (!sessionId || isNaN(sessionId)) {
      return errorResponse(res, new Error("ID de sesión inválido o requerido en la URL"), 400);
    }

    const data = await authService.revokeSingleSession(sessionId, req.user.id);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  logout,
  logoutAll,
  getSessions,
  revokeSession,
};
