// ========================================
// controllers/register.controller.js
// ========================================

const authService =
  require("../services/auth.service");

const {
  successResponse,
  errorResponse,
} = require("../responses/auth.response");

/* ======================================
 * REGISTER
 * ==================================== */

exports.register = async (
  req,
  res
) => {

  try {

    // ==============================
    // REGISTER SERVICE
    // ==============================

    const data =
      await authService.register(
        req.body
      );

    // ==============================
    // RESPONSE
    // ==============================

    return successResponse(

      res,
      data,
      201

    );

  } catch (error) {

    return errorResponse(
      res,
      error
    );

  }

};