// ========================================
// repositories/sale-payment.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

module.exports = {

  // ========================================
  // CREATE PAYMENT
  // ========================================

  createPayment:
    async (
      data,
      tx = prisma
    ) => {

      return tx.payment.create({

        data,

      });

    },

  // ========================================
  // CREATE MANY PAYMENTS
  // ========================================

  createManyPayments:
    async (
      saleId,
      payments = [],
      tx = prisma
    ) => {

      return Promise.all(

        payments.map(payment =>

          tx.payment.create({

            data: {

              // RELATION SALE

              sale: {

                connect: {
                  id: saleId,
                },

              },

              // RELATION PAYMENT METHOD

              method: {

                connect: {
                  id: payment.paymentMethodId,
                },

              },

              amount:
                Number(payment.amount),

              reference:
                payment.reference || null,

              // ========================================
              // USE VALID ENUM
              // ========================================

              status:
                "COMPLETED",

            },

          })

        )

      );

    },

  // ========================================
  // GET PAYMENTS
  // ========================================

  getSalePayments:
    async (
      saleId
    ) => {

      return prisma.payment.findMany({

        where: {
          saleId,
        },

        include: {

          method: true,

        },

        orderBy: {
          createdAt: "desc",
        },

      });

    },

  // ========================================
  // UPDATE PAYMENT STATUS
  // ========================================

  updatePaymentStatus:
    async (
      id,
      status,
      tx = prisma
    ) => {

      return tx.payment.update({

        where: {
          id,
        },

        data: {
          status,
        },

      });

    },

};