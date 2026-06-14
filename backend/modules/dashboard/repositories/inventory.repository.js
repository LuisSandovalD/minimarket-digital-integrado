const prisma = require("../../../prisma/client");

const getLowStockProducts = async (
    companyId
) => {

    return prisma.inventory.findMany({
        where: {
            companyId,
            stock: {
                lte: 5
            }
        },

        include: {
            product: true,
            branch: true
        }
    });
};

const getInventoryValue = async (
    companyId
) => {

    const inventory =
        await prisma.inventory.findMany({
            where: {
                companyId
            },

            include: {
                product: true
            }
        });

    return inventory;
};

const getInventoryMovements = async (
    companyId,
    dateFilter
) => {

    return prisma.inventoryHistory.findMany({
        where: {
            companyId,
            createdAt: dateFilter
        },

        include: {
            product: true
        },

        orderBy: {
            createdAt: "desc"
        }
    });
};

module.exports = {
    getLowStockProducts,
    getInventoryValue,
    getInventoryMovements
};