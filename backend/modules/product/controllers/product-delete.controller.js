// ========================================
// controllers/product-delete.controller.js
// ========================================

const service =
  require("../services/product.service");

// ========================================
// DELETE PRODUCT
// ========================================

exports.deleteProduct =
  async (req, res) => {

    try {

      await service.softDelete(
        Number(req.params.id),
        req.user
      );

      res.json({
        success: true,
        message:
          "Producto eliminado",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// ========================================
// RESTORE PRODUCT
// ========================================

exports.restoreProduct =
  async (req, res) => {

    try {

      const product =
        await service.restore(
          Number(req.params.id)
        );

      res.json({
        success: true,
        data: product,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };