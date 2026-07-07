// ========================================
// services/user.service.js
// ========================================

const prisma = require("../../../prisma/client");

const userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    phone: true,
    avatar: true,
    isActive: true,
    isDeleted: true,
    isOnline: true,
    lastLogin: true,
    lastLogout: true,
    twoFactorEnabled: true,
    managerId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    companyId: true,
    branchId: true,
    branch: {
        select: {
            id: true,
            name: true,
            code: true,
            logo: true,
            description: true,
            address: true,
            phone: true,
            email: true,
            city: true,
            state: true,
            country: true,
            postalCode: true,
            isActive: true,
            companyId: true,
        },
    },
    manager: {
        select: {
            id: true,
            name: true,
            role: true,
        },
    },
};

const subordinateSelect = {
    ...userSelect,
    subordinates: {
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            avatar: true,
            isActive: true,
            isOnline: true,
            lastLogin: true,
            createdAt: true,
            companyId: true,
            branchId: true,
            branch: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                },
            },
        },
        where: {
            isDeleted: false,
        },
    },
};

/**
 * Obtener todos los usuarios con filtros dinámicos y paginación
 */
const findAll = async (companyId, params = {}) => {
    const {
        page = 1,
        limit = 10,
        search,
        branchId,
        isActive,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = params;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Construcción dinámica de filtros WHERE
    const where = {
        companyId,
        isDeleted: false,
    };

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
        ];
    }

    if (branchId) {
        where.branchId = branchId;
    }

    if (isActive !== undefined) {
        where.isActive = isActive === true || isActive === "true";
    }

    // Ejecución paralela para optimizar tiempos de respuesta
    const [data, totalItems] = await Promise.all([
        prisma.user.findMany({
            where,
            select: subordinateSelect,
            skip,
            take,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / take);

    return {
        data,
        pagination: {
            currentPage: Number(page),
            totalPages,
            totalItems,
            itemsPerPage: take,
            hasPrevPage: Number(page) > 1,
            hasNextPage: Number(page) < totalPages,
        },
    };
};

/**
 * Buscar usuario por ID con relaciones extendidas
 */
const findById = async (id, companyId) => {
    return prisma.user.findFirst({
        where: {
            id,
            companyId,
            isDeleted: false,
        },
        select: {
            ...subordinateSelect,
            sales: true,
            purchases: true,
        },
    });
};

/**
 * Buscar usuarios que dependen de un manager con filtros y paginación
 */
const findByManager = async (managerId, companyId, params = {}) => {
    const { page = 1, limit = 10 } = params;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {
        managerId,
        companyId,
        isDeleted: false,
    };

    const [data, totalItems] = await Promise.all([
        prisma.user.findMany({
            where,
            select: subordinateSelect,
            skip,
            take,
            orderBy: {
                createdAt: "asc",
            },
        }),
        prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / take);

    return {
        data,
        pagination: {
            currentPage: Number(page),
            totalPages,
            totalItems,
            itemsPerPage: take,
            hasPrevPage: Number(page) > 1,
            hasNextPage: Number(page) < totalPages,
        },
    };
};

/**
 * Obtener árbol jerárquico (Líderes raíz sin managerId asignado)
 */
const findHierarchy = async (companyId) => {
    return prisma.user.findMany({
        where: {
            companyId,
            isDeleted: false,
            managerId: null, // Usuarios raíz (CEO, Administradores, etc.)
        },
        select: {
            ...userSelect,
            subordinates: {
                where: { isDeleted: false },
                select: {
                    ...userSelect,
                    subordinates: {
                        where: { isDeleted: false },
                        select: {
                            ...userSelect,
                            subordinates: {
                                where: { isDeleted: false },
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    role: true,
                                    phone: true,
                                    avatar: true,
                                    isActive: true,
                                    isOnline: true,
                                    lastLogin: true,
                                    createdAt: true,
                                    companyId: true,
                                    branchId: true,
                                    branch: {
                                        select: {
                                            id: true,
                                            name: true,
                                            code: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

module.exports = {
    findAll,
    findById,
    findByManager,
    findHierarchy,
};