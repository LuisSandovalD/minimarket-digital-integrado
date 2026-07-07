module.exports.validateUnitQuery = (req, res, next) => {
    const {
        page,
        limit,
        sortBy,
        sortOrder,
        isActive,
        type,
    } = req.query;

    const validSortFields = [
        "id",
        "name",
        "abbreviation",
        "type",
        "conversionFactor",
        "isActive",
    ];

    const validTypes = [
        "MASS",
        "LENGTH",
        "AREA",
        "VOLUME",
        "TIME",
        "TEMPERATURE",
        "COUNT",
        "PACKAGE",
        "OTHER",
    ];

    if (page && (isNaN(page) || Number(page) < 1)) {
        return res.status(400).json({
            success: false,
            message: "La página debe ser un número mayor a 0.",
        });
    }

    if (limit && (isNaN(limit) || Number(limit) < 1 || Number(limit) > 100)) {
        return res.status(400).json({
            success: false,
            message: "El límite debe estar entre 1 y 100.",
        });
    }

    if (sortBy && !validSortFields.includes(sortBy)) {
        return res.status(400).json({
            success: false,
            message: "Campo de ordenamiento inválido.",
        });
    }

    if (sortOrder && !["asc", "desc"].includes(sortOrder)) {
        return res.status(400).json({
            success: false,
            message: "sortOrder debe ser asc o desc.",
        });
    }

    if (typeof isActive !== "undefined" && !["true", "false"].includes(isActive)) {
        return res.status(400).json({
            success: false,
            message: "isActive debe ser true o false.",
        });
    }

    if (type && !validTypes.includes(type)) {
        return res.status(400).json({
            success: false,
            message: "Tipo de unidad inválido.",
        });
    }

    next();
};