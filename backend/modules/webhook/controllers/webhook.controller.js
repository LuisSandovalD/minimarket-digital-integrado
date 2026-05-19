const prisma = require("../../../prisma/client");

// ======================================
// PAYMENT WEBHOOK
// ======================================

exports.paymentWebhook =
async (req, res) => {

  try {

    const payload =
      req.body;

    // Simulación:
    // actualizar pago recibido

    if (payload.paymentId) {

      await prisma.payment.update({

        where: {

          id:
            parseInt(
              payload.paymentId
            )

        },

        data: {

          status:
            "PAID"

        }

      });

    }

    // Registrar auditoría

    await prisma.auditLog.create({

      data: {

        companyId:
          payload.companyId || 1,

        action:
          "PAYMENT_WEBHOOK",

        description:
          "Webhook de pago recibido"

      }

    });

    res.json({

      success: true,

      message:
        "Webhook de pago procesado"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

// ======================================
// NOTIFICATION WEBHOOK
// ======================================

exports.notificationWebhook =
async (req, res) => {

  try {

    const payload =
      req.body;

    // Crear notificación

    await prisma.notification.create({

      data: {

        companyId:
          payload.companyId || 1,

        title:
          payload.title ||
          "Nueva notificación",

        message:
          payload.message ||
          "Webhook recibido"

      }

    });

    res.json({

      success: true,

      message:
        "Webhook de notificación procesado"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};
