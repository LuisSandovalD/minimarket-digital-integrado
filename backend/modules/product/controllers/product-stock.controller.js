// ========================================
// controllers/product-stock.controller.js
// ========================================

const service =
  require("../services/product.service");

// ========================================
// LOW STOCK
// ========================================

exports.getLowStockProducts =
  async (req, res) => {

    try {

      const products =
        await service.getLowStock(
          req.user.companyId
        );

      res.json({
        success: true,
        data: products,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// ========================================
// EXPIRING PRODUCTS
// ========================================

exports.getExpiringProducts =
  async (req, res) => {

    try {

      const products =
        await service.getExpiring(
          req.user.companyId
        );

      res.json({
        success: true,
        data: products,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };