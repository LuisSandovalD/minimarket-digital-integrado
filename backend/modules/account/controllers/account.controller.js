// ========================================
// controllers/account.controller.js
// ========================================

const service =
  require("../services/account.service");

const {

  updateProfileValidation,

  changePasswordValidation,

  twoFactorValidation,

  deleteAccountValidation,

} = require(
  "../validations/account.validation"
);

/* ======================================
 * GET MY ACCOUNT
 * ==================================== */

exports.getMyAccount =
  async (req, res) => {

    try {

      const user =
        await service.getMyAccount(
          req.user.id
        );

      return res.status(200).json({

        success: true,

        user,

      });

    } catch (error) {

      console.error(
        "GET ACCOUNT ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Error obteniendo cuenta",

      });

    }

  };

/* ======================================
 * UPDATE ACCOUNT
 * ==================================== */

exports.updateMyAccount =
  async (req, res) => {

    try {

      updateProfileValidation(
        req.body
      );

      const updatedUser =
        await service.updateMyAccount(

          req.user.id,

          req.body

        );

      return res.status(200).json({

        success: true,

        message:
          "Cuenta actualizada correctamente",

        user:
          updatedUser,

      });

    } catch (error) {

      console.error(
        "UPDATE ACCOUNT ERROR:",
        error
      );

      return res.status(400).json({

        success: false,

        message:
          error.message ||
          "Error actualizando cuenta",

      });

    }

  };

/* ======================================
 * UPDATE PASSWORD
 * ==================================== */

exports.updatePassword =
  async (req, res) => {

    try {

      changePasswordValidation(
        req.body
      );

      await service.updatePassword(

        req.user.id,

        req.body

      );

      return res.status(200).json({

        success: true,

        message:
          "Contraseña actualizada correctamente",

      });

    } catch (error) {

      console.error(
        "UPDATE PASSWORD ERROR:",
        error
      );

      return res.status(400).json({

        success: false,

        message:
          error.message ||
          "Error actualizando contraseña",

      });

    }

  };

/* ======================================
 * ENABLE / DISABLE 2FA
 * ==================================== */

exports.toggleTwoFactor =
  async (req, res) => {

    try {

      twoFactorValidation({
        enabled:
          req.body.enabled,
      });

      const result =
        await service.toggleTwoFactor(
          req.user.id,
          req.body.enabled
        );

      return res.status(200).json({

        success: true,

        message:
          result.enabled
            ? "Autenticación 2FA activada"
            : "Autenticación 2FA desactivada",

        twoFactorEnabled:
          result.enabled,

      });

    } catch (error) {

      console.error(
        "2FA ERROR:",
        error
      );

      return res.status(400).json({

        success: false,

        message:
          error.message ||
          "Error actualizando 2FA",

      });

    }

  };

/* ======================================
 * GET ACTIVE SESSIONS
 * ==================================== */

exports.getSessions =
  async (req, res) => {

    try {

      const sessions =
        await service.getSessions(
          req.user.id
        );

      return res.status(200).json({

        success: true,

        sessions,

      });

    } catch (error) {

      console.error(
        "GET SESSIONS ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Error obteniendo sesiones",

      });

    }

  };

/* ======================================
 * CLOSE SESSION
 * ==================================== */

exports.closeSession =
  async (req, res) => {

    try {

      const sessionId =
        Number(req.params.id);

      await service.closeSession(

        req.user.id,

        sessionId

      );

      return res.status(200).json({

        success: true,

        message:
          "Sesión cerrada correctamente",

      });

    } catch (error) {

      console.error(
        "CLOSE SESSION ERROR:",
        error
      );

      return res.status(400).json({

        success: false,

        message:
          error.message ||
          "Error cerrando sesión",

      });

    }

  };

  /* ======================================
 * DELETE ACCOUNT
 * ==================================== */

exports.deleteMyAccount =
  async (req, res) => {

    try {

      deleteAccountValidation(
        req.body
      );

      await service.deleteMyAccount(

        req.user.id,

        req.body

      );

      return res.status(200).json({

        success: true,

        message:
          "Cuenta eliminada correctamente",

      });

    } catch (error) {

      console.error(
        "DELETE ACCOUNT ERROR:",
        error
      );

      return res.status(400).json({

        success: false,

        message:
          error.message ||
          "Error eliminando cuenta",

      });

    }

  };