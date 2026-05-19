const prisma = require("../../../prisma/client");

exports.importProducts = async (req, res) => {

  try {

    const products = req.body.products;

    for (const product of products) {

      await prisma.product.create({
        data: {
          ...product,
          companyId: req.user.companyId
        }
      });

    }

    res.json({
      success: true,
      message: "Productos importados"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.importCategories = async (req, res) => {

  try {

    const categories = req.body.categories;

    for (const category of categories) {

      await prisma.category.create({
        data: {
          ...category,
          companyId: req.user.companyId
        }
      });

    }

    res.json({
      success: true,
      message: "Categorías importadas"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
