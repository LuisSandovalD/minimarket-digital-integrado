const {
  getPurchasesService,
} = require("../services/get-purchases.service");

async function getPurchasesController(req, res) {

  try {

    const {
      page,
      limit,
      search,
      status,
      supplierId,
      buyerId,
      branchId,
      startDate,
      endDate,
      sortBy,
      sortOrder,
    } = req.query;

    const result = await getPurchasesService({

      page,
      limit,
      search,
      status,
      supplierId,
      buyerId,
      branchId,
      startDate,
      endDate,
      sortBy,
      sortOrder,

    });

    return res.status(200).json({

      ok: true,
      ...result,

    });

  } catch (error) {

    return res.status(500).json({

      ok: false,
      message: error.message,

    });

  }

}

module.exports = {
  getPurchasesController,
};
