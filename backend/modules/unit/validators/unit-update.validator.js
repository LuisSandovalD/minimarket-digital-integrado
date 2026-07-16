module.exports.validateUpdateUnit = (req, res, next) => {
  const {
    name,
    abbreviation,
    type,
    conversionFactor,
  } = req.body;

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "El nombre no puede estar vacío.",
    });
  }

  if (abbreviation !== undefined && !abbreviation.trim()) {
    return res.status(400).json({
      success: false,
      message: "La abreviación no puede estar vacía.",
    });
  }

  if (
    conversionFactor !== undefined &&
        (isNaN(Number(conversionFactor)) || Number(conversionFactor) <= 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "El factor de conversión debe ser mayor a 0.",
    });
  }

  if (type !== undefined && !type) {
    return res.status(400).json({
      success: false,
      message: "El tipo de unidad es obligatorio.",
    });
  }

  next();
};
