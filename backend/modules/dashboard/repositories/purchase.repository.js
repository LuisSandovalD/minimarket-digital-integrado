const prisma = require("../../../prisma/client");

const getPurchaseSummary = async (
    companyId,
    dateFilter
) => {
    return prisma.purchase.aggregate({
        where: {
            companyId,
            createdAt: dateFilter,
        },

        _count: {
            id: true,
        },

        _sum: {
            total: true,
            subtotal: true,
        },

        _avg: {
            total: true,
        },
    });
};

const getRecentPurchases = async (
    companyId,
    limit = 10
) => {
    return prisma.purchase.findMany({
        where: {
            companyId,
        },

        include: {
            supplier: true,
            buyer: true,
        },

        orderBy: {
            createdAt: "desc",
        },

        take: limit,
    });
};

const getPurchasesChart = async (
    companyId,
    dateFilter
) => {
    const purchases = await prisma.purchase.findMany({
        where: {
            companyId,
            createdAt: dateFilter,
        },

        select: {
            total: true,
            createdAt: true,
        },

        orderBy: {
            createdAt: "asc",
        },
    });

    const grouped = {};

    purchases.forEach((purchase) => {
        const date = purchase.createdAt
            .toISOString()
            .split("T")[0];

        if (!grouped[date]) {
            grouped[date] = 0;
        }

        grouped[date] += Number(
            purchase.total || 0
        );
    });

    return Object.entries(grouped).map(
        ([date, total]) => ({
            date,
            total,
        })
    );
};

const getTopSuppliers = async (
    companyId,
    dateFilter,
    limit = 10
) => {
    const suppliers =
        await prisma.purchase.groupBy({
            by: ["supplierId"],

            where: {
                companyId,
                createdAt: dateFilter,
            },

            _sum: {
                total: true,
            },

            _count: {
                id: true,
            },

            orderBy: {
                _sum: {
                    total: "desc",
                },
            },

            take: limit,
        });

    const result = await Promise.all(
        suppliers.map(async (item) => {
            const supplier =
                await prisma.supplier.findUnique({
                    where: {
                        id: item.supplierId,
                    },

                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                });

            return {
                supplierId: item.supplierId,
                supplierName:
                    supplier?.name || "Proveedor",

                email: supplier?.email,

                phone: supplier?.phone,

                totalPurchased: Number(
                    item._sum.total || 0
                ),

                purchasesCount:
                    item._count.id || 0,
            };
        })
    );

    return result;
};

module.exports = {
    getPurchaseSummary,
    getRecentPurchases,
    getPurchasesChart,
    getTopSuppliers,
};