const prisma = require("../../../prisma/client");


// OBTENER SUCURSALES CON FILTROS, BUSCADOR Y PAGINACIÓN

exports.findAll = (companyId, options = {}) => {
    const {
        search,     // Texto para buscar en nombre, código, etc.
        city,       // Filtro por ciudad
        country,    // Filtro por país
        isActive,   // Filtro por estado activo (true/false)
        page = 1,   // Paginación: número de página
        limit = 10  // Paginación: cantidad por página
    } = options;

    // 1. Definimos las condiciones base (Filtros fijos)
    const where = {
        companyId: Number(companyId),
        deletedAt: null,
        isDeleted: false,
    };

    // 2. Si hay un término de búsqueda, usamos un operador OR para buscar en múltiples campos
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { address: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
        ];
    }

    // 3. Filtros adicionales opcionales
    if (city) {
        where.city = { contains: city, mode: 'insensitive' };
    }

    if (country) {
        where.country = { contains: country, mode: 'insensitive' };
    }

    if (typeof isActive === 'boolean') {
        where.isActive = isActive;
    }

    // 4. Calculamos el offset para la paginación
    const skip = (page - 1) * limit;

    // 5. Ejecutamos la consulta en Prisma
    return prisma.branch.findMany({
        where,
        take: limit,
        skip: skip,
        orderBy: {
            createdAt: "desc",
        },
    });
};

// OBTENER SUCURSAL POR ID

exports.findById = (id, companyId) => {
    return prisma.branch.findFirst({
        where: {
            id,
            companyId,
            deletedAt: null,
        },
    });
};