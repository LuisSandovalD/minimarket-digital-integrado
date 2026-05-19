const prisma = require("../../../prisma/client");

// ======================================
// RUN LOW STOCK CHECK
// ======================================

exports.runLowStockCheck =
async (req, res) => {

  try {

    const lowStock =
      await prisma.inventory.findMany({

        where: {

          quantity: {
            lte: 5
          },

          companyId:
            req.user.companyId

        },

        include: {

          product: true,

          branch: true

        }

      });

    res.json({

      success: true,

      total:
        lowStock.length,

      lowStock

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// RUN EXPIRING PRODUCTS CHECK
// ======================================

exports.runExpiringCheck =
async (req, res) => {

  try {

    const today =
      new Date();

    const next30Days =
      new Date();

    next30Days.setDate(
      today.getDate() + 30
    );

    const expiring =
      await prisma.product.findMany({

        where: {

          companyId:
            req.user.companyId,

          requiresExpiration: true,

          expirationDate: {

            gte: today,

            lte: next30Days

          }

        }

      });

    res.json({

      success: true,

      total:
        expiring.length,

      expiring

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// RUN OVERDUE PAYMENTS
// ======================================

exports.runOverduePayments =
async (req, res) => {

  try {

    const today =
      new Date();

    const overdue =
      await prisma.payment.findMany({

        where: {

          companyId:
            req.user.companyId,

          status:
            "PENDING",

          dueDate: {

            lt: today

          }

        },

        include: {

          sale: true,

          purchase: true

        }

      });

    res.json({

      success: true,

      total:
        overdue.length,

      overdue

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
