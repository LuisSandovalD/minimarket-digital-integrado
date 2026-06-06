// ========================================
// PAYMENTS SERVICE
// ========================================

const paymentsRepository =
    require("../repositories/payments.repository");

// ========================================
// GET ALL
// ========================================

const getPayments =
    async (companyId) => {

        return await paymentsRepository.findAll(companyId);

    };

// ========================================
// GET ONE
// ========================================

const getPayment =
    async (id) => {

        return await paymentsRepository.findById(id);

    };

// ========================================
// GET BY SALE
// ========================================

const getPaymentsBySale =
    async (saleId) => {

        return await paymentsRepository.findBySale(saleId);

    };

// ========================================
// GET BY PURCHASE
// ========================================

const getPaymentsByPurchase =
    async (purchaseId) => {

        return await paymentsRepository.findByPurchase(purchaseId);

    };

// ========================================
// CREATE
// ========================================

const createPayment =
    async (data) => {

        return await paymentsRepository.create(data);

    };

// ========================================
// UPDATE
// ========================================

const updatePayment =
    async (id, data) => {

        return await paymentsRepository.update(
            id,
            data
        );

    };

// ========================================
// DELETE
// ========================================

const deletePayment =
    async (id) => {

        return await paymentsRepository.delete(id);

    };

module.exports = {

    getPayments,

    getPayment,

    getPaymentsBySale,

    getPaymentsByPurchase,

    createPayment,

    updatePayment,

    deletePayment,

};