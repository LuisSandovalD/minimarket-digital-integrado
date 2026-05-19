// ========================================
// modules/notification/controllers/notification.controller.js
// ========================================

const {
  NotificationService,
} = require(
  "../services/notification.service"
);

const service =
  new NotificationService();

class NotificationController {

  // ========================================
  // GET ALL NOTIFICATIONS
  // ========================================

  async getAll(req, res) {

    try {

      const companyId =
        req.user.companyId;

      if (!companyId) {

        return res.status(400).json({

          success: false,

          message:
            "Company ID requerido",

        });

      }

      const notifications =
        await service.getNotifications(
          companyId
        );

      return res.status(200).json({

        success: true,

        total:
          notifications.length,

        data:
          notifications,

      });

    } catch (error) {

      console.error(
        "❌ Error obteniendo notificaciones:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Error obteniendo notificaciones",

        error:
          process.env.NODE_ENV ===
          "development"
            ? error.message
            : undefined,

      });

    }

  }

}

module.exports = {
  NotificationController,
};