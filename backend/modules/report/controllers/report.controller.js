const prisma = require("../../../prisma/client");

exports.salesReport = async (req, res) => {

  const sales = await prisma.sale.findMany({
    where: {
      companyId: req.user.companyId
    },
    include: {
      details: true,
      seller: true
    }
  });

  res.json(sales);

};

exports.profitReport = async (req, res) => {

  try {

    const sales =
      await prisma.saleDetail.findMany({

        where: {

          sale: {
            companyId:
              req.user.companyId
          }

        },

        include: {
          product: true
        }

      });

    let totalProfit = 0;

    const details = sales.map(item => {

      const cost =
        Number(item.product.costPrice);

      const sale =
        Number(item.price);

      const quantity =
        item.quantity;

      const profit =
        (sale - cost) * quantity;

      totalProfit += profit;

      return {

        product:
          item.product.name,

        quantity,

        salePrice: sale,

        costPrice: cost,

        profit

      };

    });

    res.json({

      success: true,

      totalProfit,

      details

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
exports.purchaseReport = async (req, res) => {

  const purchases = await prisma.purchase.findMany({
    where: {
      companyId: req.user.companyId
    },
    include: {
      details: true
    }
  });

  res.json(purchases);

};

exports.inventoryReport = async (req, res) => {

  const inventory = await prisma.inventory.findMany({
    where: {
      companyId: req.user.companyId
    },
    include: {
      product: true,
      branch: true
    }
  });

  res.json(inventory);

};
