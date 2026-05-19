// ========================================
// repositories/sale-report.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

module.exports = {

  // ========================================
  // DAILY SALES
  // ========================================

  getDailySales:
    async (
      companyId,
      startDate,
      endDate
    ) => {

      return prisma.sale.aggregate({

        where: {

          companyId,

          status: {
            not: "CANCELLED",
          },

          createdAt: {
            gte: startDate,
            lte: endDate,
          },

        },

        _sum: {
          total: true,
        },

        _count: true,

      });

    },

  // ========================================
  // TOP PRODUCTS
  // ========================================

  getTopProducts:
    async (
      companyId
    ) => {

      return prisma.saleDetail.groupBy({

        by: [
          "productId",
        ],

        where: {

          sale: {
            companyId,
          },

        },

        _sum: {
          quantity: true,
        },

        orderBy: {

          _sum: {
            quantity: "desc",
          },

        },

      });

    },

};