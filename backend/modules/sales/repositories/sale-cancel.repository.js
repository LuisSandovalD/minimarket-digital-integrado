// ========================================
// repositories/sale-cancel.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

module.exports = {

  // ========================================
  // CANCEL SALE
  // ========================================

  cancelSale:
    async (
      id,
      tx = prisma
    ) => {

      return tx.sale.update({

        where: {
          id,
        },

        data: {

          status:
            "CANCELLED",

        },

      });

    },

  // ========================================
  // REFUND PAYMENTS
  // ========================================

  refundPayments:
    async (
      saleId,
      tx = prisma
    ) => {

      return tx.payment.updateMany({

        where: {

          saleId,

          status:
            "COMPLETED",

        },

        data: {

          status:
            "REFUNDED",

        },

      });

    },

  // ========================================
  // RESTORE STOCK
  // ========================================

  restoreStock:
    async (
      details,
      tx = prisma
    ) => {

      for (const detail of details) {

        await tx.product.update({

          where: {
            id:
              detail.productId,
          },

          data: {

            stock: {

              increment:
                detail.quantity,

            },

          },

        });

      }

    },

};