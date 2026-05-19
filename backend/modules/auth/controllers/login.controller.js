// ========================================
// controllers/login.controller.js
// ========================================

const authService =
  require("../services/auth.service");

const {
  validateLogin,
} = require("../validators/auth.validation");

const {
  setAuthCookie,
} = require("../helpers/auth.cookies");

const {
  successResponse,
  errorResponse,
} = require("../responses/auth.response");

/* ======================================
 * LOGIN
 * ==================================== */

exports.login = async (
  req,
  res
) => {

  try {

    // ==============================
    // VALIDATE BODY
    // ==============================

    validateLogin(
      req.body
    );

    // ==============================
    // EXTRACT DATA
    // ==============================

    const {
      email,
      password,
    } = req.body;

    // ==============================
    // LOGIN SERVICE
    // ==============================

    const data =
      await authService.login(

        email,
        password

      );

    // ==============================
    // SET COOKIE
    // ==============================

    if (data.token) {

      setAuthCookie(
        res,
        data.token
      );

    }

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