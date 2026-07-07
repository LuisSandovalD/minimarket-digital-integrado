// ========================================
// PAYMENTS CUSTOM CONTROLLER (RELATIONS)
// ========================================

const paymentsServiceRead = require("../services/payments.service.read");

// ========================================
// GET BY SALE
// ========================================
const getPaymentsBySaleController = async (req, res, next) => {
    try {
        const payments = await paymentsServiceRead.getPaymentsBySale(
            Number(req.params.saleId)
        );

        res.json({
            success: true,
            data: payments,
        });
    } catch (error) {
        next(error);
    }
};

// ========================================
// GET BY PURCHASE
// ========================================
const getPaymentsByPurchaseController = async (req, res, next) => {
    try {
        const payments = await paymentsServiceRead.getPaymentsByPurchase(
            Number(req.params.purchaseId)
        );

        res.json({
            success: true,
            data: payments,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPaymentsBySaleController,
    getPaymentsByPurchaseController,
};