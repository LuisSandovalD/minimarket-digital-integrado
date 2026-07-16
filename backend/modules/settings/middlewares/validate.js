const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    console.error("Validation Error:", error);

    if (error.name === "ZodError") {
      const issues = error.issues || error.errors || [];

      const formattedErrors = issues.reduce((acc, curr) => {
        const field = curr.path?.join(".") || "general";

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
      message: error.message || "Ocurrió un error inesperado durante la validación",
    });
  }
};

module.exports = validate;
