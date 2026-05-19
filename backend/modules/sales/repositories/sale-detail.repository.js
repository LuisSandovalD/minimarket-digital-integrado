// ========================================
// repositories/sale-detail.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

module.exports = {

  // ========================================
  // CREATE DETAILS
  // ========================================

  createManyDetails:
    async (
      details,
      tx = prisma
    ) => {

      return tx.saleDetail.createMany({

        data: details,

      });

    },

  // ========================================
  // GET DETAILS
  // ========================================

  getBySaleId:
    async (
      saleId
    ) => {

      return prisma.saleDetail.findMany({

        where: {
          saleId,
        },

        include: {

          product: true,

        },

      });

    },

  // ========================================
  // DELETE DETAILS
  // ========================================

  deleteBySaleId:
    async (
      saleId,
      tx = prisma
    ) => {

      return tx.saleDetail.deleteMany({

        where: {
          saleId,
        },

      });

    },

};