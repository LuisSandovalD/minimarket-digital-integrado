// ========================================
// PAYMENTS REPOSITORY - INCLUDES
// ========================================

const paymentInclude = {
    paymentMethod: true,
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

module.exports = paymentInclude;