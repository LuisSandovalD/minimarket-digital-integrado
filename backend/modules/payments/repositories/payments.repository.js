// ========================================
// PAYMENTS REPOSITORY
// ========================================

const prisma =
    require("../../../prisma/client");

// ========================================
// INCLUDE
// ========================================

const paymentInclude = {

    method: true,

    sale: {
        select: {
            id: true,
            saleNumber: true,
            total: true,
            status: true,
        },
    },

    purchase: {
        select: {
            id: true,
            purchaseNumber: true,
            total: true,
            status: true,
        },
    },

};


const findPendingSales = async (companyId) => {
    return prisma.sale.findMany({
        where: {
            companyId,
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

// ========================================
// FIND ALL
// ========================================

const findAll =
    async (companyId) => {

        return prisma.payment.findMany({

            where: {
                OR: [
                    {
                        sale: {
                            companyId,
                        },
                    },
                    {
                        purchase: {
                            companyId,
                        },
                    },
                ],
            },

            include: paymentInclude,

            orderBy: {
                createdAt: "desc",
            },

        });

    };

// ========================================
// FIND BY ID
// ========================================

const findById =
    async (id) => {

        return prisma.payment.findUnique({

            where: { id },

            include: paymentInclude,

        });

    };

// ========================================
// FIND BY SALE
// ========================================

const findBySale =
    async (saleId) => {

        return prisma.payment.findMany({

            where: {
                saleId,
            },

            include: paymentInclude,

            orderBy: {
                createdAt: "desc",
            },

        });

    };

// ========================================
// FIND BY PURCHASE
// ========================================

const findByPurchase =
    async (purchaseId) => {

        return prisma.payment.findMany({

            where: {
                purchaseId,
            },

            include: paymentInclude,

            orderBy: {
                createdAt: "desc",
            },

        });

    };

// ========================================
// CREATE
// ========================================

const create =
    async (data) => {

        return prisma.payment.create({

            data,

            include: paymentInclude,

        });

    };

// ========================================
// UPDATE
// ========================================

const update =
    async (id, data) => {

        return prisma.payment.update({

            where: { id },

            data,

            include: paymentInclude,

        });

    };

// ========================================
// DELETE
// ========================================

const remove =
    async (id) => {

        return prisma.payment.delete({

            where: { id },

        });

    };

module.exports = {

    findAll,

    findById,

    findPendingSales,

    findBySale,

    findByPurchase,

    create,

    update,

    delete: remove,

};