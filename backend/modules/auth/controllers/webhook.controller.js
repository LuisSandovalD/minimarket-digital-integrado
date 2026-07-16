// ========================================
// controllers/webhook.controller.js
// ========================================

const prisma = require("../../../prisma/client");

const handleWebhook = async (req, res) => {
  // 🔥 Inicialización dinámica: previene que falle si dotenv no ha cargado
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verificamos que el evento realmente venga de Stripe y no sea un impostor
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Escuchamos el evento de checkout completado con éxito
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const companyId = parseInt(session.metadata.companyId, 10);
    const stripeSubscriptionId = session.subscription;

    try {
      // Traemos los detalles exactos de la suscripción desde Stripe
      const stripeSub = await stripe.subscriptions.retrieve(stripeSubscriptionId);

      // 1. Actualizamos la tabla de suscripción de la empresa
      await prisma.subscription.update({
        where: { companyId: companyId },
        data: {
          status: "ACTIVE", // ¡Oficialmente activo!
          stripeSubscriptionId: stripeSubscriptionId,
          stripePriceId: stripeSub.items.data[0].price.id,
          currentPeriodStart: new Date(stripeSub.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
        },
      });

      // 2. Insertamos el primer registro histórico de facturación
      await prisma.billingHistory.create({
        data: {
          companyId: companyId,
          amount: session.amount_total / 100, // Stripe maneja centavos (ej: 1000 = $10.00)
          currency: session.currency.toUpperCase(),
          status: "COMPLETED",
          stripeInvoiceId: session.invoice,
        },
      });

      console.log(`[Stripe Webhook] Empresa ID ${companyId} activada exitosamente.`);
    } catch (error) {
      console.error("[Stripe Webhook Error]:", error.message);
      return res.status(500).json({ error: "Error interno al activar tenant" });
    }
  }

  res.json({ received: true });
};

module.exports = {
  handleWebhook,
};
