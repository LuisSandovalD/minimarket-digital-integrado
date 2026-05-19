// ========================================
// controllers/session.controller.js
// ========================================

const authService =
  require("../services/auth.service");

const {
  clearAuthCookie,
} = require("../helpers/auth.cookies");

const {
  successResponse,
  errorResponse,
} = require("../responses/auth.response");

/* ======================================
 * LOGOUT
 * ==================================== */

exports.logout = async (
  req,
  res
) => {

  try {

    // ==============================
    // CLEAR COOKIE
    // ==============================

    clearAuthCookie(
      res
    );

    // ==============================
    // LOGOUT SERVICE
    // ==============================

    const data =
      await authService.logout(
        req.user
      );

    // ==============================
    // RESPONSE
    // ==============================

    return successResponse(
      res,
      data
    );

  } catch (error) {

    return errorResponse(
      res,
      error
    );

  }

};