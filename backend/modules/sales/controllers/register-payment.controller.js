// ========================================
// controllers/register-payment.controller.js
// ========================================

// ========================================
// SERVICES
// ========================================

const { registerSalePaymentService } = require("../services/sale.service");

// ========================================
// REGISTER SALE PAYMENT
// ========================================

const registerSalePaymentController =
    async (
      req,
      res,
      next,
    ) => {

      try {
        const { id } = req.params; // Captura el ID de la venta desde la URL
        const paymentData = req.body; // Captura todo el desglose enviado por el SalePaymentModal

        // Ejecutamos la lógica de negocio transaccional del servicio
        const result = await registerSalePaymentService(id, paymentData);

        // Respondemos al frontend con el éxito de la operación en caja
        return res.status(200).json({
          success: true,
          message: "El cobro de la venta ha sido registrado exitosamente en caja.",
          data: result,
        });
      }

      catch (error) {
        // Pasamos el error al middleware global de manejo de errores de Express
        next(error);
      }

    };

module.exports = {
  registerSalePaymentController,
};
