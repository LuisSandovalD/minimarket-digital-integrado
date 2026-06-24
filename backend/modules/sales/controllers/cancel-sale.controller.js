// ========================================
// controllers/cancel-sale.controller.js
// ========================================

const { cancelSaleService } = require("../services/sale-cancel.service"); // 🔥 Corregido el ruteo directo

module.exports = {
  cancelSaleController: async (req, res, next) => {
    try {
      await cancelSaleService(Number(req.params.id));

      return res.json({
        success: true,
        message: "Venta cancelada correctamente",
      });
    } catch (error) {
      next(error);
    }
  },
};