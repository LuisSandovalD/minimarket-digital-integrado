// ========================================
// controllers/get-sale-payments.controller.js
// ========================================

const { getSalePaymentsService } = require("../services/sale-payment.service");

const getSalePaymentsController = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Ejecutamos el servicio para traer los pagos
        const payments = await getSalePaymentsService(id);

        return res.status(200).json({
            success: true,
            data: payments,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSalePaymentsController,
};