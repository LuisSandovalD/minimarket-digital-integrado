const {
  getPurchaseByIdService,
} = require("../services/get-purchase-by-id.service");

async function getPurchaseByIdController(
  req,
  res,
) {

  try {

    const id =
      Number(req.params.id);

    const purchase =
      await getPurchaseByIdService(id);

    if (!purchase) {

      return res.status(404).json({

        ok: false,

        message:
          "Compra no encontrada",

      });

    }

    return res.status(200).json({

      ok: true,

      data: purchase,

    });

  } catch (error) {

    return res.status(500).json({

      ok: false,

      message: error.message,

    });

  }

}

module.exports = {
  getPurchaseByIdController,
};
