// ========================================
// controllers/product-query.controller.js
// ========================================

const service =
  require("../services/product.service");

// ========================================
// GET PRODUCTS
// ========================================

exports.getProducts =
  async (req, res) => {

    try {

      const products =
        await service.getAll(
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
// GET PRODUCT BY ID
// ========================================

exports.getProductById =
  async (req, res) => {

    try {

      const product =
        await service.getById(
          Number(req.params.id),
          req.user.companyId
        );

      if (!product) {

        return res.status(404).json({
          success: false,
          message:
            "Producto no encontrado",
        });

      }

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

// ========================================
// FEATURED PRODUCTS
// ========================================

exports.getFeaturedProducts =
  async (req, res) => {

    try {

      const products =
        await service.getFeatured(
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