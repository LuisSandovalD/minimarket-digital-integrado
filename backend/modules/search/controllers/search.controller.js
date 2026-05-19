const prisma = require("../../../prisma/client");

// ======================================
// SEARCH PRODUCTS
// ======================================

exports.searchProducts = async (req, res) => {

  try {

    const {
      q
    } = req.query;

    const products =
      await prisma.product.findMany({

        where: {

          companyId:
            req.user.companyId,

          OR: [

            {
              name: {
                contains: q,
                mode: "insensitive"
              }
            },

            {
              sku: {
                contains: q,
                mode: "insensitive"
              }
            },

            {
              barcode: {
                contains: q,
                mode: "insensitive"
              }
            }

          ]

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
// SEARCH SALES
// ======================================

exports.searchSales = async (req, res) => {

  try {

    const {
      q
    } = req.query;

    const sales =
      await prisma.sale.findMany({

        where: {

          companyId:
            req.user.companyId,

          OR: [

            {
              saleNumber: {
                contains: q,
                mode: "insensitive"
              }
            },

            {
              customerName: {
                contains: q,
                mode: "insensitive"
              }
            }

          ]

        },

        include: {
          seller: true
        }

      });

    res.json(sales);

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// SEARCH USERS
// ======================================

exports.searchUsers = async (req, res) => {

  try {

    const {
      q
    } = req.query;

    const users =
      await prisma.user.findMany({

        where: {

          companyId:
            req.user.companyId,

          OR: [

            {
              name: {
                contains: q,
                mode: "insensitive"
              }
            },

            {
              email: {
                contains: q,
                mode: "insensitive"
              }
            }

          ]

        }

      });

    res.json(users);

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// SEARCH PURCHASES
// ======================================

exports.searchPurchases = async (req, res) => {

  try {

    const {
      q
    } = req.query;

    const purchases =
      await prisma.purchase.findMany({

        where: {

          companyId:
            req.user.companyId,

          OR: [

            {
              purchaseNumber: {
                contains: q,
                mode: "insensitive"
              }
            },

            {
              supplierName: {
                contains: q,
                mode: "insensitive"
              }
            }

          ]

        },

        include: {
          buyer: true
        }

      });

    res.json(purchases);

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
