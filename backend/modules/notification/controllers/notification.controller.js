const { NotificationService } = require("../services/notification.service");

const service = new NotificationService();

class NotificationController {
  async getAll(req, res) {
    try {
      const companyId = req.user?.companyId;

      if (!companyId) {
        return res.status(400).json({
          success: false,
          message:
            "Identificador de Empresa (Company ID) no encontrado en la sesión actual.",
        });
      }

      const notifications =
        (await service.getNotifications(companyId)) || [];

      return res.status(200).json({
        success: true,
        total: notifications.length,
        data: notifications,
      });
    } catch (error) {
      console.error(
        "❌ Error en NotificationController -> getAll:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Ocurrió un error interno al compilar las notificaciones de stock.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      });
    }
  }
}

module.exports = {
  NotificationController,
};