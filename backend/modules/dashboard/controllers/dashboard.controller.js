const prisma = require("../../../prisma/client");

exports.getDashboard = async (req, res) => {

  try {

    const companyId = req.user.companyId;

    // FECHAS

    const today = new Date();

    const firstDayMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // VENTAS HOY

    const salesToday = await prisma.sale.aggregate({
      _sum: {
        total: true
      },
      where: {
        companyId,
        createdAt: {
          gte: new Date(today.setHours(0, 0, 0, 0))
        }
      }
    });

    // COMPRAS HOY

    const purchasesToday = await prisma.purchase.aggregate({
      _sum: {
        total: true
      },
      where: {
        companyId,
        createdAt: {
          gte: new Date(today.setHours(0, 0, 0, 0))
        }
      }
    });

    // VENTAS DEL MES

    const monthlySales = await prisma.sale.aggregate({
      _sum: {
        total: true
      },
      where: {
        companyId,
        createdAt: {
          gte: firstDayMonth
        }
      }
    });

    // PRODUCTOS

    const totalProducts = await prisma.product.count({
      where: {
        companyId,
        isDeleted: false
      }
    });

    // USUARIOS

    const totalUsers = await prisma.user.count({
      where: {
        companyId,
        isDeleted: false
      }
    });

    // STOCK BAJO

    const lowStock = await prisma.product.findMany({
      where: {
        companyId,
        stock: {
          lte: 5
        },
        isDeleted: false
      },
      take: 10
    });

    // PRODUCTOS POR VENCER

    const next30Days = new Date();

    next30Days.setDate(next30Days.getDate() + 30);

    const expiringProducts = await prisma.product.findMany({
      where: {
        companyId,
        expirationDate: {
          lte: next30Days
        },
        isDeleted: false
      },
      take: 10
    });

    // ÚLTIMAS VENTAS

    const recentSales = await prisma.sale.findMany({
      where: {
        companyId
      },
      include: {
        seller: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 10
    });

    // TOP PRODUCTOS

    const topProducts = await prisma.saleDetail.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: "desc"
        }
      },
      take: 5
    });

    res.json({
      salesToday: salesToday._sum.total || 0,
      purchasesToday: purchasesToday._sum.total || 0,
      monthlySales: monthlySales._sum.total || 0,
      totalProducts,
      totalUsers,
      lowStock,
      expiringProducts,
      recentSales,
      topProducts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getSalesChart = async (req, res) => {

  try {

    const sales = await prisma.sale.findMany({
      where: {
        companyId: req.user.companyId
      },
      select: {
        total: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "asc"
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

exports.getPurchaseChart = async (req, res) => {

  try {

    const purchases = await prisma.purchase.findMany({
      where: {
        companyId: req.user.companyId
      },
      select: {
        total: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "asc"
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

exports.getTopSellingProducts = async (req, res) => {

  try {

    const products = await prisma.saleDetail.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: "desc"
        }
      },
      take: 10
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
