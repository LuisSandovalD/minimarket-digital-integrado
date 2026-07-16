const AppError = require("../errors/AppError");

const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library");

module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err);

  let statusCode = err.statusCode || 500;
  let message = "Error interno";

  // Manejar errores de Prisma
  if (err instanceof PrismaClientKnownRequestError) {
    console.error("🔴 Prisma Error Code:", err.code);

    switch (err.code) {
    case "P2002":
      statusCode = 409;
      message = `Violación de restricción única: ${err.meta?.target?.join(", ")}`;
      break;
    case "P2025":
      statusCode = 404;
      message = "Registro no encontrado";
      break;
    case "P2003":
      statusCode = 400;
      message = "Referencia de clave externa inválida";
      break;
    case "P2014":
      statusCode = 400;
      message = "No se puede borrar registro debido a relaciones existentes";
      break;
    case "P1000":
      statusCode = 503;
      message = "Base de datos no disponible";
      break;
    case "P1001":
      statusCode = 503;
      message = "No se puede alcanzar la base de datos";
      break;
    case "P1008":
      statusCode = 408;
      message = "Timeout de operación";
      break;
    default:
      statusCode = 500;
      message = `Error de base de datos: ${err.message}`;
    }
  } else if (err.isOperational) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
};
