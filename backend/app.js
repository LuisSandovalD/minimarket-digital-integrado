require("dotenv").config();

const express =
  require("express");

const app =
  express();

// ==========================================
// TRUST PROXY
// ==========================================

app.set(
  "trust proxy",
  1
);

// ==========================================
// CONFIGURACIONES
// ==========================================

require(
  "./config/app.config"
)(app);

require(
  "./config/static.config"
)(app);

require(
  "./config/routes.config"
)(app);

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "ERP POS API funcionando correctamente",

    version: "1.0.0",

    timestamp:
      new Date(),

  });

});

// ==========================================
// 404
// ==========================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      "Ruta no encontrada",

  });

});

// ==========================================
// ERROR HANDLER
// ==========================================

const errorHandler =
  require(
    "./middleware/errorHandler"
  );

app.use(errorHandler);

// ==========================================
// EXPORT
// ==========================================

module.exports =
  app;