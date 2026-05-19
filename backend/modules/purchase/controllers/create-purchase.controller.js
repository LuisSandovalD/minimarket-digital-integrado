// ========================================
// controllers/create-purchase.controller.js
// ========================================

const {
  createPurchaseSchema
} = require("../validators/create-purchase.validator");

const {
  createPurchaseService
} = require("../services/create-purchase.service");

async function createPurchaseController(req, res) {

  try {

    const { error, value } =
      createPurchaseSchema.validate(req.body);

    if (error) {

      return res.status(400).json({

        ok: false,

        message:
          error.details[0].message

      });

    }

    // ========================================
    // SECURE BACKEND DATA
    // ========================================

    const enrichedData = {

      ...value,

      buyerId:
        req.user.id,

      companyId:
        req.user.companyId,

      // 🔥 AUTOMÁTICO
      branchId:
        req.user.branchId

    };

    console.log(
      "USER BRANCH:",
      req.user.branchId
    );

    const purchase =
      await createPurchaseService(
        enrichedData
      );

    return res.status(201).json({

      ok: true,

      message:
        "Compra creada correctamente",

      data:
        purchase

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      ok: false,

      message:
        error.message

    });

  }

}

module.exports = {
  createPurchaseController
};