// ========================================
// controllers/register.controller.js
// ========================================

const authService = require("../services/auth.service");
const { validateRegister } = require("../validators/auth.validator");
const { successResponse, errorResponse } = require("../responses/auth.response");
const { getDeviceInfo } = require("../helpers/device.helper");

/* ======================================
 * REGISTER
 * ==================================== */
const register = async (req, res) => {
  try {
    // ======================================
    // VALIDAR CUERPO DE LA PETICIÓN
    // ======================================
    await validateRegister(req.body); // Evita cargas inválidas a la DB

    const device = getDeviceInfo(req);

    const data = await authService.register({
      body: req.body,
      device,
    });

    return successResponse(res, data, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// EXPORTACIÓN UNIFICADA BLINDADA: Elimina objetos vacíos o valores undefined en tiempo de arranque
module.exports = {
  register
};