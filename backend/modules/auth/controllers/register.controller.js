// ========================================
// controllers/register.controller.js
// ========================================

const authService = require("../services/auth.service");
const { validateRegister } = require("../validators/auth.validator");
const { successResponse, errorResponse } = require("../responses/auth.response");
const { getDeviceInfo = (req) => ({}) } = require("../helpers/device.helper");

/* ======================================
 * REGISTER (Flujo con 30 días de Trial sin Tarjeta)
 * ==================================== */
const register = async (req, res) => {
  try {
    // 🌟 1. Evitar cortes prematuros por latencia en la nube (Neon)
    req.setTimeout(30000);

    // ======================================
    // 1. VALIDAR CUERPO DE LA PETICIÓN
    // ======================================
    await validateRegister(req.body); // Evita cargas inválidas a la DB

    // ======================================
    // 2. SEGURIDAD: BLINDAR EL ROL DEL NUEVO TENANT
    // ======================================
    const cleanBody = {
      ...req.body,
      role: "ADMIN",
    };

    const device = getDeviceInfo(req);

    // ======================================
    // 3. EJECUTAR REGISTRO EN EL SERVICIO
    // ======================================
    // NOTA: Internamente tu authService.register y su repositorio guardarán
    // las tablas en Neon y asignarán el tier elegido (FREE, BASIC, PREMIUM).
    const result = await authService.register({
      body: cleanBody,
      device,
    });

    // ======================================
    // 4. RESPUESTA DE ACCESO INMEDIATO (SaaS Freemium / Trial)
    // ======================================
    const tier = req.body.subscriptionTier ? req.body.subscriptionTier.toUpperCase() : "FREE";

    let message = "Registro completado con éxito en el plan gratuito.";

    if (tier !== "FREE") {
      message = `¡Bienvenido! Tu cuenta ha sido creada con éxito. Has iniciado tu periodo de prueba de 30 días para el plan ${tier}.`;
    }

    // 🌟 Enviamos 'redirectTo: null' para que tu Hook de React sepa
    // que debe procesar el auto-login con los tokens en lugar de ir a Stripe.
    const responseData = {
      ...result,
      redirectTo: null,
      message,
    };

    return successResponse(res, responseData, 201);

  } catch (error) {
    // 🚨 Captura avanzada para el error de transacción cerrada de Prisma (Neon Latency)
    if (error.message.includes("Transaction") || error.message.includes("Prisma")) {
      console.error("❌ [Database Timeout] Error detectado en el flujo transaccional:", error.message);
      return res.status(503).json({
        status: "error",
        message: "La base de datos en la nube tardó demasiado en responder y la transacción expiró. Por favor, vuelve a intentarlo.",
      });
    }

    return errorResponse(res, error);
  }
};

module.exports = {
  register,
};
