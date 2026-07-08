const prisma = require("../../../prisma/client");

/**
 * Helper privado para construir los filtros OR de búsqueda comunes
 */
const buildSearchCondition = (search) => {
    if (!search) return {};
    return {
        OR: [
            { name: { contains: search, mode: "insensitive" } },
            { ruc: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { contactPerson: { contains: search, mode: "insensitive" } },
        ],
    };
};

// ========================================
// MÉTODOS DEL REPOSITORIO
// ========================================

exports.findById = (id, companyId) => {
    return prisma.supplier.findFirst({
        where: {
            id: Number(id),
            companyId: Number(companyId),
            deletedAt: null,
        },
    });
};

exports.findByName = (name, companyId) => {
    return prisma.supplier.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive",
            },
            companyId: Number(companyId),
            deletedAt: null,
        },
    });
};

exports.findByRuc = (ruc, companyId) => {
    return prisma.supplier.findFirst({
        where: {
            ruc,
            companyId: Number(companyId),
            deletedAt: null,
        },
    });
};

exports.getAll = (companyId, filters = {}) => {
    const {
        search,
        isActive,
        page = 1,
        limit = 10,
    } = filters;

    const skip = (page - 1) * limit;

    return prisma.supplier.findMany({
        where: {
            companyId: Number(companyId),
            deletedAt: null,
            ...(typeof isActive === "boolean" && { isActive }),
            ...buildSearchCondition(search), // 🔄 Reutilizado
        },
        skip: Number(skip),
        take: Number(limit),
        orderBy: {
            createdAt: "desc",
        },
    });
};

exports.count = (companyId, filters = {}) => {
    const { search, isActive } = filters;

    return prisma.supplier.count({
        where: {
            companyId: Number(companyId),
            deletedAt: null,
            ...(typeof isActive === "boolean" && { isActive }),
            ...buildSearchCondition(search), // 🔄 Reutilizado
        },
    });
};

exports.searchSuppliers = (companyId, search) => {
    // 🛡️ Control de daños: Si no hay término de búsqueda, evitamos un query pesado o con fallos
    if (!search || !search.trim()) return [];

    return prisma.supplier.findMany({
        where: {
            companyId: Number(companyId),
            deletedAt: null,
            ...buildSearchCondition(search.trim()),
        },
        orderBy: {
            name: "asc",
        },
        take: 20,
    });
};