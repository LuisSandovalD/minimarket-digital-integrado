// ========================================
// middlewares/subscription.middleware.js
// ========================================

const prisma = require("../prisma/client");

const checkSubscription = async (req, res, next) => {
  try {
    // Se asume que el token de autenticación ya inyectó el req.user con su companyId
    const { companyId } = req.user;

    const subscription = await prisma.subscription.findUnique({
      where: { companyId: companyId },
    });

    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: "No se encontró ninguna suscripción vinculada a esta organización.",
      });
    }

    // Validar si el estado es cancelado o impago y ya pasó la fecha de corte
    const now = new Date();
    if (
      subscription.status !== "ACTIVE" &&
            subscription.status !== "TRIALING" &&
            now > subscription.currentPeriodEnd
    ) {
      return res.status(402).json({
        success: false,
        message: "Su suscripción o periodo de prueba ha expirado. Por favor, regularice su pago.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = checkSubscription;
