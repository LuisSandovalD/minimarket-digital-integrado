// ========================================
// repositories/sale-create.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  saleInclude,
} = require("../includes/sale.include");

module.exports = {

  // ========================================
  // CREATE SALE
  // ========================================

  createSale:
    async (
      data,
      tx = prisma
    ) => {

      return tx.sale.create({

        data: {

          // ========================================
          // GENERAL
          // ========================================

          saleNumber:
            data.saleNumber,

          subtotal:
            data.subtotal,

          tax:
            data.tax,

          total:
            data.total,

          discount:
            data.discount || 0,

          notes:
            data.notes || null,

          status:
            data.status || "COMPLETED",

          // ========================================
          // RELATIONS
          // ========================================

          company: {
            connect: {
              id:
                data.companyId,
            },
          },

          branch: {
            connect: {
              id:
                data.branchId,
            },
          },

          // IMPORTANTE:
          // En tu schema Prisma
          // la relación se llama "seller"
          // no "user"
          seller: {
            connect: {
              id:
                data.userId,
            },
          },

          // ========================================
          // CUSTOMER OPTIONAL
          // ========================================

          ...(data.customerId && {

            customer: {
              connect: {
                id:
                  data.customerId,
              },
            },

          }),

        },

        include:
          saleInclude,

      });

    },

  // ========================================
  // UPDATE SALE
  // ========================================

  updateSale:
    async (
      id,
      data,
      tx = prisma
    ) => {

      return tx.sale.update({

        where: {
          id,
        },

        data: {

          // ========================================
          // GENERAL
          // ========================================

          subtotal:
            data.subtotal,

          tax:
            data.tax,

          total:
            data.total,

          discount:
            data.discount || 0,

          notes:
            data.notes || null,

          // ========================================
          // CUSTOMER OPTIONAL
          // ========================================

          customerId:
            data.customerId || null,

        },

        include:
          saleInclude,

      });

    },

};