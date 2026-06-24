// ============================================================================
// controllers/create-purchase.controller.js
// ============================================================================

const { createPurchaseSchema } = require("../validators/create-purchase.validator");
const { createPurchaseService } = require("../services/create-purchase.service");

async function createPurchaseController(req, res) {
  try {
    // 1. Validar la estructura que viene de Postman
    const { error, value } = createPurchaseSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        ok: false,
        message: error.details[0].message
      });
    }

    // 2. SECURE BACKEND DATA (Enriquecer con datos de sesión del usuario)
    const enrichedData = {
      ...value, // 👈 Usamos obligatoriamente "value" (ya validado por Joi) y no req.body
      buyerId: req.user.id,
      companyId: req.user.companyId,
      branchId: req.user.branchId // 🔥 Automático desde el Token
    };

    console.log("USER BRANCH:", req.user.branchId);

    // 3. Ejecutar la lógica de negocio en el servicio
    const purchase = await createPurchaseService(enrichedData);

    return res.status(201).json({
      ok: true,
      message: "Compra creada correctamente",
      data: purchase
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
}

module.exports = {
  createPurchaseController
};