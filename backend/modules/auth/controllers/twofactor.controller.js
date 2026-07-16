// ========================================
// controllers/twofactor.controller.js
// ========================================

// Apuntamos al servicio especializado de 2FA modularizado sin romper la consistencia
const twoFactorService = require("../services/twofactor.service");
const { successResponse, errorResponse } = require("../responses/auth.response");

/* ======================================
 * SETUP 2FA (GENERAR SECRETO Y QR)
 * ==================================== */
const setupTwoFactor = async (req, res) => {
  try {
    const userId = req.user.id;

    // Genera el secreto temporal y la URL del código QR (sin activar aún en DB)
    const setupData = await twoFactorService.generateTwoFactorSecret(userId);

    return successResponse(res, setupData);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* ======================================
 * ENABLE 2FA (VERIFICAR Y ACTIVAR DEFINITIVO)
 * CORREGIDO: Captura contraseña y token desde el Paso 2 de React
 * ==================================== */
const enableTwoFactor = async (req, res) => {
  try {
    // Extraemos tanto el token como la contraseña que viajan desde el frontend
    const { token, password } = req.body;
    const userId = req.user.id;

    if (!password) {
      throw new Error("La contraseña de tu cuenta es requerida para activar la protección");
    }

    if (!token?.trim() || token.trim().length !== 6) {
      throw new Error("El código de verificación de 6 dígitos es requerido y debe ser válido");
    }

    // Sincronizado con los 3 parámetros que espera el servicio seguro
    const backupCodes = await twoFactorService.verifyAndEnableTwoFactor(
      userId,
      password,
      token.trim(),
    );

    return successResponse(res, {
      message: "Autenticación de dos factores activada exitosamente",
      backupCodes, // Retorno de códigos de respaldo si tu lógica los provee
    });
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

/* ======================================
 * DISABLE 2FA
 * ==================================== */
const disableTwoFactor = async (req, res) => {
  try {
    const { password } = req.body; // Solicitar contraseña por seguridad extra al remover 2FA
    const userId = req.user.id;

    if (!password) {
      throw new Error("Se requiere la contraseña para deshabilitar 2FA");
    }

    await twoFactorService.disableTwoFactor(userId, password);

    return successResponse(res, {
      message: "Autenticación de dos factores deshabilitada exitosamente",
    });
  } catch (error) {
    return errorResponse(res, error, 400); // Cambiado a 400 por si la contraseña es incorrecta
  }
};

/* ======================================
 * VERIFY 2FA (DURANTE EL LOGIN - PASO 2)
 * ==================================== */
const verifyTwoFactor = async (req, res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token?.trim()) {
      throw new Error("ID de usuario y código de 6 dígitos requeridos");
    }

    // AUTOMATIZACIÓN DE DISPOSITIVOS: Capturamos la IP y el User Agent del cliente de forma segura
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || null;
    const userAgent = req.headers["user-agent"] || null;

    // Enviamos las variables al servicio para que la sesión se registre de forma 100% automática
    const loginData = await twoFactorService.loginStepTwoFA(
      userId,
      token.trim(),
      ipAddress,
      userAgent,
    );

    return successResponse(res, loginData);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

// EXPORTACIÓN UNIFICADA BLINDADA
module.exports = {
  setupTwoFactor,
  enableTwoFactor,
  disableTwoFactor,
  verifyTwoFactor,
};
