// ========================================
// repositories/sale-detail.repository.js
// ========================================

const prisma = require("../../../prisma/client");

// Objeto de inclusión base estandarizado para optimizar la transferencia de datos
const defaultInclude = {
    product: {
        select: {
            id: true,
            name: true,
            sku: true,
            barcode: true,
            salePrice: true,
        }
    },
    batch: true,
    sale: {
        select: {
            id: true,
            saleNumber: true,
            sellerId: true, // Corregido según tu esquema real de base de datos
            status: true,
            createdAt: true,
        }
    }
};

module.exports = {

    // ========================================
    // FIND ALL (Con Paginación y Filtros Dinámicos)
    // ========================================
    findAll: async (filters = {}) => {
        // 1. Extraer parámetros de paginación y filtros analíticos
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 10;
        const skip = (page - 1) * limit;

        const { companyId, userId, productId, saleId, search, itemType } = filters;
        const whereClause = {};

        // 2. Filtros de relación directos por llaves foráneas
        if (productId) whereClause.productId = Number(productId);
        if (saleId) whereClause.saleId = Number(saleId);

        // 3. Filtro por tipo de registro (Ej: si discriminas PRODUCTO de SERVICIO)
        if (itemType) {
            whereClause.product = {
                ...whereClause.product,
                type: itemType, // Asumiendo que existe el campo en tu modelo Product
            };
        }

        // 4. Búsqueda de coincidencia global (Fuzzy Search por texto)
        if (search) {
            whereClause.OR = [
                { product: { name: { contains: search, mode: "insensitive" } } },
                { product: { sku: { contains: search, mode: "insensitive" } } },
                { sale: { saleNumber: { contains: search, mode: "insensitive" } } }
            ];
        }

        // 5. Restricciones de aislamiento multi-inquilino y roles (Seller / Company)
        if (companyId || userId) {
            whereClause.sale = {
                ...whereClause.sale,
            };
            if (companyId) whereClause.sale.companyId = Number(companyId);
            if (userId) whereClause.sale.sellerId = Number(userId); // Mapeado a sellerId de forma segura
        }

        // 6. Transacción atómica simultánea (Datos + Contador total)
        const [total, data] = await prisma.$transaction([
            prisma.saleDetail.count({ where: whereClause }),
            prisma.saleDetail.findMany({
                where: whereClause,
                include: defaultInclude,
                skip,
                take: limit,
                orderBy: {
                    id: "desc",
                },
            }),
        ]);

        // 7. Retorna la estructura gemela a la paginación de tu módulo de Ventas
        return {
            info: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            results: data,
        };
    },

    // ========================================
    // FIND BY ID
    // ========================================
    findById: async (id) => {
        return prisma.saleDetail.findUnique({
            where: { id: Number(id) },
            include: defaultInclude,
        });
    },

    // ========================================
    // FIND BY SALE
    // ========================================
    findBySaleId: async (saleId, sellerIdRestriction) => {
        const whereClause = {
            saleId: Number(saleId),
        };

        if (sellerIdRestriction !== undefined) {
            whereClause.sale = {
                sellerId: Number(sellerIdRestriction),
            };
        }

        return prisma.saleDetail.findMany({
            where: whereClause,
            include: defaultInclude,
            orderBy: {
                id: "asc",
            },
        });
    },

    // ========================================
    // FIND BY PRODUCT
    // ========================================
    findByProductId: async (productId, sellerIdRestriction) => {
        const whereClause = {
            productId: Number(productId),
        };

        if (sellerIdRestriction !== undefined) {
            whereClause.sale = {
                sellerId: Number(sellerIdRestriction),
            };
        }

        return prisma.saleDetail.findMany({
            where: whereClause,
            include: defaultInclude,
            orderBy: {
                id: "desc",
            },
        });
    },
};