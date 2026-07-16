// ========================================
// middleware/auth.js
// ========================================

const jwt = require("jsonwebtoken");
const repository = require("../repositories/auth.repository");
const { JWT_SECRET } = require("../constants/auth.constants");
const { sanitizeUser } = require("../utils/sanitizers/user.sanitizer");

module.exports = async (req, res, next) => {
  try {
    let token = null;

    /* ======================================
     * TOKEN DESDE HEADER
     * ==================================== */
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    /* ======================================
     * TOKEN DESDE COOKIE
     * ==================================== */
    if (!token && req.cookies?.access_token) {
      token = req.cookies.access_token;
    }

    /* ======================================
     * TOKEN REQUERIDO
     * ==================================== */
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Acceso no autorizado",
      });
    }

    /* ======================================
     * VERIFY JWT
     * ==================================== */
    const decoded = jwt.verify(token, JWT_SECRET);

    /* ======================================
     * VERIFY SESSION AND FETCH USER (2 en 1)
     * ==================================== */
    // NOTA: Si en tu session.repository implementaste 'findSessionByRefreshToken' con include,
    // asegúrate de que tu 'findSessionByToken' o una nueva función incluya el usuario para optimizar esto.
    // Asumiendo la búsqueda directa por consistencia:
    const session = await repository.findSessionByToken(token);

    if (!session || !session.isActive) {
      return res.status(401).json({
        success: false,
        message: "Sesión expirada o inválida",
      });
    }

    const user = await repository.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    /* ======================================
     * USER DELETED
     * ==================================== */
    if (user.isDeleted) {
      return res.status(403).json({
        success: false,
        message: "Usuario eliminado",
      });
    }

    /* ======================================
     * USER DISABLED
     * ==================================== */
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Usuario deshabilitado",
      });
    }

    /* ======================================
     * ACCOUNT LOCKED
     * ==================================== */
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res.status(403).json({
        success: false,
        message: "Cuenta bloqueada temporalmente",
      });
    }

    /* ======================================
     * SET REQUEST DATA
     * ==================================== */
    req.user = sanitizeUser(user);
    req.company = user.company;
    req.branch = user.branch;
    req.token = token;
    req.session = session;

    /* ======================================
     * NEXT
     * ==================================== */
    next();

  } catch (error) {
    console.error("[AUTH MIDDLEWARE]", error);

    // Si el error es de expiración de JWT o firma inválida devolvemos 401
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
      });
    }

    // Si es un error de base de datos u otro imprevisto, evitamos colgar el servidor
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor en la autenticación",
    });
  }
};
