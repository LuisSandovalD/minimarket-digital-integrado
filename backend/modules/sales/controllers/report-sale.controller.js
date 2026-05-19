// ========================================
// controllers/report-sale.controller.js
// ========================================

const {
  getDailySalesService,
  getTopProductsService,
} = require("../services/sale.service");

module.exports = {

  // ========================================
  // DAILY REPORT
  // ========================================

  getDailySalesController:
    async (
      req,
      res,
      next
    ) => {

      try {

        const {
          companyId,
          startDate,
          endDate,
        } = req.query;

        const report =
          await getDailySalesService(

            Number(companyId),

            new Date(startDate),

            new Date(endDate)

          );

        return res.json({

          success: true,

          data: report,

        });

      }

      catch (error) {

        next(error);

      }

    },

  // ========================================
  // TOP PRODUCTS
  // ========================================

  getTopProductsController:
    async (
      req,
      res,
      next
    ) => {

      try {

        const report =
          await getTopProductsService(

            Number(req.query.companyId)

          );

        return res.json({

          success: true,

          data: report,

        });

      }

      catch (error) {

        next(error);

      }

    },

};