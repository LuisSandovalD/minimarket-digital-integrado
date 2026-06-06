const app =
  require("./app");

const { connectDatabase, disconnectDatabase } =
  require("./config/prisma.config");

const PORT =
  process.env.PORT || 5000;

(async () => {
  try {
    // Conectar a la base de datos
    await connectDatabase();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(
        `🚀 Servidor ejecutándose en puerto ${PORT}`
      );
    });

    // Manejo de signals
    process.on("SIGINT", async () => {
      console.log("\n⚠ SIGINT recibido - cerrando servidor...");
      await disconnectDatabase();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("\n⚠ SIGTERM recibido - cerrando servidor...");
      await disconnectDatabase();
      process.exit(0);
    });

  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error.message);
    process.exit(1);
  }
})();