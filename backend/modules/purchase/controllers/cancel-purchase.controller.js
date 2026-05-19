const {
  cancelPurchaseService
} = require("../services/cancel-purchase.service");

async function cancelPurchaseController(
  req,
  res
) {

  try {

    const id =
      Number(req.params.id);

    const purchase =
      await cancelPurchaseService(id);

    return res.status(200).json({

      ok: true,

      message:
        "Compra cancelada",

      data: purchase

    });

  } catch (error) {

    return res.status(500).json({

      ok: false,

      message: error.message

    });

  }

}

module.exports = {
  cancelPurchaseController
};