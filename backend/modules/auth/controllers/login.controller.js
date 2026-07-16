// ========================================
// controllers/login.controller.js
// ========================================

const authService = require("../services/auth.service");
const { validateLogin } = require("../validators/auth.validator");
const { setAuthCookie } = require("../helpers/auth.cookies");
const { successResponse, errorResponse } = require("../responses/auth.response");

/* ======================================
 * LOGIN
 * ==================================== */
const login = async (req, res) => {
  try {
    await validateLogin(req.body);
    const { email, password } = req.body;

    // Capturamos IP y User-Agent desde los headers parseados o directos
    const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const data = await authService.login(email, password, ipAddress, userAgent);

    if (data?.accessToken) {
      setAuthCookie(res, data.accessToken);
    }

    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* ======================================
 * REFRESH TOKEN
 * ==================================== */
const refreshToken = async (req, res) => {
  try {
    // CORREGIDO: Buscamos el token de renovación (refresh_token), no el de acceso expirado
    const tokenFromCookie = req.cookies?.refresh_token;
    const tokenFromBody = req.body?.refreshToken;
    const token = tokenFromCookie || tokenFromBody;

    if (!token) {
      throw new Error("Refresh token requerido para procesar la renovación de sesión");
    }

    const data = await authService.refreshUserToken(token);

    if (data?.accessToken) {
      setAuthCookie(res, data.accessToken);
    }

    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error, 401);
  }
};

/* ======================================
 * VERIFY TOKEN
 * ==================================== */
const verifyToken = async (req, res) => {
  try {
    // Si el middleware 'auth' ya se ejecutó con éxito, req.user ya existe y es válido
    if (!req.user) {
      throw new Error("Token inválido o expirado");
    }

    return successResponse(res, { valid: true, user: req.user });
  } catch (error) {
    return errorResponse(res, error, 401);
  }
};

// Exportación unificada para evitar objetos vacíos o 'undefined' en el indexador maestro
module.exports = {
  login,
  refreshToken,
  verifyToken,
};
