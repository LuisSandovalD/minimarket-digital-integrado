// ========================================
// controllers/update-sale.controller.js
// ========================================

const {
  updateSaleService,
} = require("../services/sale.service");

const {
  updateSaleValidator,
} = require("../validators/sale.validator");

module.exports = {

  // ========================================
  // UPDATE SALE
  // ========================================

  updateSaleController:
    async (
      req,
      res,
      next
    ) => {

      try {

        // ========================================
        // VALIDATE
        // ========================================

        const {
          error,
          value,
        } = updateSaleValidator.validate(

          req.body,

          {
            abortEarly: false,
          }

        );

        if (error) {

          return res.status(400).json({

            success: false,

            message:
              "Errores de validación",

            errors:
              error.details.map(
                err => err.message
              ),

          });

        }

        // ========================================
        // SERVICE
        // ========================================

        const sale =
          await updateSaleService(

            Number(req.params.id),
            value

          );

        return res.json({

          success: true,

          message:
            "Venta actualizada correctamente",

          data: sale,

        });

      }

      catch (error) {

        next(error);

      }

    },

};