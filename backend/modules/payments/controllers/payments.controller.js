// ========================================
// PAYMENTS CONTROLLER
// ========================================

const paymentsService =
    require("../services/payments.service");

// ========================================
// GET ALL
// ========================================

const getPaymentsController =
    async (req, res, next) => {
        try {

            const companyId =
                req.user.companyId;

            const payments =
                await paymentsService.getPayments(companyId);

            res.json({
                success: true,
                data: payments,
            });

        } catch (error) {
            next(error);
        }
    };

// ========================================
// GET ONE
// ========================================

const getPaymentController =
    async (req, res, next) => {
        try {

            const payment =
                await paymentsService.getPayment(
                    Number(req.params.id)
                );

            res.json({
                success: true,
                data: payment,
            });

        } catch (error) {
            next(error);
        }
    };

// ========================================
// GET BY SALE
// ========================================

const getPaymentsBySaleController =
    async (req, res, next) => {
        try {

            const payments =
                await paymentsService.getPaymentsBySale(
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

const getPaymentsByPurchaseController =
    async (req, res, next) => {
        try {

            const payments =
                await paymentsService.getPaymentsByPurchase(
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

// ========================================
// CREATE
// ========================================

const createPaymentController =
    async (req, res, next) => {
        try {

            const payment =
                await paymentsService.createPayment(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: payment,
            });

        } catch (error) {
            next(error);
        }
    };

// ========================================
// UPDATE
// ========================================

const updatePaymentController =
    async (req, res, next) => {
        try {

            const payment =
                await paymentsService.updatePayment(
                    Number(req.params.id),
                    req.body
                );

            res.json({
                success: true,
                data: payment,
            });

        } catch (error) {
            next(error);
        }
    };

// ========================================
// DELETE
// ========================================

const deletePaymentController =
    async (req, res, next) => {
        try {

            await paymentsService.deletePayment(
                Number(req.params.id)
            );

            res.json({
                success: true,
                message: "Pago eliminado correctamente",
            });

        } catch (error) {
            next(error);
        }
    };

module.exports = {

    getPaymentsController,

    getPaymentController,

    getPaymentsBySaleController,

    getPaymentsByPurchaseController,

    createPaymentController,

    updatePaymentController,

    deletePaymentController,

};