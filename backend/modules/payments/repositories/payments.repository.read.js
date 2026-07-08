const prisma = require("../../../prisma/client");
const paymentInclude = {
    method: true,
    sale: {
        select: {
            id: true,
            saleNumber: true,
            total: true,
            status: true
        }
    },
    purchase: {
        select: {
            id: true,
            purchaseNumber: true,
            total: true,
            status: true
        }
    }
};

// ========================================
// READ METHODS (CON FILTROS, BUSCADOR Y PAGINACIÓN)
// ========================================

const findAll = async (companyId, queryParams = {}) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        paymentMethod, // ID del método de pago
        startDate,
        endDate,
        type // 'SALE' o 'PURCHASE'
    } = queryParams;

    const parsedCompanyId = Number(companyId);

    // Calcular el offset para la paginación
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // 1. Filtros base de seguridad por Compañía (Garantiza el aislamiento multi-tenant)
    const companyFilter = {
        OR: [
            { sale: { companyId: parsedCompanyId } },
            { purchase: { companyId: parsedCompanyId } },
        ],
    };

    // 2. Construcción dinámica de filtros adicionales (whereConditions)
    const andConditions = [companyFilter];

    // Filtro por Estado (Ej: PENDING, COMPLETED)
    if (status) {
        andConditions.push({ status: status.toUpperCase() });
    }

    // Filtro por Método de Pago (Aseguramos la foreign key correcta de la relación)
    if (paymentMethod && !isNaN(paymentMethod)) {
        andConditions.push({ paymentMethodId: Number(paymentMethod) });
    }

    // Filtro por Rango de Fechas (Basado en la fecha de pago)
    if (startDate || endDate) {
        const dateFilter = {};

        if (startDate && !isNaN(Date.parse(startDate))) {
            dateFilter.gte = new Date(startDate);
        }

        if (endDate && !isNaN(Date.parse(endDate))) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            dateFilter.lte = end;
        }

        if (Object.keys(dateFilter).length > 0) {
            andConditions.push({ paidAt: dateFilter });
        }
    }

    // Filtro exclusivo por flujo (Solo Ventas o Solo Compras)
    if (type) {
        if (type.toUpperCase() === "SALE") {
            andConditions.push({ saleId: { not: null } });
        } else if (type.toUpperCase() === "PURCHASE") {
            andConditions.push({ purchaseId: { not: null } });
        }
    }

    // 3. Buscador Global (Search)
    if (search && search.trim() !== "") {
        const searchClean = search.trim();
        andConditions.push({
            OR: [
                { reference: { contains: searchClean, mode: "insensitive" } },
                { notes: { contains: searchClean, mode: "insensitive" } },
                { transactionId: { contains: searchClean, mode: "insensitive" } },
                {
                    sale: {
                        saleNumber: { contains: searchClean, mode: "insensitive" },
                    },
                },
                {
                    purchase: {
                        purchaseNumber: { contains: searchClean, mode: "insensitive" },
                    },
                },
            ],
        });
    }

    // 4. Ejecutar consultas en paralelo usando una transacción Prisma
    const [payments, total] = await prisma.$transaction([
        prisma.payment.findMany({
            where: { AND: andConditions },
            include: paymentInclude,
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.payment.count({
            where: { AND: andConditions },
        }),
    ]);

    // 5. Retornar los datos estructurados con metadatos de paginación
    return {
        data: payments,
        meta: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)) || 1,
        },
    };
};

const findById = async (id) => {
    return prisma.payment.findUnique({
        where: { id: Number(id) },
        include: paymentInclude,
    });
};

const findPendingSales = async (companyId) => {
    return prisma.sale.findMany({
        where: {
            companyId: Number(companyId),
            status: "COMPLETED",
            payments: {
                none: {},
            },
        },
        include: {
            customer: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const findBySale = async (saleId) => {
    return prisma.payment.findMany({
        where: { saleId: Number(saleId) },
        include: paymentInclude,
        orderBy: {
            createdAt: "desc",
        },
    });
};

const findByPurchase = async (purchaseId) => {
    return prisma.payment.findMany({
        where: { purchaseId: Number(purchaseId) },
        include: paymentInclude,
        orderBy: {
            createdAt: "desc",
        },
    });
};

module.exports = {
    findAll,
    findById,
    findPendingSales,
    findBySale,
    findByPurchase,
};