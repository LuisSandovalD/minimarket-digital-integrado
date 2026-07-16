const {
  updatePurchaseStatusService,
} = require("../services/update-purchase-status.service");

async function updatePurchaseStatusController(
  req,
  res,
) {

  try {

    const id =
      Number(req.params.id);

    const {
      status,
    } = req.body;

    const purchase =
      await updatePurchaseStatusService(
        id,
        status,
      );

    return res.status(200).json({

      ok: true,

      message:
        "Estado actualizado",

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
  updatePurchaseStatusController,
};
