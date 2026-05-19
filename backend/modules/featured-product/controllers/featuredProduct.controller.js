const prisma = require("../../../prisma/client");

// ======================================
// GET FEATURED PRODUCTS
// ======================================

exports.getFeaturedProducts =
async (req, res) => {

  try {

    const products =
      await prisma.product.findMany({

        where: {

          companyId:
            req.user.companyId,

          isFeatured: true,

          isDeleted: false

        },

        include: {

          category: true,

          unit: true

        },

        orderBy: {
          createdAt: "desc"
        }

      });

    res.json(products);

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// TOGGLE FEATURED
// ======================================

exports.toggleFeatured =
async (req, res) => {

  try {

    const id =
      parseInt(req.params.id);

    // Buscar producto

    const product =
      await prisma.product.findUnique({

        where: { id }

      });

    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Producto no encontrado"

      });

    }

    // Cambiar estado

    const updated =
      await prisma.product.update({

        where: { id },

        data: {

          isFeatured:
            !product.isFeatured

        }

      });

    res.json({

      success: true,

      message:
        updated.isFeatured
          ? "Producto marcado como destacado"
          : "Producto removido de destacados",

      product: updated

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
