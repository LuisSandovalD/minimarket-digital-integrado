// ========================================
// modules/notification/controllers/notification.controller.js
// ========================================

const { NotificationService } = require("../services/notification.service");

const service = new NotificationService();

class NotificationController {

  // ========================================
  // GET ALL NOTIFICATIONS
  // ========================================
  /**
   * Controlador para obtener las alertas de inventario crítico recalculadas
   * @param {Object} req - Request de Express conteniendo req.user mediante middleware auth
   * @param {Object} res - Response de Express
   */
  async getAll(req, res) {
    try {
      // El middleware 'auth' añade los datos del usuario firmante a req.user
      const companyId = req.user?.companyId;

      if (!companyId) {
        return res.status(400).json({
          success: false,
          message: "Identificador de Empresa (Company ID) no encontrado en la sesión actual.",
        });
      }

      // Invocar la capa de negocio
      const notifications = await service.getNotifications(companyId);

      // Respuesta exitosa estandarizada
      return res.status(200).json({
        success: true,
        total: notifications.length,
        data: notifications,
      });

    } catch (error) {
      console.error("❌ Error en NotificationController -> getAll:", error);

      return res.status(500).json({
        success: false,
        message: "Ocurrió un error interno al compilar las notificaciones de stock.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = {
  NotificationController,
};