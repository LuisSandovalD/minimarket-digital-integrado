// ========================================
// services/sale-cancel.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  cancelSale,
  refundPayments,
  getBySaleId,
} = require("../repositories/sale.repository");

const {
  increaseStock,
} = require("../../inventory/repositories/inventory.repository");

module.exports = {

  // ========================================
  // CANCEL SALE
  // ========================================

  cancelSaleService:
    async (id) => {

      return prisma.$transaction(

        async (tx) => {

          // ========================================
          // GET DETAILS
          // ========================================

          const details =
            await getBySaleId(id);

          // ========================================
          // RESTORE STOCK
          // ========================================

          for (const item of details) {

            await increaseStock(

              item.productId,
              Number(item.quantity),
              tx

            );

          }

          // ========================================
          // CANCEL SALE
          // ========================================

          await cancelSale(
            id,
            tx
          );

          // ========================================
          // REFUND PAYMENTS
          // ========================================

          await refundPayments(
            id,
            tx
          );

          return {
            success: true,
          };

        }

      );

    },

};