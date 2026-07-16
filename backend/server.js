// ==========================================
// CARGAR VARIABLES DE ENTORNO PRIMERO
// ==========================================
require("dotenv").config();

// ==========================================
// IMPORTACIONES
// ==========================================
const app = require("./app");
const {
  connectDatabase,
  disconnectDatabase,
} = require("./config/prisma.config");

const PORT = process.env.PORT || 5000;

// ==========================================
// VERIFICAR VARIABLES IMPORTANTES (ACTUALIZADO A BREVO API)
// ==========================================
console.log("=================================");
console.log("CONFIGURACIÓN DEL SERVIDOR");
console.log("=================================");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", PORT);
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "CONFIGURADA" : "NO CONFIGURADA");

// Cambiamos el viejo bloque SMTP por la validación visual de la API de Brevo
console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY ? "CONFIGURADA (VÍA API HTTP)" : "NO CONFIGURADA");
console.log("SMTP_FROM:", process.env.SMTP_FROM || "NO CONFIGURADO");

console.log("JWT_SECRET:", process.env.JWT_SECRET ? "CONFIGURADO" : "NO CONFIGURADO");
console.log("=================================");

// ==========================================
// INICIAR SERVIDOR
// ==========================================
(async () => {
  try {
    // Conectar a la base de datos
    await connectDatabase();

    // Iniciar Express
    app.listen(PORT, () => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });

    // Cierre limpio
    const shutdown = async (signal) => {
      console.log(`\n⚠ ${signal} recibido. Cerrando servidor...`);

      try {
        await disconnectDatabase();
        console.log("✅ Base de datos desconectada.");
      } catch (err) {
        console.error("❌ Error cerrando la BD:", err.message);
      }

      process.exit(0);
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (error) {
    console.error("❌ Error al iniciar servidor:");
    console.error(error);
    process.exit(1);
  }
})();
