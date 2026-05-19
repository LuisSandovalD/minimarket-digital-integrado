const {
  getPurchasesService
} = require("../services/get-purchases.service");

async function getPurchasesController(
  req,
  res
) {

  try {

    const purchases =
      await getPurchasesService();

    return res.status(200).json({

      ok: true,

      data: purchases

    });

  } catch (error) {

    return res.status(500).json({

      ok: false,

      message: error.message

    });

  }

}

module.exports = {
  getPurchasesController
};