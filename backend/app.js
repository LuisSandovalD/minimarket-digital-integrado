require("dotenv").config();
const express = require("express");
const app = express();

app.set("trust proxy", 1);

require("./config/app.config")(app);
require("./config/static.config")(app);

const { auditContextMiddleware } = require("./middleware/auditContext");
app.use(auditContextMiddleware);

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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;