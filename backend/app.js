// ========================================
// app.js (Modificado)
// ========================================

require("dotenv").config();
const express = require("express");
const app = express();

app.set("trust proxy", 1);

// Importamos el controlador del webhook que creamos previamente
const webhookCtrl = require("./modules/auth/controllers/webhook.controller");

/* =========================================================================
 * 1. RUTA DEL WEBHOOK DE STRIPE (🚨 CRÍTICO: ANTES DE CUALQUIER CONFIGURACIÓN)
 * ========================================================================= */
// Al colocarlo aquí, nos aseguramos de capturar los datos en formato Raw (Buffer)
// antes de que pasen por app.config donde probablemente se inicializa express.json()
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  webhookCtrl.handleWebhook
);

/* =========================================================================
 * 2. CONFIGURACIONES GLOBALES Y PARSEO (JSON, CORS, ETC.)
 * ========================================================================= */
require("./config/app.config")(app);
require("./config/static.config")(app);

const { auditContextMiddleware } = require("./middleware/auditContext");
app.use(auditContextMiddleware);

/* =========================================================================
 * 3. CONTROL DE RUTAS DE LA APLICACIÓN
 * ========================================================================= */
require("./config/routes.config")(app);

// NUEVO: Registro del módulo de Inteligencia Artificial Gemini
const geminiRoutes = require("./modules/gemini_google/routes/gemini.routes");
app.use("/api/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ERP POS API funcionando correctamente",
    version: "1.0.0",
    timestamp: new Date(),
  });
});

/* =========================================================================
 * 4. MANEJO DE ERRORES Y RUTA NO ENCONTRADA (404 / 500)
 * ========================================================================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;