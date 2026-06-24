// ========================================
// controllers/update-sale.controller.js
// ========================================

const { updateSaleService } = require("../services/sale-update.service");

module.exports = {
  updateSaleController: async (req, res, next) => {
    try {
      // 🎯 LOS DATOS YA ESTÁN VALIDADOS Y LIMPIOS
      // El middleware en la ruta ya procesó Joi y dejó el resultado perfecto en req.body
      const validatedData = req.body;

      // Despachamos los datos nativos directo al servicio de persistencia
      const sale = await updateSaleService(Number(req.params.id), validatedData);

      // Retornamos la respuesta exitosa unificada
      return res.json({
        success: true,
        message: "Venta actualizada correctamente",
        data: sale,
      });
    } catch (error) {
      // Si el servicio falla (ej. stock insuficiente), Express lo atrapa de forma segura aquí
      next(error);
    }
  },
};