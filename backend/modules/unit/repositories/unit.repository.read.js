const prisma = require("../../../prisma/client");

module.exports = {
    getAll: async (companyId, filters = {}) => {
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
        } = filters;

        const where = {
            companyId
        };

        // Búsqueda por nombre o abreviación
        if (search) {
            where.OR = [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    abbreviation: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            ];
        }

        // Tipo
        if (type) {
            where.type = type;
        }

        // Estado
        if (typeof isActive !== "undefined") {
            where.isActive = isActive;
        }

        // Unidad base
        if (baseUnit) {
            where.baseUnit = Number(baseUnit);
        }

        // Rango del factor de conversión
        if (
            minConversionFactor !== undefined ||
            maxConversionFactor !== undefined
        ) {
            where.conversionFactor = {};

            if (minConversionFactor !== undefined) {
                where.conversionFactor.gte = Number(minConversionFactor);
            }

            if (maxConversionFactor !== undefined) {
                where.conversionFactor.lte = Number(maxConversionFactor);
            }
        }

        const [rows, total] = await prisma.$transaction([
            prisma.unit.findMany({
                where,
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
                orderBy: {
                    [sortBy]: sortOrder
                }
            }),

            prisma.unit.count({
                where
            })
        ]);

        return {
            rows,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            }
        };
    },

    getById: async (id, companyId) => {
        return prisma.unit.findFirst({
            where: {
                id,
                companyId
            }
        });
    },

    checkExists: async (name, abbreviation, companyId) => {
        return prisma.unit.findFirst({
            where: {
                companyId,
                OR: [
                    {
                        name
                    },
                    {
                        abbreviation
                    }
                ]
            }
        });
    }
};