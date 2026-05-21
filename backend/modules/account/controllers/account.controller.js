// ========================================
// controllers/account.controller.js
// ========================================

// Importamos el servicio que se encarga de hablar con la base de datos
const service = require("../services/account.service");

// Importamos las validaciones de seguridad para los datos que envíe el usuario
const {
  updateProfileValidation,

  changePasswordValidation,

  twoFactorValidation,

  deleteAccountValidation,
} = require("../validations/account.validation");

/* ======================================
 * GET MY ACCOUNT
 * Obtiene los datos del perfil del usuario actual
 * ==================================== */

exports.getMyAccount = async (req, res) => {
  try {
    // Busca la información de la cuenta usando el ID del usuario
    const user = await service.getMyAccount(req.user.id);

    // Responde con éxito y envía los datos encontrados
    return res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    // Si hay error, lo muestra en consola
    console.error("GET ACCOUNT ERROR:", error);

    // Responde con un error interno del servidor
    return res.status(500).json({
      success: false,

      message: error.message || "Error obteniendo cuenta",
    });
  }
};

/* ======================================
 * UPDATE ACCOUNT
 * Actualiza la información del perfil
 * ==================================== */

exports.updateMyAccount = async (req, res) => {
  try {
    // Revisa que los datos enviados para actualizar sean válidos
    updateProfileValidation(req.body);

    // Guarda los datos actualizados en la base de datos
    const updatedUser = await service.updateMyAccount(
      req.user.id,

      req.body,
    );

    // Responde indicando que la cuenta se actualizó correctamente
    return res.status(200).json({
      success: true,

      message: "Cuenta actualizada correctamente",

      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE ACCOUNT ERROR:", error);

    // Responde con error si los datos no eran válidos
    return res.status(400).json({
      success: false,

      message: error.message || "Error actualizando cuenta",
    });
  }
};

/* ======================================
 * UPDATE PASSWORD
 * Cambia la contraseña del usuario
 * ==================================== */

exports.updatePassword = async (req, res) => {
  try {
    // Valida que la nueva contraseña cumpla los requisitos
    changePasswordValidation(req.body);

    // Actualiza la contraseña en la base de datos
    await service.updatePassword(
      req.user.id,

      req.body,
    );

    // Avisa que el cambio fue exitoso
    return res.status(200).json({
      success: true,

      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error("UPDATE PASSWORD ERROR:", error);

    return res.status(400).json({
      success: false,

      message: error.message || "Error actualizando contraseña",
    });
  }
};

/* ======================================
 * ENABLE / DISABLE 2FA
 * Activa o desactiva la seguridad en 2 pasos
 * ==================================== */

exports.toggleTwoFactor = async (req, res) => {
  try {
    // Verifica si se envió la orden de activar o desactivar
    twoFactorValidation({
      enabled: req.body.enabled,
    });

    // Ejecuta el cambio en la base de datos
    const result = await service.toggleTwoFactor(req.user.id, req.body.enabled);

    // Responde con el estado actual del 2FA (activado o desactivado)
    return res.status(200).json({
      success: true,

      message: result.enabled
        ? "Autenticación 2FA activada"
        : "Autenticación 2FA desactivada",

      twoFactorEnabled: result.enabled,
    });
  } catch (error) {
    console.error("2FA ERROR:", error);

    return res.status(400).json({
      success: false,

      message: error.message || "Error actualizando 2FA",
    });
  }
};

/* ======================================
 * GET ACTIVE SESSIONS
 * Obtiene los dispositivos donde la cuenta está abierta
 * ==================================== */

exports.getSessions = async (req, res) => {
  try {
    // Busca todas las sesiones activas del usuario
    const sessions = await service.getSessions(req.user.id);

    return res.status(200).json({
      success: true,

      sessions,
    });
  } catch (error) {
    console.error("GET SESSIONS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Error obteniendo sesiones",
    });
  }
};

/* ======================================
 * CLOSE SESSION
 * Cierra la cuenta en un dispositivo específico
 * ==================================== */

exports.closeSession = async (req, res) => {
  try {
    // Identifica qué sesión en específico se quiere cerrar
    const sessionId = Number(req.params.id);

    // Cierra esa sesión en la base de datos
    await service.closeSession(
      req.user.id,

      sessionId,
    );

    return res.status(200).json({
      success: true,

      message: "Sesión cerrada correctamente",
    });
  } catch (error) {
    console.error("CLOSE SESSION ERROR:", error);

    return res.status(400).json({
      success: false,

      message: error.message || "Error cerrando sesión",
    });
  }
};

/* ======================================
 * DELETE ACCOUNT
 * Elimina por completo la cuenta del usuario
 * ==================================== */

exports.deleteMyAccount = async (req, res) => {
  try {
    // Valida la petición para borrar la cuenta
    deleteAccountValidation(req.body);

    // Borra los datos del usuario en la base de datos
    await service.deleteMyAccount(
      req.user.id,

      req.body,
    );

    return res.status(200).json({
      success: true,

      message: "Cuenta eliminada correctamente",
    });
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);

    return res.status(400).json({
      success: false,

      message: error.message || "Error eliminando cuenta",
    });
  }
};
