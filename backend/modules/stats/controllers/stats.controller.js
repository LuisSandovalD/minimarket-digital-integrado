const prisma = require("../../../prisma/client");

// ======================================
// GENERAL STATS
// ======================================

exports.generalStats = async (req, res) => {

  try {

    const companyId =
      req.user.companyId;

    const totalProducts =
      await prisma.product.count({

        where: {
          companyId
        }

      });

    const totalUsers =
      await prisma.user.count({

        where: {
          companyId
        }

      });

    const totalSales =
      await prisma.sale.count({

        where: {
          companyId
        }

      });

    const totalPurchases =
      await prisma.purchase.count({

        where: {
          companyId
        }

      });

    res.json({

      totalProducts,

      totalUsers,

      totalSales,

      totalPurchases

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// INVENTORY STATS
// ======================================

exports.inventoryStats =
async (req, res) => {

  try {

    const inventory =
      await prisma.inventory.findMany({

        where: {
          companyId:
            req.user.companyId
        },

        include: {
          product: true
        }

      });

    const lowStock =
      inventory.filter(item =>
        item.stock <=
        item.product.minStock
      );

    res.json({

      totalItems:
        inventory.length,

      lowStockCount:
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
// SALES STATS
// ======================================

exports.salesStats =
async (req, res) => {

  try {

    const sales =
      await prisma.sale.aggregate({

        _sum: {
          total: true
        },

        _avg: {
          total: true
        },

        _count: true,

        where: {
          companyId:
            req.user.companyId
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
// PURCHASE STATS
// ======================================

exports.purchaseStats =
async (req, res) => {

  try {

    const purchases =
      await prisma.purchase.aggregate({

        _sum: {
          total: true
        },

        _avg: {
          total: true
        },

        _count: true,

        where: {
          companyId:
            req.user.companyId
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
