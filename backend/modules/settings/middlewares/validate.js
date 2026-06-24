const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error.name === "ZodError" || error.errors) {
      // Mapeamos los errores de forma inteligente soportando paths anidados
      const formattedErrors = error.errors.reduce((acc, curr) => {
        // Une los paths con puntos (ej: ['company', 'name'] se vuelve 'company.name')
        const field = curr.path.join(".") || "general";
        acc[field] = curr.message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Error de validación en los datos de configuración",
        errors: formattedErrors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error inesperado durante la validación",
    });
  }
};

module.exports = validate;