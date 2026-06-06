// ========================================
// SERVICES
// ========================================

const {
  createSaleService,
} = require("../services/sale.service");

// ========================================
// CREATE SALE
// ========================================

const createSaleController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const sale =
        await createSaleService(
          req.body,
          req.user
        );

      return res.status(201).json({

        success: true,

        data: sale,

      });

    }

    catch (error) {

      next(error);

    }

  };


module.exports = {

  createSaleController,

};