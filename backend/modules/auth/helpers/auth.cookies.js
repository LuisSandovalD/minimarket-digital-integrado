// ========================================
// helpers/auth.cookies.js
// ========================================

const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días para consistencia de persistencia
};

/* ======================================
 * SET AUTH COOKIE (PERSISTE AMBOS TOKENS)
 * ==================================== */
const setAuthCookie = (res, token) => {
  // Guardamos el token de acceso regular
  res.cookie("access_token", token, cookieConfig);

  // CORREGIDO: Guardamos también el refresh_token si el flujo lo retorna
  res.cookie("refresh_token", token, cookieConfig);
};

/* ======================================
 * CLEAR AUTH COOKIE (BORRADO SEGURO GLOBAL)
 * ==================================== */
const clearAuthCookie = (res) => {
  // Desestructuramos para eliminar maxAge del borrado seguro de cookies
  const { maxAge, ...clearConfig } = cookieConfig;

  // Limpieza absoluta de ambas compuertas en el cliente web
  res.clearCookie("access_token", clearConfig);
  res.clearCookie("refresh_token", clearConfig);
};

// EXPORTACIÓN UNIFICADA BLINDADA
module.exports = {
  setAuthCookie,
  clearAuthCookie
};