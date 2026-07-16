// ========================================
// controllers/product-update.controller.js
// ========================================

const service =
  require("../services/product.service");

// ========================================
// UPDATE PRODUCT
// ========================================

exports.updateProduct =
  async (req, res) => {

    try {

      // ========================================
      // VALIDATE ID
      // ========================================

      const productId =
        Number(req.params.id);

      if (!productId) {

        return res.status(400).json({

          success: false,

          message:
            "ID de producto inválido",
        });

      }

      // ========================================
      // UPDATE
      // ========================================

      const product =
        await service.update(

          productId,

          req.body,

          req.user,
        );

      // ========================================
      // SUCCESS
      // ========================================

      return res.status(200).json({

        success: true,

        message:
          "Producto actualizado correctamente",

        data: product,
      });

    } catch (error) {

      console.error(
        "UPDATE PRODUCT ERROR:",
        error,
      );

      // ========================================
      // VALIDATION ERRORS
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
      // NOT FOUND
      // ========================================

      if (

        error.message.includes("no encontrado")

      ) {

        return res.status(404).json({

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
