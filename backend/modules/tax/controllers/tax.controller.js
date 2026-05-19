const prisma = require("../../../prisma/client");

// ======================================
// TAX SUMMARY
// ======================================

exports.taxSummary =
async (req, res) => {

  try {

    // Ventas

    const sales =
      await prisma.sale.aggregate({

        where: {

          companyId:
            req.user.companyId

        },

        _sum: {

          tax: true,

          total: true

        }

      });

    // Compras

    const purchases =
      await prisma.purchase.aggregate({

        where: {

          companyId:
            req.user.companyId

        },

        _sum: {

          tax: true,

          total: true

        }

      });

    const salesTax =
      sales._sum.tax || 0;

    const purchaseTax =
      purchases._sum.tax || 0;

    const netTax =
      salesTax - purchaseTax;

    res.json({

      success: true,

      salesTax,

      purchaseTax,

      netTax

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// SALES TAXES
// ======================================

exports.salesTaxes =
async (req, res) => {

  try {

    const sales =
      await prisma.sale.findMany({

        where: {

          companyId:
            req.user.companyId

        },

        select: {

          id: true,

          subtotal: true,

          tax: true,

          total: true,

          createdAt: true

        },

        orderBy: {

          createdAt:
            "desc"

        }

      });

    res.json({

      success: true,

      sales

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// PURCHASE TAXES
// ======================================

exports.purchaseTaxes =
async (req, res) => {

  try {

    const purchases =
      await prisma.purchase.findMany({

        where: {

          companyId:
            req.user.companyId

        },

        select: {

          id: true,

          subtotal: true,

          tax: true,

          total: true,

          createdAt: true

        },

        orderBy: {

          createdAt:
            "desc"

        }

      });

    res.json({

      success: true,

      purchases

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
