const express = require("express");
const router = express.Router();

// 1. Controladores
const { getConfiguration, updateConfiguration } = require("../controllers/configuration.controller");

// 2. Middlewares
const validate = require("../middlewares/validate");

// 🔑 IMPORTACIÓN SEGURA EN DOS PASOS:
// Primero importamos el objeto completo del módulo de auth
const authModule = require("../../auth/middlewares/auth.middleware");
// Segundo, extraemos la función callback (mira cómo se llama en tu archivo: verifyToken, protect, o auth)
const verifyToken = authModule.verifyToken || authModule.protect || authModule;

const { updateConfigurationSchema } = require("../validators/configuration.validation");

// Rutas protegidas pasando la función callback real
router.get("/", verifyToken, getConfiguration);
router.put("/", verifyToken, validate(updateConfigurationSchema), updateConfiguration);

module.exports = router;
