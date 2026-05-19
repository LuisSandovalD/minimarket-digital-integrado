const prisma = require("../../../prisma/client");

// ======================================
// GET KPIs
// ======================================

exports.getKPIs =
async (req, res) => {

  try {

    const companyId =
      req.user.companyId;

    // Totales

    const totalSales =
      await prisma.sale.aggregate({

        where: { companyId },

        _sum: {
          total: true
        }

      });

    const totalPurchases =
      await prisma.purchase.aggregate({

        where: { companyId },

        _sum: {
          total: true
        }

      });

    const totalProducts =
      await prisma.product.count({

        where: {

          companyId,

          isDeleted: false

        }

      });

    const totalUsers =
      await prisma.user.count({

        where: { companyId }

      });

    const totalCustomers =
      await prisma.sale.groupBy({

        by: ["customerEmail"],

        where: {

          companyId,

          customerEmail: {
            not: null
          }

        }

      });

    res.json({

      success: true,

      kpis: {

        totalSales:
          totalSales._sum.total || 0,

        totalPurchases:
          totalPurchases._sum.total || 0,

        totalProducts,

        totalUsers,

        totalCustomers:
          totalCustomers.length

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

// ======================================
// GROWTH METRICS
// ======================================

exports.getGrowthMetrics =
async (req, res) => {

  try {

    const companyId =
      req.user.companyId;

    const now =
      new Date();

    // Mes actual

    const currentMonthStart =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

    // Mes anterior

    const previousMonthStart =
      new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );

    const previousMonthEnd =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      );

    // Ventas actuales

    const currentSales =
      await prisma.sale.aggregate({

        where: {

          companyId,

          createdAt: {

            gte:
              currentMonthStart

          }

        },

        _sum: {
          total: true
        }

      });

    // Ventas anteriores

    const previousSales =
      await prisma.sale.aggregate({

        where: {

          companyId,

          createdAt: {

            gte:
              previousMonthStart,

            lte:
              previousMonthEnd

          }

        },

        _sum: {
          total: true
        }

      });

    const current =
      currentSales._sum.total || 0;

    const previous =
      previousSales._sum.total || 0;

    let growth = 0;

    if (previous > 0) {

      growth =
        (
          (
            current - previous
          ) / previous
        ) * 100;

    }

    res.json({

      success: true,

      currentMonth:
        current,

      previousMonth:
        previous,

      growth:
        growth.toFixed(2)

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

// ======================================
// COMPARE METRICS
// ======================================

exports.compareMetrics =
async (req, res) => {

  try {

    const companyId =
      req.user.companyId;

    const sales =
      await prisma.sale.aggregate({

        where: { companyId },

        _sum: {
          total: true
        }

      });

    const purchases =
      await prisma.purchase.aggregate({

        where: { companyId },

        _sum: {
          total: true
        }

      });

    const salesTotal =
      sales._sum.total || 0;

    const purchasesTotal =
      purchases._sum.total || 0;

    const profit =
      salesTotal - purchasesTotal;

    res.json({

      success: true,

      comparison: {

        sales:
          salesTotal,

        purchases:
          purchasesTotal,

        estimatedProfit:
          profit

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};
