const prisma = require("../../../prisma/client");

const getSalesSummary = async (
    companyId,
    dateFilter
) => {

    return prisma.sale.aggregate({
        where: {
            companyId,
            createdAt: dateFilter
        },

        _count: {
            id: true
        },

        _sum: {
            total: true,
            subtotal: true,
            tax: true
        }
    });
};

const getTopProducts = async (
    companyId,
    dateFilter,
    limit = 10
) => {

    const products = await prisma.saleDetail.groupBy({
        by: ["productId"],

        where: {
            sale: {
                companyId,
                createdAt: dateFilter,
            },
        },

        _sum: {
            quantity: true,
        },

        orderBy: {
            _sum: {
                quantity: "desc",
            },
        },

        take: limit,
    });

    const result = await Promise.all(
        products.map(async (item) => {
            const product = await prisma.product.findUnique({
                where: {
                    id: item.productId,
                },

                select: {
                    id: true,
                    name: true,
                    salePrice: true,
                    sku: true,
                },
            });

            return {
                productId: item.productId,
                productName: product?.name || "Sin nombre",
                sku: product?.sku,
                salePrice: Number(product?.salePrice || 0),
                quantity: item._sum.quantity || 0,
            };
        })
    );

    return result;
};
const getRecentSales = async (
    companyId,
    limit = 10
) => {

    return prisma.sale.findMany({
        where: {
            companyId
        },

        include: {
            customer: true,
            seller: true
        },

        orderBy: {
            createdAt: "desc"
        },

        take: limit
    });
};

module.exports = {
    getSalesSummary,
    getTopProducts,
    getRecentSales
};