const repository = require("../repositories/unit.repository");

exports.getAll = async (companyId, query = {}) => {
    const {
        search,
        type,
        isActive,
        baseUnit,
        minConversionFactor,
        maxConversionFactor,
        page = 1,
        limit = 10,
        sortBy = "name",
        sortOrder = "asc"
    } = query;

    const filters = {
        search: search?.trim(),
        type,
        baseUnit: baseUnit ? Number(baseUnit) : undefined,
        minConversionFactor: minConversionFactor
            ? Number(minConversionFactor)
            : undefined,
        maxConversionFactor: maxConversionFactor
            ? Number(maxConversionFactor)
            : undefined,
        page: Number(page),
        limit: Number(limit),
        sortBy,
        sortOrder
    };

    // Convertir booleano
    if (typeof isActive !== "undefined") {
        filters.isActive = isActive === "true";
    }

    // Validaciones

    if (filters.page < 1) {
        throw new Error("El número de página debe ser mayor a 0.");
    }

    if (filters.limit < 1 || filters.limit > 100) {
        throw new Error("El límite debe estar entre 1 y 100.");
    }

    const allowedSortFields = [
        "name",
        "abbreviation",
        "type",
        "conversionFactor",
        "isActive",
        "id"
    ];

    if (!allowedSortFields.includes(filters.sortBy)) {
        filters.sortBy = "name";
    }

    if (!["asc", "desc"].includes(filters.sortOrder)) {
        filters.sortOrder = "asc";
    }

    return repository.getAll(companyId, filters);
};

exports.getById = async (id, companyId) => {
    id = Number(id);

    if (Number.isNaN(id) || id <= 0) {
        throw new Error("ID inválido");
    }

    const unit = await repository.getById(id, companyId);

    if (!unit) {
        throw new Error("Unidad no encontrada");
    }

    return unit;
};