const express = require("express");

const {
  getConfiguration,
  updateConfiguration,
} = require(
  "../controllers/configuration.controller"
);

const validate = require(
  "../middlewares/validate"
);

// ==========================================
// MIDDLEWARE DE AUTENTICACIÓN
// Se encarga de verificar el JWT y crear req.user
// ==========================================

const authMiddleware = require(
  "../../auth/middlewares/auth.middleware"
);

const {
  updateConfigurationSchema,
} = require(
  "../validators/configuration.validation"
);

const router = express.Router();

// ==========================================
// GET CONFIGURATION
// Obtiene la configuración de la empresa
// del usuario autenticado
// ==========================================

router.get(
  "/",
  authMiddleware,
  getConfiguration
);

// ==========================================
// UPDATE CONFIGURATION
// Actualiza la configuración de la empresa
// del usuario autenticado
// ==========================================

router.put(
  "/",
  authMiddleware,
  validate(
    updateConfigurationSchema
  ),
  updateConfiguration
);

module.exports = router;