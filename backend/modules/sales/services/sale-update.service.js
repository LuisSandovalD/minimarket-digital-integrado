// ========================================
// services/sale-update.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  updateSale,
  deleteDetailsBySale,
  createManyDetails,
} = require("../repositories/sale.repository");

module.exports = {

  // ========================================
  // UPDATE SALE
  // ========================================

  updateSaleService:
    async (
      id,
      body
    ) => {

      return prisma.$transaction(

        async (tx) => {

          // ========================================
          // TOTALS
          // ========================================

          const subtotal =
            body.details.reduce(
              (acc, item) => {

                return (
                  acc +
                  (
                    Number(item.quantity) *
                    Number(item.price)
                  )
                );

              },
              0
            );

          const tax =
            subtotal * 0.18;

          const total =
            subtotal + tax;

          // ========================================
          // UPDATE SALE
          // ========================================

          const sale =
            await updateSale(

              id,

              {

                customerId:
                  body.customerId || null,

                subtotal,
                tax,
                total,

                discount:
                  body.discount || 0,

                notes:
                  body.notes || null,

              },

              tx

            );

          // ========================================
          // DELETE OLD DETAILS
          // ========================================

          await deleteDetailsBySale(
            id,
            tx
          );

          // ========================================
          // CREATE NEW DETAILS
          // ========================================

          const details =
            body.details.map(item => ({

              saleId: id,

              productId:
                item.productId,

              quantity:
                Number(item.quantity),

              price:
                Number(item.price),

              subtotal:
                Number(item.quantity) *
                Number(item.price),

            }));

          await createManyDetails(
            details,
            tx
          );

          return sale;

        }

      );

    },

};