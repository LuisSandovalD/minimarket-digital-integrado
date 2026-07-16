// ========================================
// middlewares/validate.middleware.js
// ========================================

module.exports = (
  schema,
  source = "body",
) => {

  return (
    req,
    res,
    next,
  ) => {

    // 🛡️ ÚNICO CAMBIO SEGURIDAD: Evita que el servidor muera si el esquema no existe
    if (!schema || typeof schema.validate !== "function") {
      console.error(`❌ ERROR DE CONFIGURACIÓN: El esquema enviado al validador para "${req.originalUrl}" es undefined.`);
      return res.status(500).json({
        success: false,
        message: "Error de configuración interna en el validador de la ruta.",
      });
    }

    const data =
      req[source];

    const {
      error,
      value,
    } = schema.validate(
      data,
      {
        abortEarly: false,
        stripUnknown: true,
      },
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message:
          "Errores de validación",
        errors:
          error.details.map(
            (detail) => ({
              field:
                detail.path.join("."),
              message:
                detail.message,
            }),
          ),
      });
    }

    req[source] =
      value;

    next();

  };

};
