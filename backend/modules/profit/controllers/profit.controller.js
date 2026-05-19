const prisma = require("../../../prisma/client");

// ======================================
// DAILY PROFIT
// ======================================

exports.dailyProfit =
async (req, res) => {

  try {

    const today =
      new Date();

    today.setHours(0, 0, 0, 0);

    const sales =
      await prisma.sale.findMany({

        where: {

          companyId:
            req.user.companyId,

          createdAt: {

            gte: today

          }

        },

        include: {

          details: {

            include: {
              product: true
            }

          }

        }

      });

    let profit = 0;

    sales.forEach((sale) => {

      sale.details.forEach((item) => {

        profit +=

          (item.price -
            item.product.costPrice) *

          item.quantity;

      });

    });

    res.json({

      success: true,

      period: "daily",

      profit

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// MONTHLY PROFIT
// ======================================

exports.monthlyProfit =
async (req, res) => {

  try {

    const start =
      new Date();

    start.setDate(1);

    start.setHours(0, 0, 0, 0);

    const sales =
      await prisma.sale.findMany({

        where: {

          companyId:
            req.user.companyId,

          createdAt: {

            gte: start

          }

        },

        include: {

          details: {

            include: {
              product: true
            }

          }

        }

      });

    let profit = 0;

    sales.forEach((sale) => {

      sale.details.forEach((item) => {

        profit +=

          (item.price -
            item.product.costPrice) *

          item.quantity;

      });

    });

    res.json({

      success: true,

      period: "monthly",

      profit

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// YEARLY PROFIT
// ======================================

exports.yearlyProfit =
async (req, res) => {

  try {

    const start =
      new Date();

    start.setMonth(0);

    start.setDate(1);

    start.setHours(0, 0, 0, 0);

    const sales =
      await prisma.sale.findMany({

        where: {

          companyId:
            req.user.companyId,

          createdAt: {

            gte: start

          }

        },

        include: {

          details: {

            include: {
              product: true
            }

          }

        }

      });

    let profit = 0;

    sales.forEach((sale) => {

      sale.details.forEach((item) => {

        profit +=

          (item.price -
            item.product.costPrice) *

          item.quantity;

      });

    });

    res.json({

      success: true,

      period: "yearly",

      profit

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
