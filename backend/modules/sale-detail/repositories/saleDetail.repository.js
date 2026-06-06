// ========================================
// repositories/sale-detail.repository.js
// ========================================

const prisma =
    require("../../../prisma/client");

// ========================================
// FIND ALL
// ========================================

const findAll = () =>
    prisma.saleDetail.findMany({

        include: {

            product: true,

            batch: true,

            sale: true,

        },

        orderBy: {
            id: "desc",
        },

    });

// ========================================
// FIND BY ID
// ========================================

const findById = (id) =>
    prisma.saleDetail.findUnique({

        where: { id },

        include: {

            product: true,

            batch: true,

            sale: true,

        },

    });

// ========================================
// FIND BY SALE
// ========================================

const findBySaleId = (saleId) =>
    prisma.saleDetail.findMany({

        where: {
            saleId,
        },

        include: {

            product: true,

            batch: true,

        },

    });

// ========================================
// FIND BY PRODUCT
// ========================================

const findByProductId = (productId) =>
    prisma.saleDetail.findMany({

        where: {
            productId,
        },

        include: {

            sale: true,

            batch: true,

        },

    });

module.exports = {

    findAll,

    findById,

    findBySaleId,

    findByProductId,

};