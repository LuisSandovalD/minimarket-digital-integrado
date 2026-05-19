// ========================================
// services/sale-create.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  createSale,
  createManyDetails,
  createManyPayments,
} = require("../repositories/sale.repository");

const {
  decreaseStock,
} = require("../../inventory/repositories/inventory.repository");

const {
  generateSaleNumber,
} = require("../helpers/generate-sale-number.helper");

module.exports = {

  // ========================================
  // CREATE SALE
  // ========================================

  createSaleService:
    async (body) => {

      return prisma.$transaction(

        async (tx) => {

          // ========================================
          // GENERATE SALE NUMBER
          // ========================================

          const saleNumber =
            await generateSaleNumber();

          // ========================================
          // CALCULATE TOTALS
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

          const discount =
            Number(body.discount || 0);

          const total =
            subtotal +
            tax -
            discount;

          // ========================================
          // CREATE SALE
          // ========================================

          const sale =
            await createSale(

              {

                saleNumber,

                companyId:
                  Number(body.companyId),

                branchId:
                  Number(body.branchId),

                userId:
                  Number(body.userId),

                customerId:
                  body.customerId
                    ? Number(body.customerId)
                    : null,

                subtotal,
                tax,
                discount,
                total,

                notes:
                  body.notes || null,

                status:
                  "COMPLETED",

              },

              tx

            );

          // ========================================
          // PREPARE DETAILS
          // ========================================

          const details =
            body.details.map(item => ({

              saleId:
                sale.id,

              productId:
                Number(item.productId),

              quantity:
                Number(item.quantity),

              price:
                Number(item.price),

              subtotal:
                (
                  Number(item.quantity) *
                  Number(item.price)
                ),

            }));

          // ========================================
          // CREATE DETAILS
          // ========================================

          await createManyDetails(
            details,
            tx
          );

          // ========================================
          // UPDATE STOCK
          // ========================================

          for (const item of body.details) {

            await decreaseStock(

              Number(item.productId),

              Number(item.quantity),

              tx

            );

          }

          // ========================================
          // CREATE PAYMENTS
          // ========================================

          if (

            Array.isArray(body.payments) &&

            body.payments.length > 0

          ) {

            const payments =
              body.payments.map(payment => ({

                paymentMethodId:
                  Number(
                    payment.paymentMethodId
                  ),

                amount:
                  Number(payment.amount),

                reference:
                  payment.reference || null,

              }));

            await createManyPayments(

              sale.id,
              payments,
              tx

            );

          }

          // ========================================
          // RETURN SALE
          // ========================================

          return sale;

        }

      );

    },

};