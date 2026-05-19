// ========================================
// controllers/get-sales.controller.js
// ========================================

const {
  getSalesService,
  getSaleService,
} = require("../services/sale.service");

module.exports = {

  // ========================================
  // GET SALES
  // ========================================
  getSalesController: async (req, res, next) => {
    try {
      const sales = await getSalesService({
        companyId: req.query.companyId ? Number(req.query.companyId) : undefined,
        branchId:  req.query.branchId ? Number(req.query.branchId) : undefined,
        status:    req.query.status || undefined,
        search:    req.query.search || undefined,
      });

      return res.json({
        success: true,
        data: sales,
      });
    } catch (error) {
      next(error);
    }
  },

  // ========================================
  // GET SALE
  // ========================================
  getSaleController: async (req, res, next) => {
    try {
      const sale = await getSaleService(Number(req.params.id));

      if (!sale) {
        return res.status(404).json({
          success: false,
          message: "Venta no encontrada",
        });
      }

      return res.json({
        success: true,
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  },
};