// ========================================
// controllers/return-sale.controller.js
// ========================================

const { returnSaleService } = require("../services/sale-return.service");

const returnSaleController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { items } = req.body; // Array de { productId, quantity }

        // Ejecutamos la lógica transaccional de devolución
        const result = await returnSaleService(id, items);

        return res.status(200).json({
            success: true,
            message: "La devolución y nota de crédito han sido procesadas correctamente.",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    returnSaleController,
};