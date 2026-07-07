// ========================================
// repositories/product.read.repository.js
// ========================================

const prisma = require("../../../prisma/client");

const baseInclude = {
    category: true,
    unit: true,
    inventory: true,
};

const baseWhere = (companyId) => ({
    companyId,
    isDeleted: false,
});
// ========================================
// GET ALL (CON PAGINACIÓN Y FILTROS EN PRISMA)
// ========================================

exports.getAll = async (companyId, options = {}) => {
    const { page, limit, search, categoryId, status, sortBy, sortOrder } = options;

    // 1. Construcción dinámica de filtros sobre el baseWhere
    const where = {
        ...baseWhere(companyId),
        ...(categoryId && { categoryId }),
        ...(status && { isActive: status === "active" }), // Ajusta según manejes tu enum o boolean de estado
        ...(search && {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { sku: { contains: search, mode: "insensitive" } },
                { barcode: { contains: search, mode: "insensitive" } },
            ],
        }),
    };

    // 2. Ejecución en paralelo con una transacción de Prisma (Rápido y eficiente)
    const [data, total] = await prisma.$transaction([
        prisma.product.findMany({
            where,
            include: baseInclude,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
        }),
        prisma.product.count({ where }),
    ]);

    return { data, total };
};

// ========================================
// GET BY ID
// ========================================

exports.getById = async (id, companyId) => {
    return prisma.product.findFirst({
        where: {
            ...baseWhere(companyId),
            id,
        },
        include: {
            ...baseInclude,
            notifications: true,
        },
    });
};

// ========================================
// GET FEATURED
// ========================================

exports.getFeatured = async (companyId) => {
    return prisma.product.findMany({
        where: {
            ...baseWhere(companyId),
            isFeatured: true,
        },
    });
};

// ========================================
// FIND BY SKU
// ========================================

exports.findBySku = async (sku, companyId) => {
    return prisma.product.findFirst({
        where: {
            sku,
            companyId,
        },
    });
};

// ========================================
// FIND BY BARCODE
// ========================================

exports.findByBarcode = async (
    barcode,
    companyId
) => {
    return prisma.product.findFirst({
        where: {
            barcode,
            companyId,
            isDeleted: false,
        },
    });
};

// ========================================
// LOW STOCK
// ========================================

exports.getLowStock = async (companyId) => {
    return prisma.inventory.findMany({
        where: {
            companyId,
            product: {
                isDeleted: false,
                isActive: true,
            },
        },
        include: {
            product: {
                include: {
                    category: true,
                    unit: true,
                },
            },
            branch: true,
        },
    });
};