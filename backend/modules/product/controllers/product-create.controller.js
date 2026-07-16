// ========================================
// controllers/product-create.controller.js
// ========================================

const service =
  require("../services/product.service");

// ========================================
// CREATE PRODUCT
// ========================================

exports.createProduct =
  async (req, res) => {

    try {

      // ========================================
      // CREATE
      // ========================================

      const product =
        await service.create(
          req.body,
          req.user,
        );

      // ========================================
      // SUCCESS
      // ========================================

      return res.status(201).json({

        success: true,

        message:
          "Producto creado correctamente",

        data: product,
      });

    } catch (error) {

      console.error(
        "CREATE PRODUCT ERROR:",
        error,
      );

      // ========================================
      // VALIDATION ERROR
      // ========================================

      if (
        error.message.includes("existe") ||
        error.message.includes("obligatorio") ||
        error.message.includes("inválido") ||
        error.message.includes("mayor") ||
        error.message.includes("menor") ||
        error.message.includes("negativo")
      ) {

        return res.status(400).json({

          success: false,

          message:
            error.message,
        });

      }

      // ========================================
      // PRISMA UNIQUE ERROR
      // ========================================

      if (
        error.code === "P2002"
      ) {

        return res.status(409).json({

          success: false,

          message:
            "Ya existe un producto con esos datos",
        });

      }

      // ========================================
      // DEFAULT SERVER ERROR
      // ========================================

      return res.status(500).json({

        success: false,

        message:
          "Error interno del servidor",
      });

    }

  };
