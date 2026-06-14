const prisma = require("../../../prisma/client");

const getLowStockAlerts = async (
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
            product: true
        }
    });
};

const getExpiringProducts = async (
    companyId,
    expirationDate
) => {

    return prisma.productBatch.findMany({
        where: {
            companyId,

            expirationDate: {
                lte: expirationDate
            },

            currentQuantity: {
                gt: 0
            }
        },

        include: {
            product: true,
            branch: true
        }
    });
};

const getUnreadNotifications = async (
    companyId
) => {

    return prisma.notification.findMany({
        where: {
            companyId,
            isRead: false
        },

        orderBy: {
            createdAt: "desc"
        }
    });
};

module.exports = {
    getLowStockAlerts,
    getExpiringProducts,
    getUnreadNotifications
};