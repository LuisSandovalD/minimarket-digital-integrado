// ========================================
// controllers/cancel-sale.controller.js
// ========================================

const {
  cancelSaleService,
} = require("../services/sale.service");

module.exports = {

  // ========================================
  // CANCEL SALE
  // ========================================

  cancelSaleController:
    async (
      req,
      res,
      next
    ) => {

      try {

        await cancelSaleService(

          Number(req.params.id)

        );

        return res.json({

          success: true,

          message:
            "Venta cancelada correctamente",

        });

      }

      catch (error) {

        next(error);

      }

    },

};