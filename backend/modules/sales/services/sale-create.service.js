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

  // ========================================
  // CREATE SALE
  // ========================================

  createSaleService: async (
    body,
    user
  ) => {

    console.time("SALE_TOTAL");

    return prisma.$transaction(

      async (tx) => {

        console.time("GENERATE_NUMBER");

        const saleNumber =
          await generateSaleNumber();

        console.timeEnd("GENERATE_NUMBER");

        const subtotal =
          body.details.reduce(
            (acc, item) =>
              acc +
              (
                Number(item.quantity) *
                Number(item.price)
              ),
            0
          );

        const tax = subtotal * 0.18;
        const discount = Number(body.discount || 0);
        const total = subtotal + tax - discount;

        console.time("CREATE_SALE");

        const sale =
          await createSale(
            {
              saleNumber,

              // DATOS DESDE JWT
              companyId:
                Number(user.companyId),

              branchId:
                Number(user.branchId),

              userId:
                Number(user.id),

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

        console.timeEnd("CREATE_SALE");

        const details =
          body.details.map(item => ({
            saleId: sale.id,
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            price: Number(item.price),
            subtotal:
              Number(item.quantity) *
              Number(item.price),
          }));

        console.time("DETAILS");

        await createManyDetails(
          details,
          tx
        );

        console.timeEnd("DETAILS");

        console.time("STOCK");

        for (const item of body.details) {

          await decreaseStock(
            Number(item.productId),
            Number(item.quantity),
            tx
          );

        }

        console.timeEnd("STOCK");

        if (
          Array.isArray(body.payments) &&
          body.payments.length > 0
        ) {

          console.time("PAYMENTS");

          const payments =
            body.payments.map(payment => ({
              paymentMethodId:
                Number(payment.paymentMethodId),

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

          console.timeEnd("PAYMENTS");
        }

        console.timeEnd("SALE_TOTAL");

        return sale;

      },

      {
        timeout: 30000,
        maxWait: 10000
      }

    );

  },

};