module.exports.validateCreateUnit = (req, res, next) => {
    const {
        name,
        abbreviation,
        type,
        conversionFactor,
    } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "El nombre es obligatorio.",
        });
    }

    if (!abbreviation || !abbreviation.trim()) {
        return res.status(400).json({
            success: false,
            message: "La abreviación es obligatoria.",
        });
    }

    if (!type) {
        return res.status(400).json({
            success: false,
            message: "El tipo de unidad es obligatorio.",
        });
    }

    if (
        conversionFactor === undefined ||
        isNaN(Number(conversionFactor)) ||
        Number(conversionFactor) <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "El factor de conversión debe ser mayor a 0.",
        });
    }

    next();
};